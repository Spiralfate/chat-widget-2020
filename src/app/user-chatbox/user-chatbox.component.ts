import { Component, OnInit, OnChanges } from '@angular/core';
import {ChatService} from "../services/chat.service";
import {Observable} from "rxjs";
import {ChatMessage} from "../models/chat-message.model";

@Component({
  selector: 'app-user-chatbox',
  templateUrl: './user-chatbox.component.html',
  styleUrls: ['./user-chatbox.component.scss']
})
export class UserChatboxComponent implements OnInit {
  userChatbox: Observable<ChatMessage[]>;
  chatID: string;

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    this.chatID = this.chat.storedUID + '_admin';
    this.chat.activeChat = this.chatID;
    this.chat.getChat(this.chatID);

    // this.chat.isAdmin = false;
    this.userChatbox = this.chat.getMessagesForChatID();

  }
  ngOnChanges(): void {
    this.userChatbox = this.chat.getMessagesForUser();
  }

}
