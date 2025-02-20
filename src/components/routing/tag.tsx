import PageClass from "./index";
import TagPage from "../Main/tagPage";
import { ApplicationInterface, StringHandler, NoParamHandler } from "../../types/types";

/**
 * Class representing the tags page
 * Extends the abstract PageClass to handle tag page specific functionality
 */
export default class TagPageClass extends PageClass {

    private clickTag?: StringHandler;
    private handleNewQuestion?: NoParamHandler;

    /**
     * Creates a new TagPageClass instance
     * @param app - Application interface instance
     * @private
     */
    private constructor(app: ApplicationInterface) {
        super(app);
    }

    /**
     * Builder method to create a new TagPageClass instance
     * @param app - Application interface instance
     * @returns New TagPageClass builder instance
     */
    public static TagPageClassBuilder(app: ApplicationInterface): TagPageClass {
        return new TagPageClass(app);
    }

    /**
     * Sets the tag click handler
     * @param clickTag - Handler function for tag click events
     * @returns This instance for chaining
     */
    public setClickTagFunc(clickTag: StringHandler): TagPageClass {
        this.clickTag = clickTag;
        return this;
    }

    /**
     * Sets the new question handler
     * @param handleNewQuestion - Handler function for new question creation
     * @returns This instance for chaining
     */
    public setHandleNewQuestionFunc(handleNewQuestion: NoParamHandler): TagPageClass {
        this.handleNewQuestion = handleNewQuestion;
        return this;
    }

    /**
     * Completes the builder pattern
     * @returns The fully configured TagPageClass instance
     */
    public build(): TagPageClass {
        return this;
    }

    /**
     * Gets the content to render for the tags page
     * @returns JSX Element containing the tag page
     * @override
     */
    public getContent() {
        try {
            return (
                <TagPage
                    tlist={this.getApp().getTags()}
                    getQuestionCountByTag={this.getApp().getQuestionCountByTag}
                    clickTag={this.clickTag}
                    handleNewQuestion={this.handleNewQuestion}
                />
            );
        }
        catch (e) {
            console.error(`Failed to set TagPage props: ${e}`);
            return null;
        }
    }

    /**
     * Gets the selected navigation item for this page
     * @returns "t" to indicate tags section
     * @override
     */
    public getSelected() {
        return "t";
    }
}