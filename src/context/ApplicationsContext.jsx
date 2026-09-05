import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "./ToastContext";
import { useLanguage } from "./LanguageContext";
const ApplicationsContext = createContext();

function ApplicationsProvider({ children }) {
  
  const {user} = useAuth();
const [loading, setLoading] = useState(true);
const { showToast } = useToast();
const {t} = useLanguage();
  const [applications, setApplications] = useState([]);
useEffect(() => {
    if (!user) return;

  


  async function fetchApplications() {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching applications", error);
      setLoading(false);
      return;
    }

    const mappedApplications = data.map((application) => ({
      id: application.id,
      company: application.company,
      position: application.position,
      status: application.status,
      appliedAt: application.applied_at,
      createdAt: application.created_at,

      interview: application.interview_date
        ? {
            date: application.interview_date,
            time: application.interview_time,
            type: application.interview_type,
            at: application.interview_at,
          }
        : null,
    }));

    setApplications(mappedApplications);
    setLoading(false);
  }

  fetchApplications();
}, [user]);
  

   
 async function handleStatusChange(id, newStatus) {
  const updateDate =
  newStatus === "Interview"
    ? {
        status: newStatus,
      }
    : {
        status: newStatus,
        interview_date: null,
        interview_time: null,
        interview_type: null,
        interview_at: null,
      };

  const {error} = await supabase
  .from("applications")
  .update(updateDate)
  .eq("id", id);

  if(error) {
    console.error("Error updating status:",error); 
    showToast(t("toast","statusError"), "error");
    return false;
  }
  
  setApplications((currentApplications) => 
  currentApplications.map((application) =>
  application.id === id
  ? {
    ...application,
    status: newStatus,
    interview:
    newStatus === "Interview"
    ? application.interview
    : null,
  }
  : application
  )
  );
  showToast(t("toast", "statusSuccess"), "success");
  return true;
 }

   async function addApplication(formData) {
  if (!user) return;

  const { data, error } = await supabase
    .from("applications")
    .insert({
      user_id: user.id,
      company: formData.company,
      position: formData.position,
      status: formData.status,
      applied_at: formData.appliedAt,
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding application:", error);
    showToast(t("toast", "addError"), "error");  
    return false;
    
  }

 const newApplication = {
  id: data.id,
  company: data.company,
  position: data.position,
  status: data.status,
  appliedAt: data.applied_at,
  createdAt: data.created_at,
};

setApplications((currentApplications) => [
  newApplication,
  ...currentApplications,
]);

showToast(t("toast", "addSuccess"), "success");

return true;
}
  async function updateApplication(id, updatedData) {
  let interviewAt = null;

  if (
    updatedData.status === "Interview" &&
    updatedData.interviewDate &&
    updatedData.interviewTime
  ) {
    interviewAt = new Date(
      `${updatedData.interviewDate}T${updatedData.interviewTime}`
    ).toISOString();
  }

  const { data, error } = await supabase
    .from("applications")
    .update({
      company: updatedData.company,
      position: updatedData.position,
      status: updatedData.status,
      applied_at: updatedData.appliedAt,

      interview_date:
        updatedData.status === "Interview"
          ? updatedData.interviewDate || null
          : null,

      interview_time:
        updatedData.status === "Interview"
          ? updatedData.interviewTime || null
          : null,

      interview_type:
        updatedData.status === "Interview"
          ? updatedData.interviewType || null
          : null,

      interview_at:
        updatedData.status === "Interview"
          ? interviewAt
          : null,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating application:", error);
    showToast(t("toast", "updateError"), "error");  
    return false;
  }

  const updatedApplication = {
    id: data.id,
    company: data.company,
    position: data.position,
    status: data.status,
    appliedAt: data.applied_at,
    createdAt: data.created_at,

    interview: data.interview_date
      ? {
          date: data.interview_date,
          time: data.interview_time,
          type: data.interview_type,
          at: data.interview_at,
        }
      : null,
  };

  setApplications((currentApplications) =>
    currentApplications.map((application) =>
      application.id === id
        ? updatedApplication
        : application
    )
  );
 showToast(t("toast", "updateSuccess"), "success");  
  return true;
}
async function deleteApplication(id) {
  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting application:", error);
     showToast(t("toast", "deleteError"), "error");  
    return false;
  }

  setApplications((currentApplications) =>
    currentApplications.filter(
      (application) => application.id !== id
    )
  );
   showToast(t("toast", "deleteSuccess"), "success"); 
   return true;
}
async function scheduleInterview(id, interviewData) {
  const interviewDateTime = new Date(
    `${interviewData.date}T${interviewData.time}`
  );

  const { data, error } = await supabase
    .from("applications")
    .update({
      status: "Interview",
      interview_date: interviewData.date,
      interview_time: interviewData.time,
      interview_type: interviewData.type,
      interview_at: interviewDateTime.toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error scheduling interview:", error);
     showToast(t("toast", "scheduleError"), "error");  
    return false;
  }

  setApplications((currentApplications) =>
    currentApplications.map((application) =>
      application.id === id
        ? {
            ...application,
            status: "Interview",
            interview: {
              date: data.interview_date,
              time: data.interview_time,
              type: data.interview_type,
               at: data.interview_at,
            },
          }
        : application
    )
  );
 showToast(t("toast", "scheduleSuccess"), "success");  
  return true;
}


async function cancelInterview(id) {
  const { error} = await supabase
  .from("applications")
  .update({
    status: "Applied",
    interview_date: null,
    interview_time: null, 
    interview_type: null,
    interview_at: null,
  })
  .eq("id", id)
  

  if (error) {
    console.error("Error canceling interview", error);
     showToast(t("toast", "cancelInterviewError"), "error");  
    return false;
  }

  setApplications((currentApplications) =>
  currentApplications.map((application) =>
  application.id === id
  ? {
    ...application,
    status: "Applied",
    interview: null,
  }
  : application
  )
  );
  showToast(t("toast", "cancelInterviewSuccess"), "success");
  return true;
}

    return (
        <ApplicationsContext.Provider
        value={{ applications, handleStatusChange, addApplication,updateApplication,deleteApplication, scheduleInterview, cancelInterview,loading }}
        >
            {children}
        </ApplicationsContext.Provider>
    );
}
function useApplications() {
    return useContext(ApplicationsContext);
}

export {ApplicationsProvider, useApplications};