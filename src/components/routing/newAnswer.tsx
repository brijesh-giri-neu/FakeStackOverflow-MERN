import PageClass from ".";
import NewAnswer from "../Main/newAnswer";
import { StringHandler, ApplicationInterface } from "../../types/types";

export default class NewAnswerPageClass extends PageClass {

    private handleAnswer?: StringHandler;

    private constructor(app: ApplicationInterface) {
        super(app);
    }

    public static NewAnswerPageClassBuilder(app: ApplicationInterface): NewAnswerPageClass {
        return new NewAnswerPageClass(app);
    }

    public setHandleAnswerFunc(handleAnswer: StringHandler): NewAnswerPageClass {
        this.handleAnswer = handleAnswer;
        return this;
    }

    public build(): NewAnswerPageClass {
        return this;
    }


    public getContent() {
        console.log(this);
        return <NewAnswer qid={this.qid} addAnswer={this.getApp().addAnswer} handleAnswer={this.handleAnswer} />;
    }

    public getSelected() {
        return "";
    }
}