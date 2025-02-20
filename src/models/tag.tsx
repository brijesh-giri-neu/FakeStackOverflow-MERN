import { TagParamType } from "../types/types";

/**
 * Tag class to represent a tag object
 */
export default class Tag {
    private _tid: string;
    private _name: string;

    /**
     * constructor to initialize the properties in a Tag object
     * @param param0 TagParamType object
     * @returns Tag object
     */
    constructor({ tid, name }: TagParamType) {
        this._tid = tid;
        this._name = name;
    }

    // Getters
    get tid(): string { return this._tid; }
    get name(): string { return this._name; }
}
