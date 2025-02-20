import "./index.css";
import { TagProps } from "../../../../types/types";

/**
 * The Tag component is a functional component that renders a tag and the number of questions associated with that tag.
 * @param param0 The input props needed to render a tag and the functions to interact with the tag
 * @returns The tag component
 */

const Tag = ({ t, getQuestionCountByTag, clickTag }: TagProps) => {

    return (
        <div
            className="tagNode"
            role="button"
            onClick={() => {
                if (clickTag) clickTag(t.name)
            }
            }
            tabIndex={0}
        >
            <div className="tagName">{t.name}</div>
            <div>{getQuestionCountByTag(t.tid)} questions</div>
        </div>
    );
};

export default Tag;
