import { useEffect } from "react";

export default function useEscapeKey(callback) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        callback();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
}