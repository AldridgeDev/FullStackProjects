import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  term: string = "";
  contacts: Contact[] = [];
  private subscription: Subscription;

  constructor(private contactService: ContactService) {}


  ngOnInit(){
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactList: Contact[]) => {
        this.contacts = contactList
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string){
    this.term = value;
  }

  }
