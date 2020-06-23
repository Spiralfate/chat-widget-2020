import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';
import {SocketService} from "./socket.service";

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
  socket: any;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
    this.socket = io.connect('http://localhost:3000', {query: 'username=Admin'})
  }

  listen(event: string) {
    return new Observable(subscriber => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
        console.log('Listening...')
      })
      this.socket.on('add_msg', data => {
        console.log('Message added')
      })
      this.socket.on('getUsers', data => {
        console.log(data);
        return
      })
    })
  }

  getUser(): Observable<User[]> {
    return new Observable((observer) => {
      this.socket.on('getUsers', (data) => {
        observer.next(data);
      })
    });
  }

  getMessages(): Observable<ChatMessage[]> {
    return this.db.list('/messages', ref => ref.orderByKey().limitToLast(20)).valueChanges();
  }

  getUsers(): Observable<User[]> {
  // return this.socket.on('getUsers', data=>{
  //   console.log(data);
  //   return data;
  // });
  return this.db.list('/users', ref => ref.orderByKey()).valueChanges();
  }

  sendMessage(msg: string) {
    if (msg) {
      const timestamp = this.getTimeStamp();
      this.db.list('messages').push({
        message: msg,
        timeSent: timestamp,
        userName: 'Admin',
        email: 'admin@mail.ru',
        isAdmin: true,
        image: 25,
      });
      this.socket.emit('new_message', {
        message: msg,
      });
      console.log('sendMessage() success!');
    }
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getFullYear() + '/' +
      (now.getMonth() + 1) + '/' +
      now.getDate();
    const time = now.getHours() + ':' +
      now.getMinutes() + ':' +
      now.getSeconds();
    return (date + ' ' + time);
  }

}
