import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '@shared/apis';
import { AppConfig } from '@shared/classes/app.config';
import { Observable } from 'rxjs';
import { TopRatedInterface } from './interfaces/top-rated.interface';
import { UserInterface } from '../users/user.interface';
import { AccumulatedTimeInterface } from '../request-logs/interfaces/summary.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private readonly http: HttpClient) { }

  getTopAdvisors(): Observable<TopRatedInterface[]> {
    return this.http.get<TopRatedInterface[]>(AppConfig.baseUrl(Api.TopRatedAdvisor));
  }

  getNewRegistrations(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(AppConfig.baseUrl(Api.NewRegistrations));
  }

  getAccumulatedTime(): Observable<AccumulatedTimeInterface[]> {
    return this.http.get<AccumulatedTimeInterface[]>(AppConfig.baseUrl(Api.AccumulatedTime));
  }
}
