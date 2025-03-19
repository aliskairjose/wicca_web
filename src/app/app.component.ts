import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BadgeComponent ,ButtonComponent} from '@shared/components';
import { Router, Event, NavigationEnd } from '@angular/router';

import { IStaticMethods } from 'flyonui/flyonui';
import { SwitchComponent } from "./shared/components/switch/switch.component";
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

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
         if(typeof window != 'undefined'){
           window.HSStaticMethods.autoInit();
         }
        }, 100);
      }
    });
  }
}
