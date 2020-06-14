import { Component, OnInit } from '@angular/core';
import { ChatService } from "./services/chat.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'chat';
  constructor(private srv: ChatService) { }

  ngOnInit(): void {
    this.srv.listen('add_msg').subscribe((res: any) => {
      console.log(res)
    })
  }
}
