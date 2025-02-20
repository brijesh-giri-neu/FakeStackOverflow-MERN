import "./index.css";
import { QuestionBodyProps } from "../../../../types/types";

/**
 * The answer renders the question information after the header
 * @param param0 the input props needed to render the question body
 * @returns the question body component
 */
const QuestionBody = ({ views, text, askby, meta }: QuestionBodyProps) => {
    return (
        <div id="questionBody" className="right_padding space_between questionBody">
            <div className="views-count">
                <h2>{views} views</h2>
            </div>

            <div className="question-content">
                {text}
            </div>

            <div className="question-meta">
                <p className="question-user">
                    {askby}
                </p>
                <p className="question-time">
                    {meta}
                </p>
            </div>
        </div>
    );
};

export default QuestionBody;
