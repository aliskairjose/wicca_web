import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationInterface, ParamsInterface, ResponseInterface } from '@shared/interfaces';
import { Observable } from 'rxjs';
import { BankInterface } from './interfaces/bank.interface';
import { AppConfig } from '@shared/classes/app.config';
import { Api } from '@shared/apis';

@Injectable({
  providedIn: 'root'
})
export class BanksService {

  constructor(
    private readonly http: HttpClient
  ) { }

  banks(httpParams: ParamsInterface,
    pagination: PaginationInterface,): Observable<ResponseInterface<BankInterface>> {
    let params = new HttpParams();
    Object.entries(httpParams).forEach(([k, v]) => (params = params.set(k, v)));
    Object.entries(pagination).forEach(([k, v]) => (params = params.set(k, v)));
    return this.http.get<ResponseInterface<BankInterface>>(AppConfig.baseUrl(Api.Banks), { params });

  }

  masiveUpload(data: FormData): Observable<any> {
    return this.http.post(AppConfig.baseUrl(Api.BankMasiveUpload), data);
  }
}
