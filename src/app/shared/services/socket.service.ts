import { Injectable } from '@angular/core';
import { environmentDev } from '@envs/env.devs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  #socket: Socket;

  constructor() {
    this.#socket = io( environmentDev.socket );
  }
}
