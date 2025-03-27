import { Component, input } from '@angular/core';
import { SIZE } from './avatar.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  avatar = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  isRounded = input<boolean>(true);
  size = input<SIZE>('md');
  src = input.required<string>();

}
