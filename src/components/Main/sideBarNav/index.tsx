import "./index.css";
import { SideBarNavProps } from "../../../types/types";
import useSideNavBar from "../../../hooks/useSideNavBar";

/**
 * The SideBarNav component renders the side bar navigation
 * @param param0 the input props for the SideBarNav component.
 * The selected prop is used to highlight the selected menu item.
 * The functions in the props are used to set the page instance.
 * @returns SideBarNav component
 */
const SideBarNav = ({ selected = "", handleQuestions, handleTags }: SideBarNavProps) => {
    const handleQuestionsKeyDown = useSideNavBar(handleQuestions);
    const handleTagsKeyDown = useSideNavBar(handleTags);

    return (
        <div id="sideBarNav" className="sideBarNav">
            <div
                id="menu_question"
                className={`menu_button ${
                    selected === "q" ? "menu_selected" : ""
                }`}
                onClick={handleQuestions}
                onKeyDown={(e) => handleQuestionsKeyDown(e)}
                role="button"
                tabIndex={0}
            >
                Questions
            </div>
            <div
                id="menu_tag"
                className={`menu_button ${
                    selected === "t" ? "menu_selected" : ""
                }`}
                onClick={handleTags}
                onKeyDown={(e) => handleTagsKeyDown(e)}
                role="button"
                tabIndex={0}
            >
                Tags
            </div>
        </div>
    );
};

export default SideBarNav;
