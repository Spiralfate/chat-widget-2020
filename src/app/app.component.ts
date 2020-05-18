import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'secondStart';g 
  items: Observable<any[]>
  messageInput: string;

  data;
  constructor(firestore: AngularFirestore, db: AngularFireDatabase ) {
    
  }
}
