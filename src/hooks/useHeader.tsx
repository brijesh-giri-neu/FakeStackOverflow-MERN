import { useState } from "react";

/**
 * A custom hook that can be used to manage the state of the header component.
 * @param search the search query entered by the user.
 * @param setQuesitonPage the function to set the questions page to be displayed based on the search string.
 * @returns 
 */
export const useHeader = (search: string, setQuesitonPage: (pageIndex: number, search: string, title: string) => void) => {
    /**
     * maintains the search query entered by the user.
     */
    const [val, setVal] = useState(search);

    /**
     * the handler function called when the user presses enter from the search bar.
     */
    const handleSearch = () => {
        setQuesitonPage(0, val, "Search Results");
    };

    /**
     * the handler function called when the user types in the search bar.
     * @param e the event object that triggered the function.
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVal(e.target.value);
    };

    /**
     * The handler function called when the user presses enter from the search bar.
     * @param e the event object that triggered the function.
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    return {
        val,
        handleInputChange,
        handleKeyDown,
        handleSearch
    };
};