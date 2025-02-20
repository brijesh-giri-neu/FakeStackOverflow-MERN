import { AnswerPageProps } from "../../../types/types";
import AnswerHeader from "./header";
import QuestionBody from "./questionBody";
import Answer from "./answer";
import "./index.css";

/**
 * The container component for the AnswerPage
 * @param param0 the props for the AnswerPage component -- the data and the functions to set the pageInstance
 * @returns the AnswerPage component
 */
const AnswerPage = ({ question, ans, handleNewQuestion, handleNewAnswer }: AnswerPageProps) => {
    return (
        <div className="answer-page-container">
            <AnswerHeader 
                ansCount={ans.length}
                title={question.title}
                handleNewQuestion={handleNewQuestion}
            />

            <QuestionBody 
                views={question.getQuestionViews()}
                text={question.text}
                askby={question.askedBy}
                meta={question.calculateTimeElapsed()}
            />

            <div className="answers-section">
                {ans.length > 0 ? (
                    ans.map((answer, idx) => (
                        <Answer
                            key={idx}
                            text={answer.text}
                            ansBy={answer.ansBy}
                            meta={answer.calculateTimeElapsed()}
                        />
                    ))
                ) : (
                    <div className="no-answers">No answers yet</div>
                )}
            </div>

            <div className="answer-button-container">
                <button className="ansButton" onClick={handleNewAnswer}>
                    Answer Question
                </button>
            </div>
        </div>
    );
};

export default AnswerPage;
