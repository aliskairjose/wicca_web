import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '@shared/apis';
import { AppConfig } from '@shared/classes/app.config';
import { PaginationInterface, ParamsInterface, ResponseInterface, ReviewInterface } from '@shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  constructor(private readonly http: HttpClient) { }

  masiveUpload(data: FormData, segment: string): Observable<any> {
    return this.http.post(AppConfig.baseUrl(segment), data);
  }


  reviews(httpParams: ParamsInterface, pagination: PaginationInterface): Observable<ResponseInterface<ReviewInterface>> {
    let params = new HttpParams();
    Object.entries(httpParams).forEach(([k, v]) => (params = params.set(k, v)));
    Object.entries(pagination).forEach(([k, v]) => (params = params.set(k, v)));

    return this.http.get<ResponseInterface<ReviewInterface>>(AppConfig.baseUrl(Api.Reviews), { params });
  }
}
