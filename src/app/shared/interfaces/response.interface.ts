export interface ResponseInterface<T> {
  results: T[];
  metadata: MetadataInterface;
}

export interface MetadataInterface {
  itemPerPage: number;
  resultsLength: number;
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}
