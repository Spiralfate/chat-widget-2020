import {Component, Input, OnInit} from '@angular/core';
import { User } from "../models/user.model";
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  email: string;
  userName: string;
  status: string;
  image: number;
  userID: string;
  adminID: string = 'admin';
  chatID: string;

  constructor(private chat: ChatService) { }

  ngOnInit(User = this.user): void {
    this.email = User.email;
    this.userName = User.userName;
    this.status = User.status;
    this.image = User.image;
    this.userID = User.userID;
    this.adminID;
    this.chatID = this.userID + '_' + this.adminID;
  }
  getChat() {
    this.chat.getChat(this.chatID);
    this.chat.currentUser = this.userID;  // передаем в сервис id текущего пользователя
    this.chat.activeChat = this.chatID;  // передаем в сервис id текущего открытого чата
  }

}
