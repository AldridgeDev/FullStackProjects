import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  // @Input() contact: Contact;
  // contacts: Contact[] = [
  //   new Contact(
  //     '1',
  //     'Bro. Jackson',
  //     'jacksonk@byui.edu',
  //     '208-496-3771',
  //     'https://web.byui.edu/Directory/Employee/jacksonk.jpg',
  //     null),
  //
  //   new Contact(
  //     '2',
  //     'Bro. Barzee',
  //     'barzeer@byui.edu',
  //     '208-496-3768',
  //     'https://web.byui.edu/Directory/Employee/barzeer.jpg',
  //     null)
  //   ];
  contact: Contact;
  id: string;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.contact = this.contactService.getContact(this.id);
        }
      );
  }

  onDelete(id: string) {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['contact']);
  }

}
