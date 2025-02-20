import Question from "../models/question";
import { SortStrategy } from "./sortstrategy";

/**
 * Active Sort Strategy
 * @template T - The type of items to sort
 */
export class ActiveSortStrategy implements SortStrategy<Question> {
    sort(questions: Question[]): Question[] {
       // Sort by most recent answer date
       const filteredQuestions = questions.sort((a, b) => {
            const aLastAnswer = a.getLatestAnswerDate();
            const bLastAnswer = b.getLatestAnswerDate();

            if (aLastAnswer && bLastAnswer) {
                // Both have answers, sort by latest answer date (descending)
                return bLastAnswer.getTime() - aLastAnswer.getTime();
            }

            if (!aLastAnswer && !bLastAnswer) {
                // Both are unanswered, sort by ask date (descending)
                return b.askDate.getTime() - a.askDate.getTime();
            }

            // If one has answers and the other doesn't, prioritize answered questions
            return aLastAnswer ? -1 : 1;
        });
        return filteredQuestions;
    }
}   

