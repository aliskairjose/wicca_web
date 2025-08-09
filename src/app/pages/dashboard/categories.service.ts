import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationInterface, ParamsInterface, ResponseInterface } from '@shared/interfaces';
import { CategoryInterface } from './categories/interfaces/category.interface';
import { Observable } from 'rxjs';
import { AppConfig } from '@shared/classes/app.config';
import { Api } from '@shared/apis';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private readonly http: HttpClient) { }

  list(httpParams: ParamsInterface, pagination: PaginationInterface): Observable<ResponseInterface<CategoryInterface>> {
    let params = new HttpParams();
    Object.entries(httpParams).forEach(([k, v]) => (params = params.set(k, v)));
    Object.entries(pagination).forEach(([k, v]) => (params = params.set(k, v)));

    return this.http.get<ResponseInterface<CategoryInterface>>(AppConfig.baseUrl(Api.Categories), { params });
  }


  byId(id: string): Observable<CategoryInterface> {
    return this.http.get<CategoryInterface>(`${AppConfig.baseUrl(Api.Categories)}/${id}`);
  }

  update(id: string, data: Partial<CategoryInterface>): Observable<CategoryInterface> {
    return this.http.put<CategoryInterface>(`${AppConfig.baseUrl(Api.Categories)}/${id}`, data);
  }
}
