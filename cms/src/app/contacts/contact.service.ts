import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService {

  contacts: Contact[] = [];
  contactChangedEvent = new EventEmitter<Contact[]>();
  selectedContactEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  // getContact(id: string): Contact {
  //   for (let contact of this.contacts) {
  //     if (contact.id === id) {
  //       return contact;
  //     }
  //    }
  //    return null;
  //   }

  getContact(index: string) {
    return this.contacts[index];
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }


    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
   }
  }
