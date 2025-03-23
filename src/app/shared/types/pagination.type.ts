import { ResponseInterface } from "@shared/interfaces";

export type PaginationType = Omit<ResponseInterface<unknown>, 'results'>;
