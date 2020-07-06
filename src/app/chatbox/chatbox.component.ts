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
    this.chatbox = this.chat.getMessagesForChatID();
    // this.chatbox = this.chat.getMessagesForUser();
    // this.chatbox ? console.log('true') : console.log('false');
  }
  ngOnChanges(): void {
    this.chatbox = this.chat.getMessagesForChatID();
  }

}
