import "./index.css";
import { HeaderProps } from "../../types/types";
import { useHeader } from "../../hooks/useHeader";

/**
 * The Header component is the top section of the application.
 * @param param0 indicates the search term and the function to render
 * the page after the search term is entered
 * @returns the header component
 */
const Header = ({ search, setQuestionPage: setQuesitonPage }: HeaderProps) => {
    const { val, handleInputChange, handleKeyDown } = useHeader(search, setQuesitonPage);

    return (
        <div id="header" className="header">
            <div></div>
            <div className="title">Fake Stack Overflow</div>
            <input
                id="searchBar"
                placeholder="Search ..."
                type="text"
                value={val}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default Header;
