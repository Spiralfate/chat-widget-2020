import { ChatService } from '../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {

  message: string;

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
  }

  send() {
    // передаю значение input'a 
    this.chat.sendMessage(this.message);
    
    // очищяю input
    this.message = '';
  }
}
