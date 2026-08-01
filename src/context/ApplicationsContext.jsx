import { createContext, useContext, useState } from "react";


const ApplicationsContext = createContext();

function ApplicationsProvider({ children }) {
  

  const [applications, setApplications] = useState ([
    {
      id: 1,
        company: "Google",
        position: "Frontend Developer",
        status: "interview",
        appliedAt: "2 Days ago",
            interview:{
          date: "04.08.2026",
    time: "11:00",
    type: "Online",
        }
    },
      {
        id: 2,
        company: "Gooagle",
        position: "Fronteaand Developer",
        status: "interview",
        appliedAt: "4 Days ago",
        interview:{
          date: "03.08.2026",
    time: "12:00",
    type: "Online",
        }
    },
      {
        id: 3,
        company: "Google",
        position: "Frontend Developer",
        status: "Applied",
        appliedAt: "2 Days ago",
    },
      {
        id: 4,
        company: "Google",
        position: "Frontend Developer",
        status: "Applied",
        appliedAt: "22 Days ago",
    },
])

   
    function handleStatusChange(id, newStatus) {
        setApplications((currentApplications) =>
        currentApplications.map((application) =>
        application.id === id
        ? {...aplication, status: newStatus }
        : application
        )
    );
    }

    function addApplication(newApplication) {
      setApplications((currentApplications) => [
        ...currentApplications,
        {
          id: Date.now(),
          ...newApplication,
        },
      ]);
    }

    function updateApplication(id, updateApplication){
      setApplications((currentApplications) =>
      currentApplications.map((application) =>
      application.id === id
      ? { ...application, ...updateApplication }
      : application
      )
      );
    }

    function deleteApplication(id) {
      setApplications((currentApplications) => 
      currentApplications.filter((applications) => applications.id !== id)
      )
    }

    return (
        <ApplicationsContext.Provider
        value={{ applications, handleStatusChange, addApplication,updateApplication,deleteApplication }}
        >
            {children}
        </ApplicationsContext.Provider>
    );
}
function useApplications() {
    return useContext(ApplicationsContext);
}

export {ApplicationsProvider, useApplications};