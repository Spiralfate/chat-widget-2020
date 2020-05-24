import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import {ChatMessage} from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatMessages: Observable<ChatMessage[]>;
  chatMessage: ChatMessage;
  user: firebase.User;
  userName: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) { }

  getMessages(): Observable<ChatMessage[]> {
    return this.db.list('/messages', ref => ref.orderByKey().limitToLast(20)).valueChanges();
  }
}
