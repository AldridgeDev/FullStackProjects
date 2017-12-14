import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class Messages {
  messages: Message[] = [];
  maxMessageId: number;
  messageChangedEvent = new Subject<Message[]>();

  constructor(private http: Http) {
    this.initMessages();
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (let message of this.messages){
      if (message.id === id){
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message){
    if (message == null || message == undefined) {
      return;
    }

    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId() {
    let maxId: number = 0;
    for (let message of this.messages) {
      let currentId = +message.id;
      if(currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  initMessages() {
    this.http.get('https://fullstackproject-366.firebaseio.com/messages.json')
      .map(
        (response:Response) => {
          const messagesReturned: Message[] = response.json();
          return messagesReturned;
        }
      )
      .subscribe(
        (messagesReturned: Message[]) => {
          this.messages = messagesReturned;
          this.maxMessageId = this.getMaxId();
          const messagesListClone = this.messages.slice();
          this.messageChangedEvent.next(messagesListClone);
        }
      );
  }

  storeMessages() {
    const msgheaders = new Headers({'Content-Type':'application/json'});
    return this.http.put('https://fullstackproject-36.firebaseio.com/messages.json',
      this.getMessages(),
        {headers: msgheaders}
  ) .subscribe(
    () => {
      this.messageChangedEvent.next(this.messages.slice());
    }
  )

  }

}
