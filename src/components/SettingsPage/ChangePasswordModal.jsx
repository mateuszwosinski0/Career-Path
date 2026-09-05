import { useState,useRef } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import useEscapeKey from "@/hooks/useEscapeKey";
function ChangePasswordModal({ onClose }) {
  const { updatePassword } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {t} = useLanguage();
  const modalRef = useRef(null);
  useEscapeKey(onClose);
  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password.length < 6) {
        setError(t("settings", "passwordMinLength"));
      return;
    }

    if (password !== confirmPassword) {
      setError(t("settings", "passwordsDoNotMatch"));
      return;
    }

    setSaving(true);

    const { error } = await updatePassword(password);

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

   setSuccess(t("settings", "passwordChanged"));

    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div ref={modalRef} className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {t("settings", "changePassword")}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
           aria-label={t("settings", "closeModal")}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
             {t("settings", "newPassword")}
            </span>

           <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
  />

  <button
    type="button"
    onClick={() => setShowPassword((current) => !current)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
    aria-label={
  showPassword
    ? t("settings", "hidePassword")
    : t("settings", "showPassword")
}
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
             {t("settings", "confirmNewPassword")}
            </span>

           <div className="relative">
  <input
    type={showConfirmPassword ? "text" : "password"}
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
  />

  <button
    type="button"
    onClick={() =>
      setShowConfirmPassword((current) => !current)
    }
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
    aria-label={
  showConfirmPassword
    ? t("settings", "hidePassword")
    : t("settings", "showPassword")
}
  >
    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>
          </label>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600 dark:bg-green-950/30 dark:text-green-400">
              {success}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
             {t("settings","cancel")}
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
             {t("settings","changePassword")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;