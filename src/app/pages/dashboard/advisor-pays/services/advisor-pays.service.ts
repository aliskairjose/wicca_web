import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationInterface, ParamsInterface, ResponseInterface } from '@shared/interfaces';
import { Observable } from 'rxjs';
import { AdvisorPaysInterface } from '../interfaces/advisor-pays.interface';
import { AppConfig } from '@shared/classes/app.config';
import { Api } from '@shared/apis';

@Injectable({
  providedIn: 'root'
})
export class AdvisorPaysService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getList(httpParams: ParamsInterface, pagination:PaginationInterface): Observable<ResponseInterface<AdvisorPaysInterface>>{
    let params = new HttpParams();
     Object.entries(httpParams).forEach(([k, v]) => (params = params.set(k, v)));
    Object.entries(pagination).forEach(([k, v]) => (params = params.set(k, v)));
    return this.http.get<ResponseInterface<AdvisorPaysInterface>>(AppConfig.baseUrl(Api.AdvisorPays), {params});
  }

  downloadReport(httpParams: ParamsInterface): Observable<Blob> {
    let params = new HttpParams();
    Object.entries(httpParams).forEach(([k, v]) => (params = params.set(k, v)));
    return this.http.get<Blob>(`${AppConfig.baseUrl(Api.AdvisorPaysReport)}`, { params, responseType: 'blob' as 'json' });
  }
}
