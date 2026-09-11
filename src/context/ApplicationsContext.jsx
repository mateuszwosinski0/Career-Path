import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "./ToastContext";
import { useLanguage } from "./LanguageContext";
import {
  readGuestApplications,
  writeGuestApplications,
} from "@/utils/guestApplications";
import {
  isValidAppliedDate,
  isValidInterviewDateTime,
} from "@/utils/applicationDates";
import {
  prepareApplicationDetails,
  detailsToDatabase,
  applicationFromDatabase,
} from "@/utils/applicationDetails";

const ApplicationsContext = createContext();

function ApplicationsProvider({ children }) {
  const { user, loading } = useAuth();
  const sessionKey = loading ? "initializing" : user?.id ?? "guest";

  return (
    <SessionApplicationsProvider key={sessionKey}>
      {children}
    </SessionApplicationsProvider>
  );
}

function SessionApplicationsProvider({ children }) {
  
const { user, loading: authLoading } = useAuth();
const userId = user?.id ?? null;
const [loading, setLoading] = useState(true);
const { showToast } = useToast();
const {t} = useLanguage();
  const [applications, setApplications] = useState([]);
useEffect(() => {
  if (authLoading) return;

  let cancelled = false;

  async function fetchApplications() {
    setLoading(true);
    setApplications([]);

    try {
      if (!userId) {
        const guestApplications = readGuestApplications();

        if (!cancelled) {
          setApplications(guestApplications);
        }

        return;
      }

      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      const mappedApplications = data.map(applicationFromDatabase);
      if (!cancelled) {
        setApplications(mappedApplications);
      }
    } catch (error) {
      if (!cancelled) {
        console.error("Error loading applications:", error);
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  }

  fetchApplications();

  return () => {
    cancelled = true;
  };
}, [userId, authLoading]);
  
function changeGuestApplications(transform, successKey, errorKey) {
  if (user || authLoading || loading) {
    return false;
  }

  try {
    const currentApplications = readGuestApplications();
    const updatedApplications = transform(currentApplications);

    writeGuestApplications(updatedApplications);
    setApplications(updatedApplications);

    showToast(t("toast", successKey), "success");
    return true;
  } catch (error) {
    console.error("Error updating guest applications:", error);
    showToast(t("toast", errorKey), "error");
    return false;
  }
}

   
 async function handleStatusChange(id, newStatus) {

  if (authLoading || loading) return false;

if (!user) {
  return changeGuestApplications(
    (currentApplications) => {
      const exists = currentApplications.some(
        (application) => application.id === id,
      );

      if (!exists) {
        throw new Error("Application not found");
      }

      return currentApplications.map((application) =>
        application.id === id
          ? {
              ...application,
              status: newStatus,
              interview:
                newStatus === "Interview"
                  ? application.interview
                  : null,
            }
          : application,
      );
    },
    "statusSuccess",
    "statusError",
  );
}

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
  if (authLoading || loading) {
  return false;
}
if (!isValidAppliedDate(formData.appliedAt)) {
  showToast(t("toast", "invalidAppliedDate"), "error");
  return false;
}

if (
  formData.status === "Interview" &&
  !isValidInterviewDateTime(
    formData.interviewDate,
    formData.interviewTime,
  )
) {
  showToast(t("toast", "invalidInterviewDateTime"), "error");
  return false;
}

let details;

try {
  details = prepareApplicationDetails(formData);
} catch (error) {
  showToast(t("toast", error.message), "error");
  return false;
}

let interview = null;

if (formData.status === "Interview" && formData.interviewDate) {
  const interviewDateTime = formData.interviewTime
    ? new Date(`${formData.interviewDate}T${formData.interviewTime}`)
    : null;


  interview = {
    date: formData.interviewDate,
    time: formData.interviewTime || null,
    type: formData.interviewType || "Online",
    at: interviewDateTime ? interviewDateTime.toISOString() : null,
  };
}

if (!user) {
  try {
    const newApplication = {
      id: crypto.randomUUID(),
      company: formData.company.trim(),
      position: formData.position.trim(),
      status: formData.status,
      appliedAt: formData.appliedAt,
      createdAt: new Date().toISOString(),
      ...details,
      interview: interview,
    };

    const currentApplications = readGuestApplications();
    const updatedApplications = [
      newApplication,
      ...currentApplications,
    ];

    writeGuestApplications(updatedApplications);
    setApplications(updatedApplications);

    showToast(t("toast", "addSuccess"), "success");
    return true;
  } catch (error) {
    console.error("Error saving guest application:", error);
    showToast(t("toast", "addError"), "error");
    return false;
  }
}

  const { data, error } = await supabase
    .from("applications")
    .insert({
      user_id: user.id,
      company: formData.company,
      position: formData.position,
      status: formData.status,
      applied_at: formData.appliedAt,
      ...detailsToDatabase(details),
      interview_date: interview?.date ?? null,
interview_time: interview?.time ?? null,
interview_type: interview?.type ?? null,
interview_at: interview?.at ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding application:", error);
    showToast(t("toast", "addError"), "error");  
    return false;
    
  }

 const newApplication = applicationFromDatabase(data);

setApplications((currentApplications) => [
  newApplication,
  ...currentApplications,
]);

showToast(t("toast", "addSuccess"), "success");

return true;
}
  async function updateApplication(id, updatedData) {
  if (authLoading || loading) return false;


  if (!isValidAppliedDate(updatedData.appliedAt)) {
  showToast(t("toast", "invalidAppliedDate"), "error");
  return false;
}
if (
  updatedData.status === "Interview" &&
  !isValidInterviewDateTime(
    updatedData.interviewDate,
    updatedData.interviewTime,
  )
) {
  showToast(t("toast", "invalidInterviewDateTime"), "error");
  return false;
}

let details;

try {
  details = prepareApplicationDetails(updatedData);
} catch (error) {
  showToast(t("toast", error.message), "error");
  return false;
}

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

  if (!user) {
    return changeGuestApplications(
      (currentApplications) => {
        const exists = currentApplications.some(
          (application) => application.id === id,
        );

        if (!exists) {
          throw new Error("Application not found");
        }

        return currentApplications.map((application) =>
          application.id === id
            ? {
                ...application,
                company: updatedData.company.trim(),
                position: updatedData.position.trim(),
                status: updatedData.status,
                appliedAt: updatedData.appliedAt,
                ...details,
                interview:
                  updatedData.status === "Interview" &&
                  updatedData.interviewDate
                    ? {
                        date: updatedData.interviewDate,
                        time: updatedData.interviewTime || null,
                        type: updatedData.interviewType || null,
                        at: interviewAt,
                      }
                    : null,
              }
            : application,
        );
      },
      "updateSuccess",
      "updateError",
    );
  }

  const { data, error } = await supabase
    .from("applications")
    .update({
      company: updatedData.company,
      position: updatedData.position,
      status: updatedData.status,
      applied_at: updatedData.appliedAt,
      ...detailsToDatabase(details),

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

  const updatedApplication = applicationFromDatabase(data);

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
  if (authLoading || loading) return false;

if (!user) {
  return changeGuestApplications(
    (currentApplications) =>
      currentApplications.filter(
        (application) => application.id !== id,
      ),
    "deleteSuccess",
    "deleteError",
  );
}
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

  if (authLoading || loading) return false;

  if (
  !isValidInterviewDateTime(
    interviewData.date,
    interviewData.time,
    true,
  )
) {
  showToast(t("toast", "invalidInterviewDateTime"), "error");
  return false;
}

if (!user) {
  return changeGuestApplications(
    (currentApplications) => {
      const exists = currentApplications.some(
        (application) => application.id === id,
      );

      if (!exists) {
        throw new Error("Application not found");
      }

      const interviewAt = new Date(
        `${interviewData.date}T${interviewData.time}`,
      ).toISOString();

      return currentApplications.map((application) =>
        application.id === id
          ? {
              ...application,
              status: "Interview",
              interview: {
                date: interviewData.date,
                time: interviewData.time,
                type: interviewData.type,
                at: interviewAt,
              },
            }
          : application,
      );
    },
    "scheduleSuccess",
    "scheduleError",
  );
}

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

  if (authLoading || loading) return false;

if (!user) {
  return changeGuestApplications(
    (currentApplications) => {
      const exists = currentApplications.some(
        (application) => application.id === id,
      );

      if (!exists) {
        throw new Error("Application not found");
      }

      return currentApplications.map((application) =>
        application.id === id
          ? {
              ...application,
              status: "Applied",
              interview: null,
            }
          : application,
      );
    },
    "cancelInterviewSuccess",
    "cancelInterviewError",
  );
}

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
