import Question from "../models/question";
import { SortStrategy } from "./sortstrategy";

/**
 * Newest Sort Strategy
 * @template T - The type of items to sort
 */
export class NewestSortStrategy implements SortStrategy<Question> {
    sort(questions: Question[]): Question[] {
        return questions.sort((a, b) => b.askDate.getTime() - a.askDate.getTime());
    }
}
