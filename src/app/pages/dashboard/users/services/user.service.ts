import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper } from '@shared/helpers';
import { Api } from '@shared/apis';
import { UserInterface } from '../user.interface';
import { PaginationInterface } from '@shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  list(params: PaginationInterface): Observable<UserInterface[]> {
    let httpParams = new HttpParams();

    Object.entries( params ).forEach( ( [k, v ]) => {
      httpParams = httpParams.set(k, v);
    });

    return this.http.get<UserInterface[]>(Helper.baseUrl(Api.Users), {
      params: httpParams,
    });
  }

  byId(id: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${Helper.baseUrl(Api.Users)}/${id}`);
  }
}
