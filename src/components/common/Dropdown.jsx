import { useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";
import useEscapeKey from "@/hooks/useEscapeKey";
import useDropdownKeyboard from "@/hooks/useDropdownKeyboard";
import useDropdownPosition from "@/hooks/useDropdownPosition";
function DropDown({
    value, onChange, options, className = "",
}) {
    const [isOpen, setIsOpen] = useState(false);
    
    const dropDownRef = useRef(null);

  useClickOutside(dropDownRef, () => {
   setIsOpen(false);
  });
  useEscapeKey(() => setIsOpen(false));
const { activeIndex, resetActiveIndex } = useDropdownKeyboard({
  isOpen,
  options,
  value,
  onSelect: handleSelect,
});
const menuRef = useDropdownPosition(isOpen, dropDownRef, activeIndex);

    const selectedOption = options.find (
        (option) => option.value === value
    );

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
        <div ref={dropDownRef} className={`relative w-full sm:w-auto ${className}`}>

            <button type="button" onClick={handleToggle}
            className="flex h-10 w-full items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-900 transition-colors hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-600"
            aria-haspopup="listbox"
            aria-expanded={isOpen}>
                <span>
                    {selectedOption?.label ?? value}
                </span>
                <ChevronDown size={16}
                className={`shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                }`}
                />
            </button>

            {isOpen && (
                <div ref={menuRef} className="dropdown-in absolute left-0 z-50 w-full min-w-full overflow-y-auto overscroll-contain rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-900"
                role="listbox">
                    {options.map((option,index) => {
                        const isSelected = option.value === value;

                        return (
                            <button key={option.value} type="button" onClick={()=> handleSelect(option)}
                           className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800 ${
  index === activeIndex
    ? "bg-gray-100 dark:bg-gray-700"
    : ""
}`}
                            role="option" aria-selected={isSelected}>
                                <span>{option.label}</span>

                                {isSelected && <Check size={16}/>}
                            </button>
                        );
                    })}
                    </div>
            )}
        </div>
    ) 
}
export default DropDown;
