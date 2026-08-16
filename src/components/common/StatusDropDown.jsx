import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const statusOptions = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleSelect(status) {
    onChange(status);
    setIsOpen(false);
  }

  return (
    <div ref={dropdownRef} className="relative w-36">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-colors dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[value]}`}
        >
          {value}
        </span>

        <ChevronDown
          size={16}
          className={`transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="dropdown-in absolute right-0 top-full z-50 mt-2 w-full origin-top rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {statusOptions.map((status) => {
            const isSelected = status === value;

            return (
              <button
                key={status}
                type="button"
                onClick={() => handleSelect(status)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
                role="option"
                aria-selected={isSelected}
              >
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
                >
                  {status}
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