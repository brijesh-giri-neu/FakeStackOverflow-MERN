import PageClass from './index';
import AnswerPage from '../Main/answerPage';
import { ApplicationInterface, NoParamHandler } from '../../types/types';

/**
 * Class representing the answer page
 * Extends the abstract PageClass to handle answer page specific functionality
 */
export default class AnswerPageClass extends PageClass {
    private handleNewQuestion?: NoParamHandler;
    private handleNewAnswer?: NoParamHandler;

    /**
     * Creates a new AnswerPageClass instance
     * @param app - Application interface instance
     */
    private constructor(app: ApplicationInterface) {
        super(app);
    }

    /**
     * Builder method to create a new AnswerPageClass instance
     * @param app - Application interface instance
     * @returns New AnswerPageClass builder instance
     */
    public static AnswerPageClassBuilder(app: ApplicationInterface): AnswerPageClass {
        return new AnswerPageClass(app);
    }

    /**
     * Sets the handler for new question creation
     * @param handleNewQuestion - Handler function
     * @returns This instance for chaining
     */
    public setHandleNewQuestionFunc(handleNewQuestion: NoParamHandler): AnswerPageClass {
        this.handleNewQuestion = handleNewQuestion;
        return this;
    }

    /**
     * Sets the handler for new answer creation
     * @param handleNewAnswer - Handler function
     * @returns This instance for chaining
     */
    public setHandleNewAnswerFunc(handleNewAnswer: NoParamHandler): AnswerPageClass {
        this.handleNewAnswer = handleNewAnswer;
        return this;
    }

    /**
     * Builds and returns the AnswerPageClass instance
     * @returns Configured AnswerPageClass instance
     */
    public build(): AnswerPageClass {
        return this;
    }

    /**
     * @returns JSX.Element containing the AnswerPage component or question not found component.
     * @override
     */
    public getContent() {
        try {
            const question = this.getApp().getQuestionById(this.qid);
            const answers = question ? this.getApp().getQuestionAnswer(question) : [];
            
            if (!question) {
                return (
                    <div>
                        <h1>Question Not Found</h1>
                        <p>The question you are looking for does not exist or has been removed.</p>
                    </div>
                );
            }

            return (
                <AnswerPage
                    question={question}
                    ans={answers}
                    handleNewQuestion={this.handleNewQuestion}
                    handleNewAnswer={this.handleNewAnswer}
                />
            );
        } catch (e) {
            console.error(`Failed to set AnswerPage props: ${e}`);
            return (
                <div>
                    <h1>Question Not Found</h1>
                    <p>There was an error retrieving the question.</p>
                </div>
            );
        }
    }

    public getSelected() {
        return "";
    }
}