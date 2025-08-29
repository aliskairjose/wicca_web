import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '@shared/apis';
import { AdvisorInterface, UserInterface } from '../user.interface';
import { PaginationInterface, ParamsInterface, ResponseInterface } from '@shared/interfaces';
import { AppConfig } from '@shared/classes/app.config';
import { UserSummaryInterface } from '../../request-logs/interfaces/summary.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) { }

  list(httpParams: ParamsInterface, pagination: PaginationInterface): Observable<ResponseInterface<UserInterface>> {
    let params = new HttpParams();
    Object.entries(httpParams).forEach(([k, v]) => (params = params.set(k, v)));
    Object.entries(pagination).forEach(([k, v]) => (params = params.set(k, v)));

    return this.http.get<ResponseInterface<UserInterface>>(AppConfig.baseUrl(Api.Users), { params });
  }

  byId(id: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${AppConfig.baseUrl(Api.Users)}/${id}`);
  }

  totalUsers(): Observable<any> {
    return this.http.get(AppConfig.baseUrl(Api.UsersTotals));
  }

  update(id: string, data: Partial<UserInterface>): Observable<UserInterface> {
    return this.http.patch<UserInterface>(`${AppConfig.baseUrl(Api.Users)}/${id}`, data);
  }

  getSummaryUser(): Observable<UserSummaryInterface> {
    return this.http.get<UserSummaryInterface>(AppConfig.baseUrl(Api.UserSummary));
  }

  create(data: Partial<UserInterface>): Observable<UserInterface> {
    return this.http.post<UserInterface>(AppConfig.baseUrl(Api.Register), data);
  }

  createdvisorInfo(data: AdvisorInterface): Observable<AdvisorInterface> {
    return this.http.post<AdvisorInterface>(AppConfig.baseUrl(Api.Advisor), data);
  }
}
