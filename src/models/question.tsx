import { getMetaData } from "../util/dateFormatter";
import { QuestionParamType, QuestionPropsInterface } from "../types/types";
import { Observer } from "../observers/observer";
import Answer from "./answer";
/**
 * Question class to represent a question object
 * and the operations that can be performed on it
 * @implements QuestionPropsInterface
 */
export default class Question implements QuestionPropsInterface, Observer<Answer> {
    private _qid: string;
    private _title: string;
    private _text: string;
    private _tagIds: string[];
    private _askedBy: string;
    private _askDate: Date;
    private _ansIds: string[];
    private _views: number;
    private _newAnsDate?: Date;

    /**
     * Creates a new Question instance
     * @param qid - Unique identifier for the question
     * @param title - Question title
     * @param text - Question content
     * @param tagIds - Array of tag IDs associated with the question
     * @param askedBy - Username of question author
     * @param askDate - Date when question was asked
     * @param ansIds - Array of answer IDs
     * @param views - Number of times question has been viewed
     */
    constructor({ qid, title, text, tagIds, askedBy, askDate, ansIds, views }: QuestionParamType) {
        this._qid = qid;
        this._title = title;
        this._text = text;
        this._tagIds = tagIds;
        this._askedBy = askedBy;
        this._askDate = askDate;
        this._ansIds = ansIds;
        this._views = views;
    }

    /**
     * Implements Observer's update() method.
     * Called when a new answer is added to this question.
     */
    update(answer: Answer): void {
        if (answer) {
            this.addAnswer(answer.aid);
            this.setNewestAnswerDate(answer.ansDate);
        }
    }

    // Getters with JSDoc
    /** Gets the question's unique identifier */
    get qid(): string { return this._qid; }
    
    /** Gets the question's title */
    get title(): string { return this._title; }
    
    /** Gets the question's content */
    get text(): string { return this._text; }
    
    /** Gets the array of tag IDs */
    get tagIds(): string[] { return [...this._tagIds]; }
    
    /** Gets the username of who asked the question */
    get askedBy(): string { return this._askedBy; }
    
    /** Gets the date when question was asked */
    get askDate(): Date { return this._askDate; }
    
    /** Gets the array of answer IDs */
    get ansIds(): string[] { return [...this._ansIds]; }
    
    /** Gets the number of views */
    get views(): number { return this._views; }
    
    /** Gets the date of the newest answer */
    get newAnsDate(): Date | undefined { return this._newAnsDate; }

    /** Sets the array of answer IDs */
    set ansIds(ansIds: string[]) { this._ansIds = ansIds; }

    /**
     * Gets the number of answers for this question
     * @returns Number of answers
     */
    getAnswerCount(): number {
        return this.ansIds.length;
    }

    /**
     * Adds a new answer ID to the question
     * @param aid - The answer ID to add
     */
    addAnswer(aid: string): void {
        this.ansIds = [...this.ansIds, aid];
        console.log("Adding answer to question");
    }

    /**
     * Gets all answer IDs for this question
     * @returns Array of answer IDs
     */
    getAnswersId(): string[] {
        return this.ansIds;
    }

    /**
     * Gets all tag IDs for this question
     * @returns Array of tag IDs
     */
    getTagsId(): string[] {
        return this.tagIds;
    }

    /**
     * Calculates time elapsed since question was asked
     * @returns Formatted string representing elapsed time
     */
    calculateTimeElapsed(): string {
        return getMetaData(this.askDate);
    }

    /**
     * Gets the current view count
     * @returns Number of views
     */
    getQuestionViews(): number {
        return this.views;
    }

    /**
     * Increments the view count by one
     */
    addViewCount(): void {
        this._views += 1;
        console.log("Adding view count to question");
    }

    /**
     * Updates the newest answer date
     * @param date - Date of the newest answer
     */
    setNewestAnswerDate(date: Date): void {
        this._newAnsDate = date;
        console.log("Setting newest answer date");
    }

    /**
     * Gets the latest answer date
     * @returns Date of the latest answer
     */
    getLatestAnswerDate(): Date | undefined {
        return this.newAnsDate;
    }
}
