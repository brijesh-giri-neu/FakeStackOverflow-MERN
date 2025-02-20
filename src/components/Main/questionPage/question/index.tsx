import { QuestionProps, TagParamType } from "../../../../types/types";
import "./index.css";
import TagButton from "../tagbutton";
import { useCallback } from "react";

interface qComponentProps {
    q: QuestionProps;
    getTagById: (tid: string) => TagParamType | null;
    clickTag?: (tagName: string) => void;
    handleAnswer?: (qid: string) => void;
}

/**
 * A component to display a question
 * @param param0 the props for the component -- data for the question 
 * and the functuions that will be called when a user interacts with the question
 * @returns a question to be displayed
 */
const Question = ({ q, getTagById, clickTag, handleAnswer }: qComponentProps) => {
    // Handles question click
    const handleQuestionClick = useCallback(() => {
        if (handleAnswer) handleAnswer(q.qid);
    }, [handleAnswer, q.qid]);

    // Handles tag click
    const handleTagClick = useCallback((tid: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); 
        const tag = getTagById(tid);
        if (tag && clickTag) clickTag(tag.name);
    }, [clickTag, getTagById]);

    return (
        <div
            className="question right_padding"
            onClick={handleQuestionClick}
            role="button"
            tabIndex={0}
        >
            <div className="postStats">
                <div>{q.getAnswerCount()} answers</div>
                <div>{q.getQuestionViews()} views</div>
            </div>
            <div className="question_mid">
                <div className="postTitle">{q.title}</div>
                <div className="question_tags">
                    {q.getTagsId().map((tid) => (
                        <TagButton 
                            key={tid} 
                            tid={tid} 
                            getTagById={getTagById} 
                            handleTagClick={handleTagClick} 
                        />
                    ))}
                </div>
            </div>
            <div className="lastActivity">
                <div className="question_author">{q.askedBy}</div>
                <div>&nbsp;</div>
                <div className="question_meta">
                    asked {q.calculateTimeElapsed()}
                </div>
            </div>
        </div>
    );
};

export default Question;
