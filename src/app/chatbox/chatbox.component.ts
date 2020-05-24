import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  chatbox: Observable<ChatMessage[]>;

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    this.chatbox = this.chat.getMessages();
  }
  ngOnChanges(): void {
    this.chatbox = this.chat.getMessages();
  }

}
