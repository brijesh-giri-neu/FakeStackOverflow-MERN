import { ReactNode } from "react";
import Question from "../models/question";
import Answer from "../models/answer";
import Tag from "../models/tag";
import PageClass from "../components/routing";

/**
 * A type alias representing an object returned 
 * by the getQuestionsByFilter method in the ApplicationInterface interface
 */
export type QuestionsFilterType = { qSlice: Question[], qLength: number }

/**
 * An interface representing the properties of the Pagination component
 */
export interface PaginationProps {
    /**
     * start index of questions array in the application 
     * from which a slice of questions is retrieved
     * this index is incremented by the number of questions
     * that can be displayed at a time
     */
    pageNum: number;
    /**
     * total number of questions being displayed
     */
    qSize: number;
    /**
     * the search string used to search for questions 
     */
    search?: string;
    /**
     * the title of the page
     */
    title: string;
    /**
     * a function to set the page where the questions are displayed
     * based on a search string and start index
     */
    setQuestionPage?: SetQuestionPage;
}

/**
 * An interface representing the properties of the Header component
 */
export interface HeaderProps {
    /**
     * the search string used to search for questions
     */
    search: string;
    /**
     * a function to set the new questions to be displayed
     */
    setQuestionPage: SetQuestionPage;
}

/**
 * An interface representing the properties of the FakeStackOverflow component
 */
export interface FakeStackOverflowProps {
    /**
     * the application object that encapsulates the application data
     */
    app: ApplicationInterface;
}

/**
 * An interface representing the properties of the Main component
 */
export interface MainProps {
    /**
     * the search string used to search for questions
     */
    search: string;
    /**
     * a function to set the page where the questions are displayed based on a search string
     */
    setQuestionPage: SetQuestionPage;
    /**
     * Represents an instance of a page to be displayed in the current view
     */
    pageInstance: PageClass;
    /**
     * A function to display all questions in a specific order
     */
    handleQuestions: NoParamHandler;
    /**
     * A function to display all tags
     */
    handleTags: NoParamHandler;
}

/**
 * An interface representing the properties of the component
 * displaying answers to a question
 */
export interface AnswerPageProps {
    question: {
        /**
         * 
         * @returns the number of answers to the question
         */
        getAnswerCount: () => number;
        /**
         * the title of the question
         */
        title: string;
        /**
         * 
         * @returns the number of times a question has been viewed
         */
        getQuestionViews: () => number;
        /**
         * The text of the question
         */
        text: string;
        /**
         * The user who asked the question
         */
        askedBy: string;
        /**
         * 
         * @returns the time elapsed since the question was asked
         */
        calculateTimeElapsed: () => string;
    };
    ans: Array<{
        /**
         * The text of the answer
         */
        text: string;
        /**
         * The user who answered the question
         */
        ansBy: string;
        /**
         * 
         * @returns the time elapsed since the answer was posted
         */
        calculateTimeElapsed: () => string;
    }>;
    /**
     * 
     * a function to handle the creation of a new question
     */
    handleNewQuestion?: () => void;
    /**
     * 
     * a function to handle the creation of a new answer
     */
    handleNewAnswer?: () => void;
}

/**
 * An interface representing the input props of the Answer component
 */
export interface AnswerProps {
    text: string;
    ansBy: string;
    meta: string;
}

/**
 * An interface representing the input props of the AnswerHeader component
 */
export interface AnswerHeaderProps {
    ansCount: number;
    title: string;
    handleNewQuestion?: () => void;
}

/**
 * An interface representing the input props of a Question
 * to be displayed when showing all answers to that question
 */
export interface QuestionBodyProps {
  views: number;
  text: string;
  askby: string;
  meta: string;
}

/**
 * An interface representing the input props of a container form component
 */
export interface FormProps {
    children: ReactNode;
} 

/**
 * An interface representing the input props of a generic input component
 * capable of receiving user input
 */
export interface InputProps {
    title: string;
    hint?: string;
    id: string;
    mandatory?: boolean;
    val: string;
    setState: (value: string) => void;
    err?: string;
}

/**
 * An interface representing the input props of a generic textarea component
 */
export interface TextareaProps {
    title: string;
    mandatory?: boolean;
    hint?: string;
    id: string;
    val: string;
    setState: (value: string) => void;
    err?: string;
}

/**
 * An interface representing the input props a new answer component
 * rendered when a user wants to create a new answer for a question
 */
export interface NewAnswerProps {
    qid: string;
    addAnswer: (qid: string, answer: { text: string; ansBy: string }) => void;
    handleAnswer?: (qid: string) => void;
}

/**
 * An interface representing the properties of a new question component
 * rendered when a user wants to ask a new question
 */
export interface NewQuestionProps {
    /**
     * a function to add a new question to the application
     * @param question 
     * @returns 
     */
    addQuestion: (question: {
      title: string;
      text: string;
      tags: string[];
      askedBy: string;
    }) => void;
    /**
     * A function to set the next page 
     * to be displayed after a new question is asked
     */
    handleQuestions?: () => void;
}

/**
 * An interface representing the input properties of a question component
 * rendered when a user wants to view a question
 */
export interface QuestionProps {
    qid: string;
    title: string;
    text: string;
    tagIds: string[];
    askedBy: string;
    askDate: Date;
    ansIds: string[];
    views: number;
    getAnswerCount: () => number;
    getQuestionViews: () => number;
    getTagsId: () => string[];
    calculateTimeElapsed: () => string;
}

/**
 * An interface representing the input properties of a component
 * displaying a list of questions based on a 
 * search string, a page index, and an order
 */
export interface QuestionPageProps {
    title_text?: string;
    qlist: QuestionProps[];
    qSize: number,
    search?: string;
    pageNum: number,
    getTagById: (id: string) => Tag | null;
    setQuestionOrder?: (order: string) => void;
    clickTag?: (tagName: string) => void;
    handleAnswer?: (qid: string) => void;
    handleNewQuestion?: () => void;
    setQuestionPage?: SetQuestionPage;
}

/**
 * An interface representing the properties of a component
 * rendering the header of the page displaying a list of questions
 */
export interface QuestionHeaderProps {
    title_text?: string;
    qcnt: number;
    setQuestionOrder?: (order: string) => void;
    handleNewQuestion?: () => void;
}

/**
 * An interface representing the properties of a component
 * rendering the order buttons of the page displaying a list of questions
 */
export interface OrderButtonProps {
    /**
     * the order of the questions to be displayed
     */
    message: string;
    /**
     * a function to set the order of the questions to be displayed
     */
    setQuestionOrder?: (order: string) => void;
}

/**
 * An interface representing the input input props of a component
 * displaying a list of tags
 */
export interface TagPageProps {
    tlist: Tag[];
    getQuestionCountByTag: (tid: string) => number;
    clickTag: StringHandler | undefined;
    handleNewQuestion: NoParamHandler | undefined;
}

/**
 * An interface representing the input props of a component
 * displaying a single tag
 */
export interface TagProps {
    t: Tag;
    getQuestionCountByTag: (tid: string) => number;
    clickTag: StringHandler | undefined;
}

/**
 * An interface representing the input props of a component
 * rendering the sidebar of the application
 */
export interface SideBarNavProps {
    selected?: string;
    handleQuestions: () => void;
    handleTags: () => void;
}

/**
 * A type alias representing a function that takes no parameters and returns void
 */
export type NoParamHandler = () => void;

/**
 * A type alias representing a function that takes a string parameter and returns void
 */
export type StringHandler = (param: string) => void;

/**
 * A convenient group of type aliases for StringHandler and NoParamHandler
 */
export type {
    StringHandler as HandleAnswer,
    StringHandler as ClickTag,
    StringHandler as SetQuestionOrder,
    NoParamHandler as HandleQuestions,
    NoParamHandler as HandleTags,
    NoParamHandler as HandleNewQuestion,
    NoParamHandler as HandleNewAnswer,
};

/**
 * A type alias used to represent a function that can set the current list of questions to be displayed
 */
export type SetQuestionPage = (pageIndex: number, search: string, title: string) => void;

/**
 * An interface representing model's Answer object
 * All implementations of the Answer class must implement this interface
 */
export interface AnswerPropsInterface
 {
    aid: string;
    text: string;
    ansBy: string;
    ansDate: Date;
    calculateTimeElapsed: () => string;
}

/**
 * An interface representing the inupt parameters 
 * the constructor of the Answer class expects
 */
export interface AnswerParamType
 {
    aid: string;
    text: string;
    ansBy: string;
    ansDate: Date;
}

/**
 * An interface for the model's Question object
 * All implementations of the Question class must implement this interface
 */
export interface QuestionPropsInterface 
{
    qid: string;
    title: string;
    text: string;
    tagIds: string[];
    askedBy: string;
    askDate: Date;
    ansIds: string[];
    views: number;
    getAnswerCount: () => number;
    addAnswer: (aid: string) => void;
    getAnswersId: () => string[];
    getTagsId: () => string[];
    calculateTimeElapsed: () => string;
    getQuestionViews: () => number;
    addViewCount: () => void;
    setNewestAnswerDate: (date: Date) => void;
}

/**
 * An interface representing the input parameters
 * the constructor of the Question class expects
 */
export interface QuestionParamType {
    qid: string;
    title: string;
    text: string;
    tagIds: string[];
    askedBy: string;
    askDate: Date;
    ansIds: string[];
    views: number;
}

/**
 * An interface representing the input parameters
 * the constructor of the Tag class expects
 */
export interface TagParamType {
    tid: string;
    name: string;
}

/**
 * An interface representing the input parameters
 * the constructor of the Application class expects in the model
 */
export interface ApplicationProps {
    questions: QuestionParamType[];
    tags: TagParamType[];
    answers: AnswerParamType[];
}

/**
 * An interface for the model's Application class
 */
export interface ApplicationInterface {
    questions: QuestionParamType[];
    tags: TagParamType[];
    answers: AnswerParamType[];
    addAnswer: (qid: string, answer: { text: string; ansBy: string }) => string;
    addQuestion: (question: {
        title: string;
        text: string;
        askedBy: string;
        tags: string[];
    }) => string;
    addTag: (tagname: string) => string;
    getQuestionCountByTag: (tid: string) => number;
    getQuestionsByFilter: (startIndex: number, order?: string, search?: string) => QuestionsFilterType;
    getQuestionById: (qid: string | undefined) => Question | undefined;
    getQuestionAnswer: (question: Question | null) => Answer[];
    getTagCount: () => number;
    getTags: () => Tag[];
    getTagById: (id: string) => Tag | null;
}

/**
 * An interface representing the properties of the object needed to 
 * render a page in the application.
 * This type is used to set the pageInstance of a component
 */
export interface PageClassParams {
    app: ApplicationInterface;
    search: string;
    title: string;
    pageIndex: number;
    setQuestionPage: SetQuestionPage;
    questionOrder: string;
    setQuestionOrder: StringHandler;
    qid: string;
    handleQuestions: NoParamHandler;
    handleTags: NoParamHandler;
    handleAnswer: StringHandler;
    clickTag: StringHandler;
    handleNewQuestion: NoParamHandler;
    handleNewAnswer: NoParamHandler;
  }
