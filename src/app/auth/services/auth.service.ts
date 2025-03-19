import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '@shared/apis';
import { Helper } from '@shared/helpers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(Helper.baseUrl(Api.Login), data);
  }

  logout(): Observable<any> {
    return this.http.get(Helper.baseUrl(Api.Logout));
  }
}
