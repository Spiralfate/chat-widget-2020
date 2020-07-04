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
  currentUser: any;


  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
    this.socket = io.connect('http://localhost:3000', {
      query: {
        userName: 'Admin',
      }
    })
  }

  // listen(event: string) {
  //   return new Observable(subscriber => {
  //     this.socket.on(event, (data) => {
  //       subscriber.next(data);
  //       console.log('Listening...');
  //     })
  //     this.socket.on('add_msg', data => {
  //       console.log('Message added');
  //       console.log(data);
  //     })
  //     this.socket.on('getUsers', data => {
  //     })
  //     this.socket.on('userNameChanged', data => {
  //       console.log(data);
  //     })
  //   })
  // }
  getChat(chatID: string) {
    this.socket.emit('get_user_chat', {chatID});
    console.log('requested chatID: ' + chatID);
  }

  getMessagesForChatID(): Observable<ChatMessage[]> {
    return new Observable((observer) => {
      this.socket.on('getMessagesForChatID', (data) => {
        console.log(data);
        // observer.next(Object.values(data));
        // data ? this.content = true : this.content = false;
        data ? observer.next(Object.values(data)) : observer.next(Object.values([]));
      })
    });
  }


  getUser(): Observable<User[]> {
    return new Observable((observer) => {
      this.socket.on('getUsers', (data) => {
        observer.next(Object.values(data));
      })
    });
  }

  // Archive
  // getUsers(): Observable<User[]> {
  //   return this.db.list('/users', ref => ref.orderByKey()).valueChanges();
  // }
  //
  // getMessages(): Observable<ChatMessage[]> {
  //   return this.db.list('/messages', ref => ref.orderByKey().limitToLast(20)).valueChanges();
  // }

  getMessages(): Observable<ChatMessage[]> {
    return new Observable((observer) => {
      this.socket.on('getMessages', (data) => {
        observer.next(Object.values(data));
      })
    });
  }

  sendMessage(msg: string) {
    if (msg) {
      const timestamp = this.getTimeStamp();
      console.log('CurrentUser: ' + this.currentUser);
      // firebase request
      // this.db.list('messages').push({
      //   message: msg,
      //   timeSent: timestamp,
      //   userID: 'n3xVdktPfu1iTSu2xQDYhmXzptxMIig3',
      //   isAdmin: true,
      //   image: 99,
      // });
      this.socket.emit('new_message', {
        message: msg,
        timeSent: timestamp,
        userID: 'admin',
        chatID: this.currentUser + '_admin',
        isAdmin: true,
        image: '99',
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
