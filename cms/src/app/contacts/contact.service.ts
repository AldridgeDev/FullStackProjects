import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { Document } from '../documents/document.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ContactService {
  maxContactId: number;
  maxId: number;
  currentId: number;
  contacts: Contact[] = [];
  contactChangedEvent = new EventEmitter<Contact[]>();
  selectedContactEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: Http) {
    this.initContacts();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string) {
    for (let contact of this.contacts) {
      if (id === contact.id){
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (contact === null || contact === undefined) {
      return;
    }


    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    const contactsListClone: Contact[] = this.contacts.slice();
    this.storeContacts();
   }

   addContact(newContact: Contact){
     if (newContact === undefined || newContact === null) {
       return;
     }

     this.maxContactId++;
     newContact.id = this.maxContactId.toString();
     this.contacts.push(newContact);
     const contactsListClone = this.contacts.slice();
     this.contactListChangedEvent.next(contactsListClone);
   }

   updateContact(
     originalContact: Contact,
     newContact: Contact) {
     if (originalContact === null ||
         newContact === null) {
           return;
         }

       const pos = this.contacts.indexOf(originalContact);
       if (pos < 0) {
         return;
       }
       newContact.id = originalContact.id;
       this.contacts[pos] = newContact;
       const contactsListClone = this.contacts.slice();
       this.contactListChangedEvent.next(contactsListClone);
   }

     getMaxId(){
       let maxId: number = 0;
       for (let contact of this.contacts) {
         this.currentId = +contact.id;
         if (this.currentId > this.maxId) {
           this.maxId = this.currentId;
         }
       }
       return this.maxId;
     }

     initContacts(){
       this.http.get('https://fullstackproject-366.firebaseio.com/contacts.json')
        .map(
          (response:Response) => {
            const contactsReturned: Contact[] = response.json();
            return contactsReturned;
          }
        )
        .subscribe(
          (contactsReturned: Contact[]) => {
            this.contacts = contactsReturned;
            this.maxContactId = this.getMaxId();
            this.contactListChangedEvent.next(this.contacts.slice());
          }
        );
     }

     storeContacts(){
       const jsonContacts = JSON.stringify(this.contacts);
       this.http.put('https://fullstackproject-366.firebaseio.com/contacts.json', jsonContacts)
        .subscribe(
          () => {
            this.contactListChangedEvent.next(this.contacts.slice());
          }
        );
     }

  }
