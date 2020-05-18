import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { FeedComponent } from './feed/feed.component';
import { MessageComponent } from './message/message.component';

import { ChatService } from './services/chat.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ChatFormComponent } from './chat-form/chat-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    ChatFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
