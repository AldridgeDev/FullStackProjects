import { Component, OnInit } from '@angular/core';
import { Messages } from './messages.service';
import { Message } from './message.model';

@Component({
  selector: 'cms-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [Messages]
})
export class MessagesComponent implements OnInit {
  messages: Message[];

  constructor(private messageService: Messages) { }

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.messageService.messageEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );
  }

}
