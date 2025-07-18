import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  #toggleSidebar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  toggleSidebarObservable(): Observable<boolean> {
    return this.#toggleSidebar.asObservable();
  }

  toggleSidebar(value: boolean): void {
    this.#toggleSidebar.next(value);
  }
}
