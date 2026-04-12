import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanInterface } from './interfaces/plan.interface';
import { AppConfig } from '@shared/classes/app.config';
import { Api } from '@shared/apis';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  list(): Observable<PlanInterface[]> {
    return this.http.get<PlanInterface[]>(AppConfig.baseUrl(Api.Planes));
  }

  create(plan: Partial<PlanInterface>): Observable<PlanInterface> {
    return this.http.post<PlanInterface>(AppConfig.baseUrl(Api.Planes), plan);
  }

  update(id: string, plan: Partial<PlanInterface>): Observable<PlanInterface> {
    return this.http.put<PlanInterface>(AppConfig.baseUrl(`${Api.Planes}/${id}`), plan);
  }

}
