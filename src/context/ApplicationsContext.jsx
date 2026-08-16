import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
const ApplicationsContext = createContext();

function ApplicationsProvider({ children }) {
  
  const {user} = useAuth();

  async function fetchApplications() {
    if (!user) return;

    const {data, error} = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

    if(error) {
      console.error("Error fetcing applications", error);
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
  }
  :null,
}));

setApplications(mappedApplications);
  }

useEffect(() => {
  if (user) {
    fetchApplications();
  } else {
    setApplications([]);
  }
}, [user]);

  const [applications, setApplications] = useState([]);
  

   
 async function handleStatusChange(id, newStatus) {
  const updateDate =
  newStatus === "Interview"
  ? {status: newStatus}
  : {
    status: newStatus,
    interview_date:null,
    interview_time:null,
    interview_type:null,
  };

  const {error} = await supabase
  .from("applications")
  .update(updateDate)
  .eq("id", id);

  if(error) {
    console.error("Error updating status:",error);
    return;
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
    return;
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
}
    async function updateApplication(id, updatedData) {
  const { data, error } = await supabase
    .from("applications")
    .update({
      company: updatedData.company,
      position: updatedData.position,
      status: updatedData.status,
      applied_at: updatedData.appliedAt,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating application:", error);
    return;
  }

  const updatedApplication = {
    id: data.id,
    company: data.company,
    position: data.position,
    status: data.status,
    appliedAt: data.applied_at,
    createdAt: data.created_at,
  };

  setApplications((currentApplications) =>
    currentApplications.map((application) =>
      application.id === id ? updatedApplication : application
    )
  );
}
async function deleteApplication(id) {
  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting application:", error);
    return;
  }

  setApplications((currentApplications) =>
    currentApplications.filter(
      (application) => application.id !== id
    )
  );
}


async function scheduleInterview(id, interviewData) {
  const { data, error } = await supabase
    .from("applications")
    .update({
      status: "Interview",
      interview_date: interviewData.date,
      interview_time: interviewData.time,
      interview_type: interviewData.type,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error scheduling interview:", error);
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
            },
          }
        : application
    )
  );

  return true;
}

    return (
        <ApplicationsContext.Provider
        value={{ applications, handleStatusChange, addApplication,updateApplication,deleteApplication, scheduleInterview }}
        >
            {children}
        </ApplicationsContext.Provider>
    );
}
function useApplications() {
    return useContext(ApplicationsContext);
}

export {ApplicationsProvider, useApplications};