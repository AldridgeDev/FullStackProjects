import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string = "";
  contact: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contact = this.contactService.getContact(this.message.sender);
    this.messageSender = this.contact.name;
  }

}
