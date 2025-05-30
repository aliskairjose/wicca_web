import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationInterface, ParamsInterface, ResponseInterface } from '@shared/interfaces';
import { Observable } from 'rxjs';
import { RoomInterface } from './interfaces/room.interface';
import { Helper } from '@shared/helpers';
import { Api } from '@shared/apis';
import { MessageInterface } from './interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private readonly http: HttpClient) { }

  rooms(
    httpParams: ParamsInterface,
    pagination: PaginationInterface,
  ): Observable<ResponseInterface<RoomInterface>> {
    let params = new HttpParams();
    Object.entries(httpParams).forEach(([k, v]) => (params = params.set(k, v)));
    Object.entries(pagination).forEach(([k, v]) => (params = params.set(k, v)));

    return this.http.get<ResponseInterface<RoomInterface>>(Helper.baseUrl(Api.Rooms), { params });
  }

  roomById(id: string): Observable<RoomInterface> {
    return this.http.get<RoomInterface>(`${Helper.baseUrl(Api.Rooms)}/${id}`);
  }


}
