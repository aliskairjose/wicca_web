import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '@shared/classes/app.config';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  constructor(private readonly http: HttpClient) { }

  masiveUpload(data: FormData, segment: string): Observable<any> {
    return this.http.post(AppConfig.baseUrl(segment), data);
  }
}
