import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";


function DropDown({
    value, onChange, options, className = "",
}) {
    const [isOpen, setIsOpen] = useState(false);
    
    const dropDownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        function handleKeyDown(event){
            if (event.key === "Escape"){
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    },[]);
    

    const selectedOption = options.find (
        (option) => option.value === value
    );

    function handleSelect(option) {
        onChange(option.value);
        setIsOpen(false);
    }

    return (
        <div ref={dropDownRef} className={`relative w-full sm:w-auto ${className}`}>

            <button type="button" onClick={()=> setIsOpen((current) => !current)}
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
                <div className="dropdown-in absolute left-0 top-full z-50 mt-2 w-full min-w-full origin-top overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-900 sm:min-w-40" 
                role="listbox">
                    {options.map((option) => {
                        const isSelected = option.value === value;

                        return (
                            <button key={option.value} type="button" onClick={()=> handleSelect(option)}
                            className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
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