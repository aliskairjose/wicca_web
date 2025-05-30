import { Component, computed, input } from '@angular/core';
import { SIZE } from './avatar.type';
import { CommonModule } from '@angular/common';
import { ConnectStatusType } from '@shared/types';

const ConnStatus = {
  Online: 'online-top', // Verde
  Offline: 'busy-top', // Rojo cambia de offline a busy por el color
  Busy: 'away-top', // Amarillo busy por away por el color
  Away: 'offline-top', // blanco cambia de away a offline por el color
};
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
  status = input<ConnectStatusType>();
  size = input<SIZE>('md');
  src = input.required<string>();

  statusConn = computed(() => `${ConnStatus[this.status()!]}`)
}
