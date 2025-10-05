import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '@shared/apis';
import { AppConfig } from '@shared/classes/app.config';
import { RoleEnum } from '@shared/enums';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {

    data = { ...data, role: RoleEnum.Admin };
    return this.http.post(AppConfig.baseUrl(Api.Login), data);
  }

  logout(): Observable<any> {
    return this.http.get(AppConfig.baseUrl(Api.Logout));
  }

  verifyAccount(token: string): Observable<any> {
    return this.http.get(AppConfig.baseUrl(`${Api.VerifyAccount}/${token}`));
  }
}
