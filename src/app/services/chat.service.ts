import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatMessages: AngularFireList<string>;
  constructor(private db: AngularFireDatabase) {}

  sendMessage(msg: string): void {
    // организовываю передачу введенных значений в firebase
    this.chatMessages = this.getMessages();
    this.chatMessages.push(msg);
  }

  getMessages(): AngularFireList<string> {
    // возвращаю массив значений из firebase
    return this.db.list('messages');
  }
}
