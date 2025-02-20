/**
 * Sort Strategy interface
 * @template T - The type of items to sort
 */
export interface SortStrategy<T> {
    sort(items: T[]): T[];
}