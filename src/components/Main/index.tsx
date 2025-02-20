import "./index.css";
import SideBarNav from "./sideBarNav";

import { MainProps } from "../../types/types";

/**
 * The Main component renders the main content of the application.
 * As this is a single page application, the main content is rendered
 * based on how the page instance is set from the functions passed as props.
 * @param param0 the input props for the Main component
 * @returns the Main component
 */

const Main = ({pageInstance, handleQuestions, handleTags}: MainProps) => {

    return (
        <div id="main" className="main">
            <SideBarNav
                selected={pageInstance.getSelected()}
                handleQuestions={handleQuestions}
                handleTags={handleTags}
            />
            <div id="right_main" className="right_main">
                {pageInstance.getContent()}
            </div>
        </div>
    );
};

export default Main;
