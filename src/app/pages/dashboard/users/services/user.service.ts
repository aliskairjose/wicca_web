import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper } from '@shared/helpers';
import { Api } from '@shared/apis';
import { UserInterface } from '../user.interface';
import { PaginationInterface, ResponseInterface } from '@shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  list(query = '', pagination?: PaginationInterface): Observable<ResponseInterface<UserInterface>> {
    let httpParams = new HttpParams();

    const params={query, ...pagination};

    Object.entries( params ).forEach( ( [k, v ]) => {
      (v) && (httpParams = httpParams.set(k, v));
    });

    return this.http.get<ResponseInterface<UserInterface>>(Helper.baseUrl(Api.Users), {
      params: httpParams,
    });
  }

  byId(id: string): Observable<ResponseInterface<UserInterface>> {
    return this.http.get<ResponseInterface<UserInterface>>(`${Helper.baseUrl(Api.Users)}/${id}`);
  }
}
