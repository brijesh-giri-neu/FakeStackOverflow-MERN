import { getMetaData } from "../util/dateFormatter";
import { AnswerParamType, AnswerPropsInterface } from "../types/types";

/**
 * Answer class to represent an answer object
 * and calculate the time elapsed since the answer was posted
 */
export default class Answer implements AnswerPropsInterface {
    private _aid: string;
    private _text: string;
    private _ansBy: string;
    private _ansDate: Date;

    /**
     * constructor to initialize the properties in an Answer object
     * @param param0 AnswerParamType object
     * @returns Answer object
     */
    constructor({ aid, text, ansBy, ansDate }: AnswerParamType) {
        this._aid = aid;
        this._text = text;
        this._ansBy = ansBy;
        this._ansDate = ansDate;
    }

    // Getters
    get aid(): string { return this._aid; }
    get text(): string { return this._text; }
    get ansBy(): string { return this._ansBy; }
    get ansDate(): Date { return this._ansDate; }

    /**
     * Calculates how long ago this answer was posted
     * @returns A string representing the elapsed time
     */
    calculateTimeElapsed(): string {
        return getMetaData(this.ansDate);
    }
}