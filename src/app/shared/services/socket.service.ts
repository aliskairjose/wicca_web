import { inject, Injectable, Signal } from '@angular/core';
import { environmentDev } from '@envs/env.devs';
import { Store } from '@ngxs/store';
import { io, Socket } from 'socket.io-client';
import { AuthSelectors } from 'src/app/pages/auth/store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  #socket: Socket;
  #token = inject(Store).selectSignal(AuthSelectors.token);

  constructor() {
    this.#socket = io(environmentDev.socket, {
      autoConnect: false,
      auth: { token: this.#token() },
    });
  }


  connect(): void {
    try {
      if (this.#token()) {
        this.#socket.connect();
      }
    } catch (error) {
      console.error('Error connecting to socket:', error);
    }
  }

  disconnect(): void {
    console.log('Disconnecting socket:', this.#socket!.id);
    this.#socket!.disconnect();
  }

  on(event: string, callback: (data: any) => void): void {
    console.log('Listening to event:', event);
    this.#socket.on(event, callback);
  }

  emit(event: string, data: any): void {
    this.#socket!.emit(event, data);
  }
}
