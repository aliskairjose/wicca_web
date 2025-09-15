import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AvatarComponent, NavbarComponent } from '@shared/components';
import { FooterComponent } from "@shared/components/footer/footer.component";
import { TopRatedInterface } from '../dashboard/home/interfaces/top-rated.interface';
import { HomeAction } from '../dashboard/home/store/home.actions';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { HomeSelectors } from '../dashboard/home/store/home.selectors';
import { UserInterface } from '../dashboard/users/user.interface';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',

})
export class LandingComponent  {

  #router = inject(Router);



  
}
