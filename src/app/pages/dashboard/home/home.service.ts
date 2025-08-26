import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '@shared/apis';
import { AppConfig } from '@shared/classes/app.config';
import { Observable } from 'rxjs';
import { TopRatedInterface } from './interfaces/top-rated.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private readonly http: HttpClient) { }

  getTopAdvisors(): Observable<TopRatedInterface[]> {
    return this.http.get<TopRatedInterface[]>(AppConfig.baseUrl(Api.TopRatedAdvisor));
  }
}
