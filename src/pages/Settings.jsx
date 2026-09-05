
import AppearanceSettings from "@/components/SettingsPage/AppearanceSettings";
import LanguageSettings from "@/components/SettingsPage/LanguageSettings";
import NotificationSettings from "@/components/SettingsPage/NotificationSettings";
import AccountSettings from "@/components/SettingsPage/AccountSettings";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext"

function Settings() {
  const { theme, setTheme } = useTheme();


const { language, setLanguage, t } = useLanguage();
  const {profile} = useAuth();
  return (
    <section className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t("settings", "title")}
        </h2>

        <p className="mt-1 text-gray-500 dark:text-gray-400">
         {t("settings","description")}
         
        </p>
      </div>

      <div className="flex max-w-5xl flex-col gap-6">
        <AppearanceSettings
          theme={theme}
          onThemeChange={setTheme}
        />

        <LanguageSettings
          language={language}
          onLanguageChange={setLanguage}
        />

        <NotificationSettings
        profile={profile}
        />

        <AccountSettings />
      </div>
    </section>
  );
}

export default Settings;