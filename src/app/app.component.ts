import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  InputComponent, SelectComponent } from '@shared/components';
import { Router, Event, NavigationEnd } from '@angular/router';

import { IStaticMethods } from 'flyonui/flyonui';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SelectComponent, InputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Wicca';
  router = inject(Router);

  data = [
    {val:'1', title:'The Godfather'},
    {val:'2', title:'The Shawshank Redemption'},
  ]

  image = "https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png";
  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });
  }
}
