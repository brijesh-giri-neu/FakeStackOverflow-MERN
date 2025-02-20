/**
 * Generic Observer Interface
 * @template T - The type of data that will be passed to observers.
 */
export interface Observer<T> {
    update(data: T): void;
}
