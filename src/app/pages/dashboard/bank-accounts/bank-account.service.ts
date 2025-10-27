import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationInterface, ParamsInterface, ResponseInterface } from '@shared/interfaces';
import { Observable } from 'rxjs';
import { BankAccountInterface } from './interfaces/bank-accounts.interface';
import { AppConfig } from '@shared/classes/app.config';
import { Api } from '@shared/apis';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(
    private readonly http: HttpClient
  ) { }

  list(httpParams: ParamsInterface,
    pagination: PaginationInterface,): Observable<ResponseInterface<BankAccountInterface>> {
    let params = new HttpParams();
    Object.entries(httpParams).forEach(([k, v]) => (params = params.set(k, v)));
    Object.entries(pagination).forEach(([k, v]) => (params = params.set(k, v)));
    return this.http.get<ResponseInterface<BankAccountInterface>>(AppConfig.baseUrl(Api.BanksAccounts), { params });

  }

  masiveUpload(data: FormData): Observable<any> {
    return this.http.post(AppConfig.baseUrl(Api.BankAccountMasiveUpload), data);
  }

  create(body: Omit<BankAccountInterface, '_id'>): Observable<BankAccountInterface> {
    return this.http.post<BankAccountInterface>(AppConfig.baseUrl(Api.BanksAccounts), body);
  }
}
