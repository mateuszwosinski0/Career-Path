import { useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import useClickOutside from "@/hooks/useClickOutside";
import useEscapeKey from "@/hooks/useEscapeKey";
import useDropdownKeyboard from "@/hooks/useDropdownKeyboard";
import useDropdownPosition from "@/hooks/useDropdownPosition";
const statusOptions = [
  { value: "Applied" },
  { value: "Interview" },
  { value: "Offer" },
  { value: "Rejected" },
];
const statusTranslationKeys = {
  Applied: "statusApplied",
  Interview: "statusInterview",
  Offer: "statusOffer",
  Rejected: "statusRejected",
};
const statusStyles = {
  Applied:
    "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
  Interview:
    "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Offer:
    "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  Rejected:
    "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

function StatusDropdown({ value, onChange }) {
    const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

 useClickOutside(dropdownRef, () => {
  setIsOpen(false);
 });
 useEscapeKey(() => setIsOpen(false));
const { activeIndex, resetActiveIndex } = useDropdownKeyboard({
  isOpen,
  options: statusOptions,
  value,
  onSelect: handleSelect,
}); 
const menuRef = useDropdownPosition(isOpen, dropdownRef, activeIndex);
  function handleSelect(option) {
    onChange(option.value);
    setIsOpen(false);
  }
  function handleToggle() {
  if (!isOpen) {
    resetActiveIndex();
  }

  setIsOpen((current) => !current);
}

  return (
    <div ref={dropdownRef} className="relative w-36">
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-colors dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[value]}`}
        >
          {t("applications", statusTranslationKeys[value])}
        </span>

        <ChevronDown
          size={16}
          className={`transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div ref={menuRef} role="listbox" className="dropdown-in absolute right-0 z-50 w-full overflow-y-auto overscroll-contain rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        {statusOptions.map((option, index) => {
  const status = option.value;
  const isSelected = status === value;

  return (
    <button
      key={status}
      type="button"
      onClick={() => handleSelect(option)}
      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700 ${
        index === activeIndex
          ? "bg-gray-100 dark:bg-gray-700"
          : ""
      }`}
      role="option"
      aria-selected={isSelected}
    >
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
      >
        {t("applications", statusTranslationKeys[status])}
      </span>

      {isSelected && <Check size={16} />}
    </button>
  );
})}
        </div>
      )}
    </div>
  );
}

export default StatusDropdown;
