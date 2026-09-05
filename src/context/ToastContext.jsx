import { createContext, useContext, useState } from "react";


const ToastContext = createContext();

export function ToastProvider({children}) {
    const [toast, setToast] = useState(null);

const toastStyles =
  toast?.type === "error"
    ? "bg-red-600 text-white"
    : "bg-green-600 text-white";
    function showToast(message, type = "success")  {

        setToast({
    message,
    type,
  });
  setTimeout(() => {
    setToast(null);
  }, 3000);
    }

    return (
        <ToastContext.Provider value={{showToast}}>
            {children}
     {toast && (
  <div
    className={`fixed right-5 top-5 z-50 rounded-lg px-4 py-3 shadow-lg ${toastStyles}`}
  >
    {toast.message}
  </div>
)}
        </ToastContext.Provider>
    );
} 


export function useToast() {
    return useContext(ToastContext)
}