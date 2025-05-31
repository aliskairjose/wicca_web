import { CommonModule, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MessageInterface } from 'src/app/pages/dashboard/chat/interfaces/message.interface';

@Component({
  selector: 'app-chat-burble',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './chat-burble.component.html',
  styleUrl: './chat-burble.component.scss'
})
export class ChatBurbleComponent {

  message = input.required<MessageInterface>();

  role: any = {
    Asesor: 'Asesor',
    User: 'Cliente'
  }
}
