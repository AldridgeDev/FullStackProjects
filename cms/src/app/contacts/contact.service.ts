import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService {

  contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    var i = 0;
    for (let i; i < this.contacts.length ; i++) {
      if (this.contacts[i].id === id) {
        return this.contacts[i];
      }
     }
     return null;
    }

  }
