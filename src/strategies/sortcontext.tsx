import { ActiveSortStrategy } from "./activesortstrategy";
import { NewestSortStrategy } from "./newestsortstrategy";
import { SortStrategy } from "./sortstrategy";
import { UnansweredSortStrategy } from "./unansweredsortstrategy";

/**
 * SortContext class
 * @template T - The type of items to sort
 */
export class SortContext<T> {
    private static strategies: Map<string, SortStrategy<any>> = new Map([
        ["newest", new NewestSortStrategy()],
        ["active", new ActiveSortStrategy()],
        ["unanswered", new UnansweredSortStrategy()]
    ]);

    private strategy: SortStrategy<T>;

    /**
     * Constructor for the SortContext class
     * @param order - The order to sort the items by
     */
    constructor(order: string) {
        this.strategy = SortContext.strategies.get(order) || new NewestSortStrategy();
    }

    /**
     * Sorts the items by the selected strategy
     * @param items - The items to sort
     * @returns The sorted items
     */
    sort(items: T[]): T[] {
        return this.strategy.sort(items);
    }
}
