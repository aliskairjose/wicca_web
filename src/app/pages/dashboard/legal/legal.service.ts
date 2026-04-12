import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LegalInterface } from './interfaces/legal.interface';
import { AppConfig } from '@shared/classes/app.config';
import { Api } from '@shared/apis';

@Injectable({
  providedIn: 'root'
})
export class LegalService {

  constructor(
    private readonly http: HttpClient
  ) { }

  list(): Observable<LegalInterface[]> {
    return this.http.get<LegalInterface[]>(AppConfig.baseUrl(Api.Legal));
  }

  update(id: string, legal: Partial<LegalInterface>): Observable<LegalInterface> {
    return this.http.patch<LegalInterface>(AppConfig.baseUrl(`${Api.Legal}/${id}`), legal);
  }

  create(legal: Partial<LegalInterface>): Observable<LegalInterface> {
    return this.http.post<LegalInterface>(AppConfig.baseUrl(Api.Legal), legal);
  }
}
