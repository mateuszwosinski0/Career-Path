import { useLanguage } from "@/context/LanguageContext";
import { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import useEscapeKey from "@/hooks/useEscapeKey";

function DeleteApplicationModal({
  application,
  onConfirm,
  onClose,
}) {

  const { t } = useLanguage();
const modalRef = useRef(null);
useEscapeKey(onClose);
useClickOutside(modalRef,onClose);
  if (!application) return null;

  return (
    <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div ref={modalRef} className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {t("applications", "deleteApplication")}?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              {t("applications", "deleteConfirmation")}{" "}
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {application.company}
            </span>
             ? {t("applications", "cannotBeUndone")}.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {t("common", "cancel")}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
           {t("common", "delete")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteApplicationModal;