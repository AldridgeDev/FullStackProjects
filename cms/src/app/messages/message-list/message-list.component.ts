import { Component, OnInit, Injectable } from '@angular/core';
import { Message } from '../message.model';
import { Messages } from '../messages.service';

@Injectable()
@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: Messages) { }

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.messageService.messageEvent
      .subscribe((messages: Message[]) => {
          this.messages = messages;
      }
    );
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
