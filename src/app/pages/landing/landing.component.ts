import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '@shared/components';
import { FooterComponent } from "@shared/components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',

})
export class LandingComponent {


}

