import { Injectable } from '@angular/core';
import { Address } from 'cluster';
import { BehaviorSubject } from 'rxjs';
import { AddressBook } from '../model/address-book';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private contactSource = new BehaviorSubject(new AddressBook());
  currentContact = this.contactSource.asObservable();
  constructor() { }

  changeContact(contact: AddressBook) {
    this.contactSource.next(contact);
  }
}
