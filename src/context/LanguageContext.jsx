import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    common: {
      english: "English",
      polish: "Polski",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      search: "Search...",
    },

    navigation: {
      dashboard: "Dashboard",
      applications: "Applications",
      settings: "Settings",
    },
      dashboard: {
      title:  "Welcome back,",
      description: "Here's what's happening with your job search today.",
      applications: "Applications",
      applicationsChange: "Total applications",
      interviews: "Interviews",
      interviewsChange: "Current interviews",
      offers: "Offers",
      offersChange: "Received offers",
      responseRate: "Response Rate",
      responseRateChange: "Applications with response",
      recentApplications: "Recent Applications",
      upcomingInterviews: "Upcoming Interviews",
      noUpcomingInterviews: "No upcoming interviews",
      viewAll : "View all",
      noApplications: "No applications found.",
    },

    applications: {
      title: "Applications",
      description: "Manage all your job applications.",
      addApplication: "Add Application",
      company: "Company",
      position: "Position",
      status: "Status",
      applied: "Applied",
      actions: "Actions",
      allStatuses: "All statuses",
      sortBy: "Sort by",
      companyAZ: "Company A-Z",
      companyZA: "Company Z-A",
      newest: "Newest",
      oldest: "Oldest",
      noApplications: "No applications found.",
      statusApplied: "Applied",
statusInterview: "Interview",
statusOffer: "Offer",
statusRejected: "Rejected",
formCompany: "Company",
formPosition: "Position",
formStatus: "Status",
formAppliedDate: "Applied date",
interviewDate: "Interview date",
interviewTime: "Interview time",
interviewType: "Interview type",


editApplication: "Edit application",
deleteApplication: "Delete application",
deleteConfirmation: "Are you sure you want to delete the application for",
cannotBeUndone: "This action cannot be undone",

saveChanges: "Save changes",
scheduleInterview: "Schedule interview",
addApplicationDescription: "Add a new job application to your tracker.",
cancelInterview: "Cancel interview",
interviewDetails: "Interview details",
noResults: "No applications match your filters.",
    },

    settings: {
      title: "Settings",
      description: "Manage your account and application preferences.",
      appearance: "Appearance",
      language: "Language",
      notifications: "Notifications",
      account: "Account",
       manageInformation: "Manage your account information.",
       username: "Username",
       password: "Password",
       changePassword: "Change Password",
       logOut: "Log Out",
       appearanceDescription: "Choose how CareerPath  looks on your device.",
       languageDescription: "Choose your preferred language.",
       preferredLanguage: "Preferred language",
       notificationsDescription: "Choose how you would like to receive updates.",
       save: "Save",
       newPassword: "New password",
       confirmNewPassword: "Confirm new password",
       cancel: "Cancel",
       emailNotifications: "Email notifications",
       emailNotificationsDescription:"Receive updates by email.",
browserNotifications: "Browser notifications",
browserNotificationsDescription:
  "Show browser notifications.",
applicationReminders: "Application reminders",
applicationRemindersDescription:
  "Get reminders about your applications.",
sendTestNotification: "Send test notification",
light: "Light",
lightDescription: "Use the light theme.",
dark: "Dark",
darkDescription: "Use the dark theme.",
system: "System",
systemDescription: "Use your device theme.",
usernameUpdated: "Username updated successfully.",
email: "Email",
passwordMinLength: "Password must be at least 6 characters.",
passwordsDoNotMatch: "Passwords do not match.",
passwordChanged: "Password changed successfully.",
showPassword: "Show password",
hidePassword: "Hide password",
closeModal: "Close modal",

    },
    notifications: {
  title: "Notifications",
  markAllAsRead: "Mark all as read",
  noNotifications: "No notifications yet.",
  loading: "Loading...",
  upcomingInterview: "Upcoming interview",
interviewReminder: "You have an interview with {company} for {position}.",
 clearAll: "Clear all",
  deleteNotification: "Delete notification",
},
interviewTypes: {
  online: "Online",
 onSite:  "On-site",
  phone: "Phone",
},

toast: {
  statusError: "Failed to change status",
  statusSuccess: "Status changed",
  addError: "Failed to add application",
  addSuccess: "Application added",
  updateError: "Failed to update application",
  updateSuccess: "Application updated",
  deleteError: "Failed to delete application",
  deleteSuccess:  "Application deleted",
  scheduleError: "Failed to schedule interview",
  scheduleSuccess: "Interview scheduled",
  cancelInterviewError: "Failed to cancel interview",
  cancelInterviewSuccess: "Interview canceled",

}
  },

  pl: {
    common: {
      english: "English",
      polish: "Polski",
      cancel: "Anuluj",
      save: "Zapisz",
      delete: "Usuń",
      edit: "Edytuj",
      search: "Szukaj...",
    },

    navigation: {
      dashboard: "Pulpit",
      applications: "Aplikacje",
      settings: "Ustawienia",
    },

    dashboard: {
      title:  "Witaj z powrotem,",
      description: "Oto aktualny stan Twoich poszukiwań pracy.",
      applications: "Zgłoszenia",
      applicationsChange: "łączna liczba zgłoszeń",
      interviews: "Rozmowy",
      interviewsChange: "Aktualne Rozmowy",
      offers: "Oferty",
      offersChange: "Otrzymane oferty",
      responseRate: "Wskaźnik odpowiedzi",
      responseRateChange: "Applikacje z odpowiedziom",
      recentApplications: "Ostanie Applikacje",
      upcomingInterviews: "Nadchodzące Rozmowy",
      noUpcomingInterviews: "Brak nadchodzących rozmów",
      viewAll: "Zobacz wszystko",
      noApplications: "Nie znaleziono aplikacji."
    },

    applications: {
      title: "Aplikacje",
      description: "Zarządzaj wszystkimi swoimi aplikacjami o pracę.",
      addApplication: "Dodaj aplikację",
      company: "Firma",
      position: "Stanowisko",
      status: "Status",
      applied: "Data ",
      actions: "Akcje",
      allStatuses: "Wszystkie statusy",
      sortBy: "Sortuj",
      companyAZ: "Firma A-Z",
      companyZA: "Firma Z-A",
      newest: "Najnowsze",
      oldest: "Najstarsze",
      noApplications: "Nie znaleziono aplikacji.",
      statusApplied: "Aplikacja wysłana",
statusInterview: "Rozmowa",
statusOffer: "Oferta",
statusRejected: "Odrzucona",
formCompany: "Firma",
formPosition: "Stanowisko",
formStatus: "Status",
formAppliedDate: "Data aplikowania",
interviewDate: "Data rozmowy",
interviewTime: "Godzina rozmowy",
interviewType: "Typ rozmowy",
cancelInterview: "Anuluj rozmowę",
interviewDetails: "Szczegóły rozmowy",

editApplication: "Edytuj aplikację",
deleteApplication: "Usuń aplikację",
deleteConfirmation: "Czy na pewno chcesz usunąć aplikację dla",
cannotBeUndone: "Tej operacji nie można cofnąć",

saveChanges: "Zapisz zmiany",
scheduleInterview: "Zaplanuj rozmowę",
addApplicationDescription: "Dodaj nową aplikacje do trackera",
noResults: "Nie znaleziono aplikacji pasujących do filtrów.",
    },

    settings: {
      title: "Ustawienia",
      description: "Zarządzaj swoim kontem i preferencjami aplikacji.",
      appearance: "Wygląd",
      language: "Język",
      notifications: "Powiadomienia",
      account: "Konto",
      manageInformation: "Zarządzaj informacjami o swoim koncie.",
         username: "Nazwa użytkownika",
       password: "Hasło",
       changePassword: "Zmień hasło",
       logOut: "Wyloguj się",
       appearanceDescription: "Wybierz wygląd Carrer Path na twoim urządzeniu.",
       languageDescription: "Wybierz  język.",
       preferredLanguage: "Wybrany język",
       notificationsDescription: "Wybierz sposób otrzymywania powiadomień",
       save: "Zapisz",
        newPassword: "Nowe hasło",
       confirmNewPassword: "Potwierdz nowe hasło",
       cancel: "Anuluj",
       emailNotifications: "Powiadomienia e-mail",
       emailNotificationsDescription: "Otrzymuj aktualizacje przez e-mail.",
       browserNotifications: "Powiadomienia przeglądarki",
       browserNotificationsDescription:"Wyświetlaj powiadomienia w przeglądarce.",
       applicationReminders: "Przypomnienia o aplikacjach",
       applicationRemindersDescription:"Otrzymuj przypomnienia dotyczące swoich aplikacji.",
       sendTestNotification: "Wyślij powiadomienie testowe",
       light: "Jasny",
       lightDescription: "Używaj jasnego motywu.",
       dark: "Ciemny",
       darkDescription: "Używaj ciemnego motywu.",
       system: "Systemowy",
       systemDescription: "Używaj motywu ustawionego na urządzeniu.",
       usernameUpdated: "Nazwa użytkownika została zmieniona.",
       email: "E-mail",
       passwordMinLength: "Hasło musi mieć co najmniej 6 znaków.",
       passwordsDoNotMatch: "Hasła nie są takie same.",
       passwordChanged: "Hasło zostało zmienione pomyślnie.",
       showPassword: "Pokaż hasło",
       hidePassword: "Ukryj hasło",
       closeModal: "Zamknij okno",
    },
    notifications: {
  title: "Powiadomienia",
  markAllAsRead: "Oznacz wszystkie jako przeczytane",
  noNotifications: "Brak powiadomień.",
  loading: "Ładowanie...",
  upcomingInterview: "Nadchodząca rozmowa",
interviewReminder: "Masz rozmowę w {company} na stanowisko {position}.",
  clearAll: "Wyczyść wszystkie",
  deleteNotification: "Usuń powiadomienie",
},
interviewTypes: {
  online: "Online",
  onSite: "Stacjonarna",
  phone: "Telefoniczna",
},

toast: {
  statusError: "Nie udało się zmienić statusu",
  statusSuccess: "Status został zmieniony",

  addError: "Nie udało się dodać aplikacji",
  addSuccess: "Aplikacja została dodana",

  updateError: "Nie udało się zaktualizować aplikacji",
  updateSuccess: "Aplikacja została zaktualizowana",

  deleteError: "Nie udało się usunąć aplikacji",
  deleteSuccess: "Aplikacja została usunięta",

  scheduleError: "Nie udało się zaplanować rozmowy",
  scheduleSuccess: "Rozmowa została zaplanowana",

  cancelInterviewError: "Nie udało się anulować rozmowy",
  cancelInterviewSuccess: "Rozmowa została anulowana",
},
  },

es: {
  common: {
    english: "English",
    polish: "Polski",
    spanish: "Español",

    cancel: "Cancelar",
    save: "Guardar",
    delete: "Eliminar",
    edit: "Editar",
    search: "Buscar...",
  },

  navigation: {
    dashboard: "Panel",
    applications: "Solicitudes",
    settings: "Configuración",
  },

  applications: {
    title: "Solicitudes",
    description: "Gestiona todas tus solicitudes de empleo.",
    addApplication: "Añadir solicitud",

    company: "Empresa",
    position: "Puesto",
    status: "Estado",
    applied: "Fecha de solicitud",
    actions: "Acciones",

    allStatuses: "Todos los estados",

    statusApplied: "Enviada",
    statusInterview: "Entrevista",
    statusOffer: "Oferta",
    statusRejected: "Rechazada",

    sortBy: "Ordenar por",
    companyAZ: "Empresa A-Z",
    companyZA: "Empresa Z-A",
    newest: "Más recientes",
    oldest: "Más antiguas",

    noApplications: "No se encontraron solicitudes.",

    formCompany: "Empresa",
    formPosition: "Puesto",
    formStatus: "Estado",
    formAppliedDate: "Fecha de solicitud",

    editApplication: "Editar solicitud",
    deleteApplication: "Eliminar solicitud",
    deleteConfirmation:
      "¿Seguro que quieres eliminar la solicitud de",
    cannotBeUndone: "Esta acción no se puede deshacer",

    saveChanges: "Guardar cambios",

    scheduleInterview: "Programar entrevista",
    interviewDate: "Fecha de la entrevista",
    interviewTime: "Hora de la entrevista",
    interviewType: "Tipo de entrevista",
    cancelInterview: "Cancelar entrevista",
    interviewDetails: "Detalles de la entrevista",
    noResults: "No hay solicitudes que coincidan con los filtros.",
  },


  settings: {
    title: "Configuración",
    description:
      "Gestiona tu cuenta y las preferencias de la aplicación.",

    appearance: "Apariencia",
    appearanceDescription:
      "Personaliza la apariencia de la aplicación.",

    theme: "Tema",
    light: "Claro",
    dark: "Oscuro",
    system: "Sistema",
    lightDescription: "Usa el tema claro.",
    darkDescription: "Usa el tema oscuro.",
    systemDescription: "Usa el tema configurado en tu dispositivo.",

    language: "Idioma",
    languageDescription: "Elige tu idioma preferido.",
    preferredLanguage: "Idioma preferido",

    notifications: "Notificaciones",
    notificationsDescription:
      "Elige cómo quieres recibir las actualizaciones.",

    emailNotifications: "Notificaciones por correo",
    emailNotificationsDescription:
      "Recibe actualizaciones por correo electrónico.",

    browserNotifications: "Notificaciones del navegador",
    browserNotificationsDescription:
      "Muestra notificaciones en el navegador.",

    applicationReminders: "Recordatorios de solicitudes",
    applicationRemindersDescription:
      "Recibe recordatorios sobre tus solicitudes.",

    sendTestNotification: "Enviar notificación de prueba",

    account: "Cuenta",
    manageInformation: "Gestiona la información de tu cuenta.",

username: "Nombre de usuario",

password: "Contraseña",

changePassword: "Cambiar contraseña",

logOut: "Cerrar sesión",

save: "Guardar",

newPassword: "Nueva contraseña",

confirmNewPassword: "Confirmar nueva contraseña",
usernameUpdated: "El nombre de usuario se ha actualizado correctamente.",
cancel: "Cancelar",
email: "Correo electrónico",
passwordMinLength: "La contraseña debe tener al menos 6 caracteres.",
passwordsDoNotMatch: "Las contraseñas no coinciden.",
passwordChanged: "La contraseña se ha cambiado correctamente.",
showPassword: "Mostrar contraseña",
hidePassword: "Ocultar contraseña",
closeModal: "Cerrar ventana",
  },

  dashboard: {
    title: "Bienvenido de nuevo,",
    description:
      "Esto es lo que está pasando hoy con tu búsqueda de empleo.",

    applications: "Solicitudes",
    applicationsChange: "Solicitudes totales",

    interviews: "Entrevistas",
    interviewsChange: "Entrevistas actuales",

    offers: "Ofertas",
    offersChange: "Ofertas recibidas",

    responseRate: "Tasa de respuesta",
    responseRateChange: "Solicitudes con respuesta",

    recentApplications: "Solicitudes recientes",
    upcomingInterviews: "Próximas entrevistas",
    noUpcomingInterviews: "No hay próximas entrevistas.",
    viewAll: "Ver todo",
  },
  notifications: {
  title: "Notificaciones",
  markAllAsRead: "Marcar todas como leídas",
  noNotifications: "No hay notificaciones.",
  loading: "Cargando...",
  upcomingInterview: "Próxima entrevista",
interviewReminder: "Tienes una entrevista con {company} para el puesto de {position}.",
 clearAll: "Borrar todas",
  deleteNotification: "Eliminar notificación",
},

interviewTypes: {
  online: "Online",
  phone: "Telefónica",
  onSite: "Presencial",
},
toast: {
  statusError: "No se pudo cambiar el estado",
  statusSuccess: "El estado ha sido actualizado",

  addError: "No se pudo añadir la solicitud",
  addSuccess: "La solicitud ha sido añadida",

  updateError: "No se pudo actualizar la solicitud",
  updateSuccess: "La solicitud ha sido actualizada",

  deleteError: "No se pudo eliminar la solicitud",
  deleteSuccess: "La solicitud ha sido eliminada",

  scheduleError: "No se pudo programar la entrevista",
  scheduleSuccess: "La entrevista ha sido programada",

  cancelInterviewError: "No se pudo cancelar la entrevista",
  cancelInterviewSuccess: "La entrevista ha sido cancelada",
},
},
};

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  function t(section, key) {
    return translations[language]?.[section]?.[key] ?? key;
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  return useContext(LanguageContext);
}

export { LanguageProvider, useLanguage };