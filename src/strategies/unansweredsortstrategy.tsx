import Question from "../models/question";
import { SortStrategy } from "./sortstrategy";

/**
 * Unanswered Sort Strategy
 * @template T - The type of items to sort
 */
export class UnansweredSortStrategy implements SortStrategy<Question> {
    sort(questions: Question[]): Question[] {
        // Filter questions with no answers
        const filteredQuestions = questions.filter(q => q.getAnswerCount() === 0);
        // Sort by ask date (descending)
        filteredQuestions.sort((a, b) => b.askDate.getTime() - a.askDate.getTime());
        return filteredQuestions;
    }
}