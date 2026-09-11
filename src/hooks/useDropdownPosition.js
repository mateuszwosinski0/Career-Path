import { useLayoutEffect, useRef } from "react";

function useDropdownPosition(isOpen, containerRef, activeIndex) {
  const menuRef = useRef(null);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const container = containerRef.current;
    const menu = menuRef.current;
    if (!container || !menu) return;

    function updatePosition() {
      const bounds = container.getBoundingClientRect();
      const viewport = window.visualViewport;
      let topBoundary = (viewport?.offsetTop ?? 0) + 12;
      let bottomBoundary = (viewport?.offsetTop ?? 0) +
        (viewport?.height ?? window.innerHeight) - 12;

      for (let parent = container.parentElement; parent; parent = parent.parentElement) {
        if (parent === document.body || parent === document.documentElement) continue;
        if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(parent).overflowY)) {
          const parentBounds = parent.getBoundingClientRect();
          const contentTop = parentBounds.top + parent.clientTop;
          topBoundary = Math.max(topBoundary, contentTop + 8);
          bottomBoundary = Math.min(bottomBoundary, contentTop + parent.clientHeight - 8);
        }
      }

      const below = Math.max(0, bottomBoundary - bounds.bottom - 8);
      const above = Math.max(0, bounds.top - topBoundary - 8);
      const desiredHeight = Math.min(menu.scrollHeight + 2, 320);
      const openAbove = below < desiredHeight && above > below;

      menu.style.top = openAbove ? "auto" : "100%";
      menu.style.bottom = openAbove ? "100%" : "auto";
      menu.style.marginTop = openAbove ? "0" : "8px";
      menu.style.marginBottom = openAbove ? "8px" : "0";
      menu.style.maxHeight = `${Math.min(320, openAbove ? above : below)}px`;
      menu.style.transformOrigin = openAbove ? "bottom" : "top";
    }

    updatePosition();
    const observer = new ResizeObserver(updatePosition);
    observer.observe(container);
    observer.observe(menu);
    const viewport = window.visualViewport;
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    viewport?.addEventListener("resize", updatePosition);
    viewport?.addEventListener("scroll", updatePosition);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      viewport?.removeEventListener("resize", updatePosition);
      viewport?.removeEventListener("scroll", updatePosition);
    };
  }, [isOpen, containerRef]);

  useLayoutEffect(() => {
    if (!isOpen || activeIndex < 0) return;
    const menu = menuRef.current;
    const option = menu?.querySelectorAll('[role="option"]')[activeIndex];
    if (!menu || !option) return;

    const top = option.offsetTop;
    const bottom = top + option.offsetHeight;
    if (top < menu.scrollTop) menu.scrollTop = top;
    else if (bottom > menu.scrollTop + menu.clientHeight) {
      menu.scrollTop = bottom - menu.clientHeight;
    }
  }, [isOpen, activeIndex]);

  return menuRef;
}

export default useDropdownPosition;
