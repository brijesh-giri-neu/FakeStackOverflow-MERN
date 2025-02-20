import { PageClassParams } from "../../types/types";
import HomePageClass from "./home";
import TagPageClass from "./tag";
import PageClass from ".";
import AnswerPageClass from "./answer";
import NewQuestionPageClass from "./newQuestion";
import NewAnswerPageClass from "./newAnswer";

/**
 * Factory function to create appropriate page instances based on page name
 * Implements the Factory pattern for page creation
 * @param pageName - Name of the page to create
 * @param params - Parameters for page configuration
 * @returns Configured PageClass instance
 */
export default function getPage({ pageName, params }: { pageName: string, params: PageClassParams }): PageClass {
    // Create default home page instance
    let page: PageClass = HomePageClass.HomePageClassBuilder(params.app)
        .setClickTagFunc(params.clickTag)
        .setHandleAnswerFunc(params.handleAnswer)
        .setHandleNewQuestionFunc(params.handleNewQuestion)
        .setSetQuestionOrderFunc(params.setQuestionOrder)
        .setSetQuestionPageFunc(params.setQuestionPage)
        .build();

    page.setSearch(params.search);
    page.setQuestionOrderType(params.questionOrder);

    // Return appropriate page based on pageName
    switch (pageName) {
        case "home":
            return page;
        case "tag":
            page = TagPageClass.TagPageClassBuilder(params.app)
                .setClickTagFunc(params.clickTag)
                .setHandleNewQuestionFunc(params.handleNewQuestion)
                .build();
            return page;
        case "answer":
            page = AnswerPageClass.AnswerPageClassBuilder(params.app)
                .setHandleNewQuestionFunc(params.handleNewQuestion)
                .setHandleNewAnswerFunc(params.handleNewAnswer)
                .build();
            return page;
        case "newQuestion":
            page = NewQuestionPageClass.NewQuestionPageClassBuilder(params.app)
                .setHandleQuestionsFunc(params.handleQuestions)
                .build();
            return page;
        case "newAnswer":
            page = NewAnswerPageClass.NewAnswerPageClassBuilder(params.app)
                .setHandleAnswerFunc(params.handleAnswer)
                .build();
            return page;
        default:
            return page;
    }
}