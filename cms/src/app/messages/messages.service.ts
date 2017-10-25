import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable()
export class Messages {
  messages: Message[] = [];
  messageEvent = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
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

}
