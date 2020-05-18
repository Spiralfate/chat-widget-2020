import { ChatService } from '../services/chat.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { AngularFireList } from '@angular/fire/database/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges {

  feed: Observable<string[]>;
  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    // при инициализации приложения:
    // забираю значения и Firebase и записываю их в ленту сообщений
    // которую в дальнейшем буду перебирать и выводить
    this.feed = this.chat.getMessages().valueChanges();
    console.log('feed ngOnInit')
  }

  ngOnChanges(): void {
    // делаю ту же операцию чтобы обновить ленту при изменениии
    this.feed = this.chat.getMessages().valueChanges();
  }
}
