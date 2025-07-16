import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '@shared/apis';
import { AppConfig } from '@shared/classes/app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private readonly http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(AppConfig.baseUrl(Api.Dashboard));
  }
}
