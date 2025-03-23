export interface ResponseInterface<T> {
    itemPerPage:  number;
    results:      T[];
    resultsLength: number;
    totalRecords: number;
    currentPage:  number;
    totalPages:     number;
}
