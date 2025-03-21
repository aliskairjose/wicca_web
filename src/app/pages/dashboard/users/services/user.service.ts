import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper } from '@shared/helpers';
import { Api } from '@shared/apis';
import { UserInterface } from '../user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  list(params?: HttpParams): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(Helper.baseUrl(Api.Users), { params });
  }

  byId(id: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${Helper.baseUrl(Api.Users)}/${id}`);
  }
}
