import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper } from '@shared/helpers';
import { Api } from '@shared/apis';
import { UserInterface } from '../user.interface';
import { PaginationInterface, ParamsInterface, ResponseInterface } from '@shared/interfaces';
import { ConnectStatusEnum } from '@shared/enums';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) { }

  list(httpParams: ParamsInterface, pagination: PaginationInterface): Observable<ResponseInterface<UserInterface>> {
    let params = new HttpParams();
    Object.entries(httpParams).forEach(([k, v]) => (params = params.set(k, v)));
    Object.entries(pagination).forEach(([k, v]) => (params = params.set(k, v)));

    return this.http.get<ResponseInterface<UserInterface>>(Helper.baseUrl(Api.Users), { params });
  }

  byId(id: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${Helper.baseUrl(Api.Users)}/${id}`);
  }

  totalUsers(): Observable<any> {
    return this.http.get(Helper.baseUrl(Api.UsersTotals));
  }

  delete(id: string): Observable<UserInterface> {
    const body = { isActive: false, connectStatus: ConnectStatusEnum.Away }
    return this.http.patch<UserInterface>(`${Helper.baseUrl(Api.Users)}/${id}`, body);
  }
}
