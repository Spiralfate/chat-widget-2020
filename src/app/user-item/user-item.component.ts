import {Component, Input, OnInit} from '@angular/core';
import { User } from "../models/user.model";

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

  constructor() { }

  ngOnInit(User = this.user): void {
    this.email = User.email;
    this.userName = User.userName;
    this.status = User.status;
    this.image = User.image;
  }

}
