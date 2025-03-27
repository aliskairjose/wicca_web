export interface ResponseInterface<T> {
  results: T[];
  itemPerPage: number;
  resultsLength: number;
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}
