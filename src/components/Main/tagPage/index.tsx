import "./index.css";
import Tag from "./tag";
import { TagPageProps } from "../../../types/types";

/**
 * A container component that displays the list of tags
 * @param param0 the input props for the TagPage component
 * includes the list of tags and the functions to enable interaction with the tags
 * @returns The TagPage component that displays the list of tags
 */
const TagPage = ({
    tlist,
    getQuestionCountByTag,
    clickTag,
    handleNewQuestion,
}: TagPageProps) => {
    return (
        <>
            <div className="space_between right_padding">
                <div className="bold_title">{tlist.length} Tags</div>
                <div className="bold_title">All Tags</div>
                <button
                    className="bluebtn"
                    onClick={() => {
                        if(handleNewQuestion)
                            handleNewQuestion();
                    }}
                >
                    Ask a Question
                </button>
            </div>
            <div className="tag_list right_padding">
                {tlist.map((t, idx) => (
                    <Tag
                        key={idx}
                        t={t}
                        getQuestionCountByTag={getQuestionCountByTag}
                        clickTag={clickTag}
                    />
                ))}
            </div>
        </>
    );
};

export default TagPage;
