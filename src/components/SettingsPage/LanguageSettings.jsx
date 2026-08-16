const languages = [
  {
    id: "en",
    name: "English",
    flag: "🇬🇧",
  },
  {
    id: "pl",
    name: "Polski",
    flag: "🇵🇱",
  },
  {
    id: "es",
    name: "Español",
    flag: "🇪🇸",
  },
];

function LanguageSettings({ language, onLanguageChange }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
  Language
</h2>

<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
  Choose your preferred language.
</p>
      </div>

      <label className="flex max-w-xs flex-col gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Preferred language
        </span>

       <select
  value={language}
  onChange={(e) => onLanguageChange(e.target.value)}
  className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
>
          {languages.map((languageOption) => (
            <option
              key={languageOption.id}
              value={languageOption.id}
            >
              {languageOption.flag} {languageOption.name}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}

export default LanguageSettings;