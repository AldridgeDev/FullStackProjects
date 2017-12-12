import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class Messages {
  messages: Message[] = [];
  messageEvent = new EventEmitter<Message[]>();
  maxMessageId: number;
  selectedMessageEvent = new EventEmitter<Message>();
  messageChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  maxDocumentId: number;

  constructor(private http: Http) {
    this.initMessages();
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (let messages of this.messages){
      if (messages.id === id){
        return messages;
      }
    }
    return null;
  }

  addMessage(message: Message){
    this.messages.push(message);
    this.messageEvent.emit(this.messages.slice());
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
          this.messageListChangedEvent.next(messagesListClone);
        }
      )
  }

}
