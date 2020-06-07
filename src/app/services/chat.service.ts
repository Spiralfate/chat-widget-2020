import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import {ChatMessage} from '../models/chat-message.model';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatMessages: Observable<ChatMessage[]>;
  chatMessage: ChatMessage;
  // user: firebase.User;
  userName: Observable<string>;
  userList: Observable<User[]>;
  user: User;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) { }

  getMessages(): Observable<ChatMessage[]> {
    return this.db.list('/messages', ref => ref.orderByKey().limitToLast(20)).valueChanges();
  }

  getUsers(): Observable<User[]> {
    return this.db.list('/users', ref => ref.orderByKey()).valueChanges();
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    this.db.list('messages').push({
      message: msg,
      timeSent: timestamp,
      userName: 'Admin',
      email: 'admin@mail.ru',
      isAdmin: true,
      image: 25,
    });
    console.log('Successfully called sendMessage()!');
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();
    const time = now.getUTCHours() + ':' +
      now.getUTCMinutes() + ':' +
      now.getUTCSeconds();
    return (date + ' ' + time);
  }

}
