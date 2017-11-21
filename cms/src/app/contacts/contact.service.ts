import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { Document } from '../documents/document.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ContactService {

  contacts: Contact[] = [];
  contactChangedEvent = new EventEmitter<Contact[]>();
  selectedContactEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

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

   addContact(newContact: Contact){
     if (newContact === undefined || newContact === null) {
       return;
     }
   }

   updateContact(
     originalContact: Contact,
     newContact: Contact) {
     if (originalContact === undefined ||
         originalContact === null ||
         newContact === undefined ||
         newContact === null) {
           return;
         }
   }

   // deleteContact(contact: Contact) {
   //   if (contact === undefined || contact === null){
   //     return;
   //   }
   //
   //   const pos = this.contacts.indexOf(contact);
   //   if (pos < 0) {
   //     return;
   //   }
   // }
  }
