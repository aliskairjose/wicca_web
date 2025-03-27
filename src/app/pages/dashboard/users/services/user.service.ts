import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper } from '@shared/helpers';
import { Api } from '@shared/apis';
import { UserInterface } from '../user.interface';
import { ParamsInterface, ResponseInterface } from '@shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) { }

  list(params: ParamsInterface): Observable<ResponseInterface<UserInterface>> {
    let httpParams = new HttpParams();

    (params.query) && (httpParams = httpParams.set('query', params.query));

    (params.pagination) &&
      Object.entries(params.pagination).forEach(([k, v]) => {
        (v) && (httpParams = httpParams.set(k, v));
      });

    return this.http.get<ResponseInterface<UserInterface>>(Helper.baseUrl(Api.Users), {
      params: httpParams,
    });
  }

  byId(id: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${Helper.baseUrl(Api.Users)}/${id}`);
  }

  totalUsers(): Observable<any> {
    return this.http.get(Helper.baseUrl(Api.UsersTotals));
  }
}
