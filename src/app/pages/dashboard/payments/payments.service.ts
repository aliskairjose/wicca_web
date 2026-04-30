import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentInterface } from './interfaces/payment.interface';
import { PaginationInterface, ParamsInterface, ResponseInterface } from '@shared/interfaces';
import { AppConfig } from '@shared/classes/app.config';
import { Api } from '@shared/apis';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private readonly http: HttpClient) { }

  list(httpParams: ParamsInterface, pagination: PaginationInterface): Observable<ResponseInterface<PaymentInterface>> {
    let params = new HttpParams();
    Object.entries(httpParams).forEach(([k, v]) => (params = params.set(k, v)));
    Object.entries(pagination).forEach(([k, v]) => (params = params.set(k, v)));
    return this.http.get<ResponseInterface<PaymentInterface>>(AppConfig.baseUrl(Api.Payments), { params });
  }

}
