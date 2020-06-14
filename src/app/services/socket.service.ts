import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subscriber } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;

  constructor() {
    // this.socket = io.connect('http://localhost:3000', { query: 'username=Admin' })
  }

  // listen(event: string) {
  //   return new Observable(subscriber => {
  //     this.socket.on(event, (data) => {
  //       subscriber.next(data);
  //       console.log('Listening...')
  //     })
  //   })
  // }
}
