export interface ISearchByTitleResponse<T> {
    page: number; // 1
    results: T[];
    total_pages: number; // 1
    total_results: number; // 19
}
