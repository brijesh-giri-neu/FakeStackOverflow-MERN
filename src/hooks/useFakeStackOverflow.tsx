import { useState } from "react";
import getPage from "../components/routing/pageFactory";
import { ApplicationInterface } from "../types/types";

/**
 * Custom hook to manage the state of application's parent componet.
 * It returns the search query, page instance, and functions to handle the application navigation.
 * @param app The application instance.
 * @returns The search query, page instance, and functions to set the page to be displayed.
 */
export const useFakeStackOverflow = (app: ApplicationInterface) => {
    /**
     * The search string entered by the user in the search bar.
     */
    const [search, setSearch] = useState("");
    /**
     * The title of the page being displayed.
     */
    const [mainTitle, setMainTitle] = useState("All Questions");
    /**
     * The order of the questions to be displayed.
     */
    const [questionOrder, setQuestionOrder] = useState("newest");
    /**
     * The id of the question to be displayed if a specific question is selected.
     */
    const [qid, setQid] = useState("");
    /**
     * The start index of the questions array to be displayed.
     * The index is used to paginate the questions, five questions per page.
     */
    const [pageIndex, setPageIndex] = useState(0);

    /**
     * a handler function to set the questions page to be displayed.
     * @param pageIndex the index currently being used to paginate the questions.
     * @param search the search query entered by the user.
     * @param title the title of the page being displayed.
     */
    const setQuestionPage = (pageIndex = 0, search = "", title = "All Questions") => {
        setPageIndex(pageIndex);
        setSearch(search);
        setMainTitle(title);
        setPageInstance(getPage({ pageName: "home", params }));
    };

    /**
     * a handler function to set the questions page to be displayed.
     * the handler is used to navigate to the home page from any other page.
     */
    const handleQuestions = () => {
        setPageIndex(0);
        setSearch("");
        setMainTitle("All Questions");
        setPageInstance(getPage({ pageName: "home", params }));
    };

    /**
     * a handler function to set the tags page to be displayed.
     * This is done by resetting the pageInstance to the tags page.
     */
    const handleTags = () => {
        setPageIndex(0);
        setSearch("");
        setPageInstance(getPage({ pageName: "tag", params }));
    };

    /**
     * a handler function to set the answer page of a question to be displayed.
     * @param qid the id of the question to be displayed.
     */
    const handleAnswer = (qid: string) => {
        const question = app.getQuestionById(qid);
        if (question) {
            question.addViewCount();
        }
        setQid(qid);
        setPageInstance(getPage({ pageName: "answer", params }));
    };

    /**
     * A handler function to set the page with the 
     * questions for the selected tag to be displayed.
     * This is done by resetting the pageInstance to the home page for a tag.
     * @param tname the name of the tag to be clicked.
     */
    const clickTag = (tname: string) => {
        setSearch(`[${tname}]`);
        setPageInstance(getPage({ pageName: "home", params }));
    };

    /**
     * A handler function to set the page with the form to add a new question to be displayed.
     */
    const handleNewQuestion = () => {
        setPageInstance(getPage({ pageName: "newQuestion", params }));
    };

    /**
     * A handler function to set the page with the form to add a new answer to be displayed.
     */
    const handleNewAnswer = () => {
        setPageInstance(getPage({ pageName: "newAnswer", params }));
    };

    /**
     * The parameters to be passed to the factory that creates a pageInstance.
     */
    const params = {
        app, search, title: mainTitle, pageIndex, setQuestionPage,
        questionOrder, setQuestionOrder, qid, handleQuestions,
        handleTags, handleAnswer, clickTag, handleNewQuestion,
        handleNewAnswer
    };

    /**
     * The pageInstance is used to decide which page should be displayed
     * in the current view.
     */
    const [pageInstance, setPageInstance] = useState(getPage({ pageName: "home", params }));

    /**
     * Set specific properties of the pageInstance before it is rendered.
     */
    console.log("VM Search", search);
    pageInstance.setSearch(search);
    pageInstance.setQuestionOrderType(questionOrder);
    pageInstance.setQid(qid);
    pageInstance.setPageIndex(pageIndex);
    pageInstance.setTitle(mainTitle);

    return {
        search,
        setQuestionPage,
        pageInstance,
        handleQuestions,
        handleTags
    };
};