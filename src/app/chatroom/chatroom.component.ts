import { Component, OnInit } from '@angular/core';
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  currentUser: string = 'Admin';
  socketID: string;

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    this.chat.currentUser = this.currentUser;
    this.chat.isAdmin = true;
    this.chat.image = '99';
    // this.chat.saveAdminSocket(this.chat.socketID);
  }


}
