import {Component, OnInit, OnChanges} from '@angular/core';
import {Observable, BehaviorSubject} from "rxjs";
import {User} from "../models/user.model";
import {ChatService} from "../services/chat.service";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList: Observable<User[]>
  userL: Observable<User[]>
  userID: string

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    // this.userList = this.chat.getUsers();
    this.userL = this.chat.getUser();
    // this.userL = new Observable((observer) => {
    //   this.socket.on('getUsers', (data) => {
    //     observer.next(Object.values(data));
    //     console.log(Object.values(data));
    //   })
    // });
    // console.log(this.userList);
    // console.log(this.userL);
  }

  ngOnChanges(): void {
    // this.userList = this.chat.getUsers();
    this.userL = this.chat.getUser();
  }

}
