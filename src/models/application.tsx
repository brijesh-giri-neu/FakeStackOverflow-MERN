import Question from "./question";
import Tag from "./tag";
import Answer from "./answer";
import { ApplicationInterface, ApplicationProps, QuestionsFilterType } from "../types/types";
import { Observer } from "../observers/observer";
import { SortContext } from "../strategies/sortcontext";

/**
 * The class encapsulate the application data
 * and operations to manipulate the data.
 * The class is a singleton class.
 * All the data is stored in memory.
 * While this is an obvious limitation for large datasets
 * it is sufficient for a prototype such as this one.
 * @implements ApplicationInterface
 */

export default class Application implements ApplicationInterface {
    private static instance: Application;
    private _questions: Question[];
    private _tags: Tag[];
    private _answers: Answer[];
    private _observers: Map<string, Observer<any>> = new Map();

    /**
     * Getter for questions
     * @returns a shallow copy of the questions array
     */
    get questions() {
        return [...this._questions];
    }

    /**
     * Getter for tags
     * @returns a shallow copy of the tags array
     */
    get tags() {
        return [...this._tags];
    }

    /**
     * Getter for answers
     * @returns a shallow copy of the answers array
     */
    get answers() {
        return [...this._answers];
    }

    /**
     * Setter for questions
     * @param questions - the questions to be set
     */
    set questions(questions: Question[]) {
        this._questions = questions;
    }

    /**
     * Setter for tags
     * @param tags - the tags to be set
     */
    set tags(tags: Tag[]) {
        this._tags = tags;
    }

    /**
     * Setter for answers
     * @param answers - the answers to be set
     */
    set answers(answers: Answer[]) {
        this._answers = answers;
    }

    /**
     * private constructor to create a singleton instance of the Application
     * @param data - the questions, tags, and answers to be stored in the application 
     * @returns the singleton instance of the Application class
     */
    private constructor({ questions, tags, answers }: ApplicationProps) {
        this._questions = questions.map(q => new Question(q));
        this._tags = tags.map(t => new Tag(t));
        this._answers = answers.map(a => new Answer(a));
        
        // OBSERVER PATTERN
        // Register observers for each question
        this._questions.forEach(q => this.registerObserver(q.qid, q));

        // STRATEGY PATTERN
        // Set the latest answer date for each question
        this._questions.forEach(q => {
            const lastAnswer = this.getLastAnswerDate(q);
            if (lastAnswer) q.setNewestAnswerDate(lastAnswer);
        });
    }

     /**
     * Registers a generic observer for a given entity.
     * @param key - Unique key (e.g., question ID).
     * @param observer - The observer instance.
     */
     registerObserver<T>(key: string, observer: Observer<T>) {
        this._observers.set(key, observer);
    }

    /**
     * Notifies an observer about new data.
     * @param qid - Unique key (e.g., question ID).
     * @param answer - The update data.
     */
    notifyObserver<T>(key: string, data: T) {
        const observer = this._observers.get(key);
        if (observer) observer.update(data);
    }

    /**
     * getInstance method to get the singleton instance of the Application
     * @param data - the questions, tags, and answers 
     * to be stored in the application
     * @returns a singleton instance of the Application
     */
    public static getInstance(data: ApplicationProps): Application {
        if (!Application.instance) {
            Application.instance = new Application(data);
        }
        return Application.instance;
    }

    /**
     * saves a new answer for a selected question
     * @param qid an existing question id to add the answer to
     * @param answer answer to be added
     * @returns a unique id for the answer added
     */
    addAnswer = (qid: string, answer: { text: string; ansBy: string }) => {
        // Create unique ID for new answer
        const aid = this.generateUniqueId();
        
        // Create new answer with current date
        const newAnswer = new Answer({
            aid,
            text: answer.text,
            ansBy: answer.ansBy,
            ansDate: new Date()
        });
        
        // Add answer to answers array
        this.answers = [...this.answers, newAnswer];
        
        // Find question and add answer ID to it
        this.notifyObserver(qid, newAnswer);
        // const question = this.questions.find(q => q.qid === qid);
        // if (question) {
        //     question.addAnswer(aid);
        //     question.setNewestAnswerDate(newAnswer.ansDate);
        // }
        
        return aid;
    };

    /**
     * saves a new question to the application
     * @param question - the question to be added
     * @returns a unique id for the question added
     */
    addQuestion = (question: {
        title: string;
        text: string;
        askedBy: string;
        tags: string[];
    }) => {
        // Create unique ID for new question
        const qid = this.generateUniqueId();
        
        // Process tags - add new ones if needed
        const tagIds = question.tags.map(tagName => this.addTag(tagName));
        
        // Create new question
        const newQuestion = new Question({
            qid,
            title: question.title,
            text: question.text,
            tagIds,
            askedBy: question.askedBy,
            askDate: new Date(),
            ansIds: [],
            views: 0
        });
        
        // Add to questions array
        this.questions = [...this.questions, newQuestion];

        // Add it to the list of observers
        this.registerObserver(qid, newQuestion);

        return qid;
    };

    /**
     * adds a tag to a question if it does not exist
     * otherwise returns the tag id of an existing tagname
     * @param tagname - the name of the tag to be added
     * @returns existing tag or a new tag id
     */
    addTag = (tagname: string) => {
        // Check if tag already exists (case insensitive)
        const existingTag = this.tags.find(t => 
            t.name.toLowerCase() === tagname.toLowerCase()
        );
        if (existingTag) {
            return existingTag.tid;
        }
        
        // Create new tag if it doesn't exist
        const tid = this.generateUniqueId();
        const newTag = new Tag({ tid, name: tagname });
        this.tags = [...this.tags, newTag];
        
        return tid;
    };

    /**
     * retrieves the number of questions associated with an existing tag
     * @param tid an existing tag id in the application
     * @returns the number of questions associated with the tag
     */
    getQuestionCountByTag = (tid: string) => {
        return this.questions.filter(q => q.getTagsId().includes(tid)).length;
    };

    /**
     * retrieves a slice of questions in the application
     * of length 5, starting from a given index that match a search criteria
     * in an order selected by the user
     * @param startIndex the index to start retrieving questions from
     * @param order the display order of the questions, 
     * allowed values are "newest", "active", "unanswered"
     * @param search the search string entered by the user
     * @returns a object containing the slice of questions 
     * and the total number of questions matching the criteria and the order
     */
    getQuestionsByFilter = (startIndex: number, order?: string, search?: string): QuestionsFilterType => {
        let filteredQuestions = this.questions;

        // Apply search filter if provided
        console.log("Model Search", search);
        if (search) {
            const { tags, remainingQuery } = this.parseSearchQuery(search.toLowerCase());

            filteredQuestions = filteredQuestions.filter(q => {
                const titleLower = q.title.toLowerCase();
                const textLower = q.text.toLowerCase();
                const questionTags = this.getQuestionTags(q).map(tag => tag.name.toLowerCase());

                // Check if the question contains ANY keyword in title or text
                let matchesKeyword = false;
                if (remainingQuery.length > 0) {
                    matchesKeyword =  titleLower.includes(remainingQuery) || textLower.includes(remainingQuery);
                }

                // Check if the question contains ALL required tags
                let matchesAllTags = false;
                if(tags.length > 0) {
                    matchesAllTags = tags.every(tag => questionTags.includes(tag));
                }
                return matchesKeyword || matchesAllTags;
            });
        }

        // Apply ordering
        if (order) {
            const sortContext = new SortContext<Question>(order);
            filteredQuestions = sortContext.sort(filteredQuestions);
        }

        // Apply ordering
        // switch (order) {
        //     case 'newest':
        //         filteredQuestions.sort((a, b) => b.askDate.getTime() - a.askDate.getTime());
        //         break;

        //     case 'active':  
        //         // Sort by most recent answer date
        //         filteredQuestions.sort((a, b) => {
        //             const aLastAnswer = a.getLatestAnswerDate();
        //             const bLastAnswer = b.getLatestAnswerDate();

        //             if (aLastAnswer && bLastAnswer) {
        //                 // Both have answers, sort by latest answer date (descending)
        //                 return bLastAnswer.getTime() - aLastAnswer.getTime();
        //             }

        //             if (!aLastAnswer && !bLastAnswer) {
        //                 // Both are unanswered, sort by ask date (descending)
        //                 return b.askDate.getTime() - a.askDate.getTime();
        //             }

        //             // If one has answers and the other doesn’t, prioritize answered questions
        //             return aLastAnswer ? -1 : 1;
        //         });
        //         break;
            

        //     case 'unanswered':
        //         filteredQuestions = filteredQuestions.filter(q => q.getAnswerCount() === 0);
        //         filteredQuestions.sort((a, b) => b.askDate.getTime() - a.askDate.getTime());
        //         break;
        // }

        // Paginate results - 5 questions per page
        const pageSize = 5;
        const qSlice = filteredQuestions.slice(startIndex, startIndex + pageSize);

        return {
            qSlice,
            qLength: filteredQuestions.length
        };
    };

    /**
     * retrieve a question object by its id
     * @param qid 
     * @returns a question object if the question id exists in the application
     * otherwise returns undefined
     */
    getQuestionById = (qid: string | undefined) : Question | undefined => {
        return this.questions.find(q => q.qid === qid);
    };

    /**
     * retrieves the answers to a question
     * @param question a question object or null
     * @returns an array of answer objects to the question
     * the answers are sorted by the date they were added,
     * that is, the newest answer is the first in the array
     */
    getQuestionAnswer = (question: Question | null) => {
        if (!question) return [];
        return question.getAnswersId()
            .map(aid => this.answers.find(a => a.aid === aid))
            .filter((a): a is Answer => a !== undefined)
            .sort((a, b) => b.ansDate.getTime() - a.ansDate.getTime());
    };

    /**
     * 
     * @returns the number of tags in the application
     */
    getTagCount = () => {
        return this.tags.length;
    };

    /**
     * 
     * @returns an array of tag objects in the application
     */
    getTags = () => {
        return this.tags;
    };

    /**
     * retrieves a tag object by its id
     * @param id an existing tag id in the application
     * @returns a tag object if the tag id exists in the application
     * otherwise returns null
     */
    getTagById = (id: string): Tag | null => {
        return this.tags.find(t => t.tid === id) || null;
    };

    /**
     * Helper method to get the latest answer date for a question
     */
    private getLastAnswerDate(question: Question): Date | null {
        const answerDates = question.getAnswersId()
            .map(aid => this.answers.find(a => a.aid === aid))
            .filter((a): a is Answer => a !== undefined)
            .map(a => a.ansDate);
            
        console.log("Existing logic", new Date(Math.max(...answerDates.map(d => d.getTime()))));
        console.log("Using internal logic", question.newAnsDate);
        
        return answerDates.length > 0 
            ? new Date(Math.max(...answerDates.map(d => d.getTime())))
            : null;
    }

    /**
     * Helper method to get tags for a question
     */
    private getQuestionTags(question: Question): Tag[] {
        return question.getTagsId()
            .map(tid => this.tags.find(t => t.tid === tid))
            .filter((t): t is Tag => t !== undefined);
    }

    /**
     * Utility method to generate unique IDs.
     * @private
     * @returns A unique string ID
     */
    private generateUniqueId(): string {
        // Example: Use a timestamp + random. 
        return Date.now().toString(36) + Math.random().toString(36).slice(2);
    }

    /**
     * Parses the search query into separate tags and keywords.
     * Handles:
     * - Extracting tags from `[tag1][tag2]` format.
     * - Extracting keywords from the remaining text.
     * @param query The search input string
     * @returns An object with separated `tags` and `keywords`
     */
    private parseSearchQuery(query: string): { tags: string[]; remainingQuery: string } {
        const tagPattern = /\[([^\]]+)]/g; // Matches words inside square brackets
        let foundTags: string[] = [];
        let remainingQuery = query;
    
        let match;
        while ((match = tagPattern.exec(query)) !== null) {
            const tag = match[1].trim().toLowerCase(); // Extract and trim tag
            console.log("tag", tag);
            if (tag.length > 0) foundTags = [...foundTags, tag]; // Ignore empty tags (`[]`)
            remainingQuery = remainingQuery.replace(match[0], "").trim(); // Remove extracted tag from query
        }
    
        return { tags: foundTags, remainingQuery };
    }
}
