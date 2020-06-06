import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { ChatService } from "../services/chat.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList: Observable<User[]>

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    this.userList = this.chat.getUsers();
  }

  ngOnChanges(): void {
    this.userList = this.chat.getUsers();
  }

}
