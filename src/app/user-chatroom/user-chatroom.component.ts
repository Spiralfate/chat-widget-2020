import { Component, OnInit } from '@angular/core';
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-user-chatroom',
  templateUrl: './user-chatroom.component.html',
  styleUrls: ['./user-chatroom.component.scss']
})
export class UserChatroomComponent implements OnInit {
  chatID: string;

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    // this.chat.activeChat = this.chat.storedUID + '_admin';
    this.chatID = this.chat.storedUID + '_admin';
    this.chat.activeChat = this.chatID;
    this.chat.getChat(this.chatID);
  }

}
