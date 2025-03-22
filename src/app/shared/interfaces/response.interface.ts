export interface ResponseInterface<T> {
    itemPerPage:  number;
    results:      T[];
    totalRecords: number;
    currentPage:  number;
    lastPage:     number;
}
