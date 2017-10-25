import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { Messages } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: string = 'Antonio';
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgRef: ElementRef;
  // @Output() addMessage = new EventEmitter<Message>();

  constructor(private messageService: Messages) { }

  ngOnInit() {
  }

  onSendMessage(){
    const ingSubject = this.subjectRef.nativeElement.value;
    const ingMsgText = this.msgRef.nativeElement.value;
    const newMsg = new Message('1', ingSubject, ingMsgText, this.currentSender);
      this.messageService.addMessage(newMsg);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgRef.nativeElement.value = '';
  }
}
