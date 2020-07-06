import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';

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
  currentUser: string;
  storedUID: string;
  socketID: string;
  activeChat: string;
  isAdmin: boolean;
  image: string;


  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
    this.storedUID = localStorage.getItem('userID');
    console.log('userID on construct: ' + this.storedUID);
    this.socketID = localStorage.getItem(('socketID'));
    console.log('Extracted socket_id: ' + this.socketID);

    this.socket = io.connect('http://localhost:3000', {
      query: {
        userID: this.storedUID,
      }
    })
    this.socket.on('storeUserID', data => {
      console.log('userID for storage: ' + data);
      localStorage.setItem('userID', data);
      // this.activeChat = data + '_admin';
      // this.storedUID = data;
    })
    this.socket.on('storeSocketID', data => {
      console.log('storeSocketID for storage: ' + data);
      localStorage.setItem('socketID', `${data}`);
    })


    this.getUserByID(this.storedUID);
    this.socket.on('getUserByID', data => {
      this.image = data.image;
      this.isAdmin = data.isAdmin;
    })
  }

  // saveAdminSocket(socketID: string) {
  //   console.log('socket from comp: ' + socketID);
  //   this.socket.emit('save_admin_socket', {socketID})
  // }

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

  getUserByID(userID: string) {
    this.socket.emit('get_user_data', {userID});
  }

  getMessagesForChatID(): Observable<ChatMessage[]> {
    console.log('CurrentUser: ' + this.storedUID);

    return new Observable((observer) => {
      this.socket.on('getMessagesForChatID', (data) => {
        console.log(data);
        // observer.next(Object.values(data));
        // data ? this.content = true : this.content = false;
        data ? observer.next(Object.values(data)) : observer.next(Object.values([]));
      })
    });
  }

  getMessagesForUser(): Observable<ChatMessage[]> {
    return new Observable((observer) => {
      this.socket.on('getMessagesForUser', (data) => {
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
      console.log('CurrentUser: ' + this.storedUID);
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
        userID: this.storedUID,
        chatID: this.activeChat,
        isAdmin: this.isAdmin,
        image: this.image,
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
