import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '@shared/apis';
import { Helper } from '@shared/helpers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private readonly http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(Helper.baseUrl(Api.Dashboard));
  }
}
