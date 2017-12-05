import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], [term]): any {
    let filteredArray: Contact[] = [];
    let othervariable: string = term;

    filteredArray = contacts.filter(
      (contact: any) => contact.name.toLowerCase().includes(othervariable.toLowerCase())
    );
      if (filteredArray.length < 1) {
        return contacts;
      }

    return filteredArray;
  }

}
