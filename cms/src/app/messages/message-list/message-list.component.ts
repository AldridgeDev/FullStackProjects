import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1','Subject Test', 'Text Message Test', 'Antonio'),
    new Message('2','Subject Test Worked', 'Text Message Test', 'Other Person'),
    new Message('3','Subject Test', 'Text Message Test', 'Antonio')
  ];

  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
