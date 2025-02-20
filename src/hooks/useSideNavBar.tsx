// hooks/useSideNavBar.ts
import { useCallback } from "react";

/**
 * Hook to handle keyboard navigation (Enter or Space key)
 * @param handler - Function to execute when key is pressed
 * @returns A function that listens for keyboard events
 */
const useSideNavBar = (handler: () => void) => {
    return useCallback((e: { key: string }) => {
        if (e.key === "Enter" || e.key === " ") {
            handler();
        }
    }, [handler]);
};

export default useSideNavBar;
