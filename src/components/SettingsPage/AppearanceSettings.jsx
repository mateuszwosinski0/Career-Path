import {  Monitor, Moon, Sun } from "lucide-react";

const themes = [
    {
        id:"light",
        title: "Light",
        description: "Always use the light apperance.",
        icon: Sun,
    },

    {
        id: "dark", 
        title: "Dark",
        description:"Always use the dark apperance.",
        icon:Moon,
    },
    {
        id: "system",
        title: "System",
        description: "Follow your operating system theme",
        icon: Monitor,
    },
]

function AppearanceSettings({theme, onThemeChange}) {
    return(
        <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
  Appearance
</h2>

<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
  Choose how CareerPath AI looks on your device.
</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {themes.map((themeOption)=>{
                    const Icon = themeOption.icon;
                    const isActive = theme === themeOption.id;

                    return(
                        <button key={themeOption.id} type="button" onClick={() => onThemeChange(themeOption.id)}
                       className={`rounded-xl border p-5 text-left transition-all duration-200 ${
  isActive
    ? "border-blue-500 bg-blue-50 shadow-sm dark:bg-blue-950/30"
    : "border-gray-200 hover:-translate-y-1 hover:border-blue-300 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:hover:border-blue-500 dark:hover:bg-gray-800"
}`}
                        >
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                <Icon size={20}/>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                {themeOption.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                {themeOption.description}
                            </p>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

export default AppearanceSettings;