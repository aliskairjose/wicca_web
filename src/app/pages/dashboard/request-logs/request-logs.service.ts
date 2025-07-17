import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '@shared/apis';
import { AppConfig } from '@shared/classes/app.config';
import { PaginationInterface, ParamsInterface, ResponseInterface } from '@shared/interfaces';
import { Observable } from 'rxjs';
import { RequestByAsesorInterface } from './interfaces/request-logs.interface';
import { RequestPieChart } from '../home/interfaces/request-pie-chart.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestLogsService {

  constructor(private readonly http: HttpClient) { }

  list(
    httpParams: ParamsInterface,
    pagination: PaginationInterface,
  ): Observable<ResponseInterface<RequestByAsesorInterface>> {
    let params = new HttpParams();
    Object.entries(httpParams).forEach(([k, v]) => (params = params.set(k, v)));
    Object.entries(pagination).forEach(([k, v]) => (params = params.set(k, v)));

    return this.http.get<ResponseInterface<RequestByAsesorInterface>>(AppConfig.baseUrl(Api.RequestLogs), { params });
  }

  getGroupBy(): Observable<RequestPieChart[]> {
    return this.http.get<RequestPieChart[]>(AppConfig.baseUrl(Api.RequestLogsGroup));
  }
}
