import PageClass from './index';
import QuestionPage from '../Main/questionPage';
import { ApplicationInterface, SetQuestionPage, StringHandler, NoParamHandler } from '../../types/types';

/**
 * Class representing the home page
 * Extends the abstract PageClass to handle home page specific functionality
 */
export default class HomePageClass extends PageClass {
    private setQuestionPage?: SetQuestionPage;
    private setQuestionOrder?: StringHandler;
    public handleAnswer?: StringHandler;
    public clickTag?: StringHandler;
    public handleNewQuestion?: NoParamHandler;

    /**
     * Creates a new HomePageClass instance
     * @param app - Application interface instance
     */
    private constructor(app: ApplicationInterface) {
        super(app);
    }

    /**
     * Builder method to create a new HomePageClass instance
     * @param app - Application interface instance
     * @returns New HomePageClass builder instance
     */
    public static HomePageClassBuilder(app: ApplicationInterface): HomePageClass {
        return new HomePageClass(app);
    }

    /**
     * Sets the question page handler
     * @param setQuestionPage - Handler function for updating question page
     * @returns This instance for chaining
     */
    public setSetQuestionPageFunc(setQuestionPage: SetQuestionPage): HomePageClass {
        this.setQuestionPage = setQuestionPage;
        return this;
    }

    /**
     * Sets the question order handler
     * @param setQuestionOrder - Handler function for updating question order
     * @returns This instance for chaining
     */
    public setSetQuestionOrderFunc(setQuestionOrder: StringHandler): HomePageClass {
        this.setQuestionOrder = setQuestionOrder;
        return this;
    }

    /**
     * Sets the answer handler
     * @param handleAnswer - Handler function for handling answers
     * @returns This instance for chaining
     */
    public setHandleAnswerFunc(handleAnswer: StringHandler): HomePageClass {
        this.handleAnswer = handleAnswer;
        return this;
    }

    /**
     * Sets the tag click handler
     * @param clickTag - Handler function for tag clicks
     * @returns This instance for chaining
     */
    public setClickTagFunc(clickTag: StringHandler): HomePageClass {
        this.clickTag = clickTag;
        return this;
    }

    /**
     * Sets the new question handler
     * @param handleNewQuestion - Handler function for new question creation
     * @returns This instance for chaining
     */
    public setHandleNewQuestionFunc(handleNewQuestion: NoParamHandler): HomePageClass {
        this.handleNewQuestion = handleNewQuestion;
        return this;
    }

    /**
     * Completes the builder pattern
     * @returns The fully configured HomePageClass instance
     */
    public build(): HomePageClass {
        return this;
    }

    /**
     * Gets the content to render for the home page
     * @returns JSX Element containing the question page
     * @override
     */
    public getContent() {
        try {
            console.log(" Page search", this.search);
            const qFilterResult = this.getApp().getQuestionsByFilter(
                this.pageIndex, 
                this.questionOrder?.toLowerCase(), 
                this.search
            );
            return (
                <QuestionPage
                    title_text={this.title}
                    qlist={qFilterResult.qSlice}
                    qSize={qFilterResult.qLength}
                    search={this.search}
                    pageNum={this.pageIndex}
                    getTagById={this.getApp().getTagById}
                    setQuestionOrder={this.setQuestionOrder}
                    clickTag={this.clickTag}
                    handleAnswer={this.handleAnswer}
                    handleNewQuestion={this.handleNewQuestion}
                    setQuestionPage={this.setQuestionPage}
                />
            );
        }
        catch (e) {
            console.error(`Failed to set QuestionPage props: ${e}`);
            return null;
        }
    }

    /**
     * Gets the selected navigation item for this page
     * @returns "q" to indicate questions section
     * @override
     */
    public getSelected() {
        return "q";
    }
}