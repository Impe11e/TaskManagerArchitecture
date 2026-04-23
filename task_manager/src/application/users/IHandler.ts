export interface IHandler<TInput, TOutput> {
    handle(input: TInput): Promise<TOutput>;
}