import { useEffect, useState } from "react";

export default function useDropdownKeyboard({
  isOpen,
  options,
  value,
  onSelect,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

function resetActiveIndex() {
  const selectedIndex = options.findIndex(
    (option) => option.value === value
  );

  setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
}

  useEffect(() => {
    function handleKeyDown(event) {
      if (!isOpen) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();

        setActiveIndex((currentIndex) =>
          currentIndex === options.length - 1
            ? 0
            : currentIndex + 1
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();

        setActiveIndex((currentIndex) =>
          currentIndex === 0
            ? options.length - 1
            : currentIndex - 1
        );
      }

      if (event.key === "Enter") {
        event.preventDefault();

        const selectedOption = options[activeIndex];

        if (selectedOption) {
          onSelect(selectedOption);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, options, activeIndex, onSelect]);

  return { activeIndex, resetActiveIndex };
}