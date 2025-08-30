import { Component } from '@angular/core';
import { NavbarComponent } from '@shared/components';
import { FooterComponent } from "@shared/components/footer/footer.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
