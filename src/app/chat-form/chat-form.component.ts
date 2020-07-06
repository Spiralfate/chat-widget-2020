import { Component, OnInit } from '@angular/core';
import { ChatService } from "../services/chat.service";

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  message: string;
  chatID: string;

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    console.log('storedUID: ' + this.chat.storedUID);
  }
  send(){
    // let data =  {
    //   message: this.message,
    //   userID: this.chat.storedUID,
    //
    // }
    // this.chat.activeChat = this.chat.storedUID + '_admin';
    this.chat.sendMessage(this.message);
    this.message = '';
  }
  handleSubmit(event){
    if(event.keyCode === 13) {
      this.send();
    }
  }
  // getMessages(){
  //   this.chatID = this.chat.storedUID + '_admin';
  //   this.chat.getChat(this.chatID);
  // }

}
