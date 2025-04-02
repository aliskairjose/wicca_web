import { ApplicationRef, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, Event, NavigationEnd } from '@angular/router';
import { environmentDev } from '@envs/env.devs';
import { IStaticMethods } from 'flyonui/flyonui';
import { first } from 'rxjs';
import { io, Socket } from 'socket.io-client';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  #socket: Socket;
  router = inject(Router);

  constructor() {
    this.#socket = io(environmentDev.socket, { autoConnect: false });
    inject(ApplicationRef)
      .isStable.pipe(first((isStable) => isStable))
      .subscribe(() => {
        this.#socket.connect();
        console.log({ client: this.#socket })
      });
  }

  ngOnInit() {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          if (typeof window != 'undefined') {
            window.HSStaticMethods.autoInit();
          }
        }, 100);
      }
    });
  }
}
