import { isPlatformBrowser } from '@angular/common';
import { ApplicationRef, Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, Event, NavigationEnd } from '@angular/router';
import { SocketService } from '@shared/services';
import { IStaticMethods } from 'flyonui/flyonui';
import { first } from 'rxjs';
import { Notyf } from 'notyf';

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
  router = inject(Router);
  socketService = inject(SocketService);
  private notyf: Notyf | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.notyf = new Notyf();
    }
    inject(ApplicationRef)
      .isStable.pipe(first((isStable) => isStable))
      .subscribe(() => console.log('App is stable'));
    // .subscribe(() => this.socketService.connect());
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
