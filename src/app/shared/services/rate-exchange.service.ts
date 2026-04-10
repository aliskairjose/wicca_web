import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '@shared/apis';
import { AppConfig } from '@shared/classes/app.config';
import { RateExchangeInterface } from '@shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateExchangeService {

  constructor(private readonly http: HttpClient) { }

  get(): Observable<RateExchangeInterface[]> {
    return this.http.get<RateExchangeInterface[]>(AppConfig.baseUrl(Api.RateExchange));
  }

  update(id: string, rate: Partial<RateExchangeInterface>): Observable<RateExchangeInterface> {
    return this.http.patch<RateExchangeInterface>(`${AppConfig.baseUrl(Api.RateExchange)}/${id}`, rate);
  }

}
