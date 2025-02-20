import PageClass from "./index";
import NewQuestion from "../Main/newQuestion";
import { ApplicationInterface, NoParamHandler } from "../../types/types";

export default class NewQuestionPageClass extends PageClass {

    private handleQuestions?: NoParamHandler;

    private constructor(app: ApplicationInterface) {
        super(app);
    }

    public static NewQuestionPageClassBuilder(app: ApplicationInterface): NewQuestionPageClass {
        return new NewQuestionPageClass(app);
    }

    public setHandleQuestionsFunc(handleQuestions: NoParamHandler): NewQuestionPageClass {
        this.handleQuestions = handleQuestions;
        return this;
    }

    public build(): NewQuestionPageClass {
        return this;
    }

    public getContent() {
        console.log(this);
        return <NewQuestion addQuestion={this.getApp().addQuestion} handleQuestions={this.handleQuestions} />;
    }

    public getSelected() {
        return "";
    }
}