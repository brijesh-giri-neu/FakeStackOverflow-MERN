import { ApplicationInterface } from "../../types/types";

/**
 * Abstract base class for all page classes
 * Handles common page functionality and state
 */
export default abstract class PageClass {
    private app: ApplicationInterface;
    protected search?: string;
    protected questionOrder?: string;
    protected title?: string;
    protected qid = "";
    protected pageIndex = 0;

    /**
     * Creates a new PageClass instance
     * @param app - Application interface instance
     */
    protected constructor(app: ApplicationInterface) {
        this.app = app;
    }

    /**
     * Sets the search term for filtering
     * @param search - Search term to filter by
     */
    public setSearch(search: string) {
        this.search = search;
    }

    /**
     * Sets the question ordering type
     * @param questionOrder - Order type (newest, active, unanswered)
     */
    public setQuestionOrderType(questionOrder: string) {
        this.questionOrder = questionOrder;
    }

    /**
     * Sets the current question ID
     * @param qid - Question ID
     */
    public setQid(qid: string) {
        this.qid = qid;
    }

    /**
     * Sets the page title
     * @param title - Page title
     */
    public setTitle(title: string) {
        this.title = title;
    }

    /**
     * Sets the current page index for pagination
     * @param index - Page index
     */
    public setPageIndex(index: number) {
        this.pageIndex = index;
    }

    /**
     * Gets the content to render for this page
     * @returns JSX Element to render
     */
    public abstract getContent(): JSX.Element | null;

    /**
     * Gets the selected navigation item for this page
     * @returns Selected nav item identifier
     */
    public abstract getSelected(): string;

    /**
     * Gets the application interface instance
     * @returns Application interface
     */
    public getApp(): ApplicationInterface {
        return this.app;
    }
}
