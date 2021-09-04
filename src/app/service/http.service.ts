import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressBook } from '../model/address-book';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl: string = "http://localhost:8080/api";

  constructor(private httpClient: HttpClient) {  }
 /**
  * Purpose: Calling a `GET` request that interprets the body as a JSON object and
             returns the response body as a JSON object. 
  * @returns List of Addressbook object.
  */
  getAllAddressBookContact(): Observable<any> {
    return this.httpClient.get(this.baseUrl+ "/get");
  }
  /**
   * Purpose: Calling a `POST` request that interprets the body as a
              JSON object and returns the response body as a JSON object.
   * @param contact AddressBook contact as a request body.
   * @returns The AddressBook object and response message.
   */
  addAddressBookContact(contact): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/create", contact);
  }
  /**
   * Purpose:  Calling a `DELETE` request that interprets the body as a JSON object and
               returns the response body as a JSON object.
   * @param id AddressBook Contact Id to be deleted.
   * @returns A response message if deleted successfully.
   */
  deleteAddressBookContact(id: number) {
    return this.httpClient.delete(this.baseUrl+"/delete/"+id);
  }
  /**
   * 
   * @param id AddressBook Contact Id to be updated.
   * @param contact AddressBook contact as a request body.
   * @returns An Addressbook response object and response message. 
   */
  updateAddressbookContact(id: number, contact: AddressBook) {
    return this.httpClient.put(this.baseUrl+'/update/'+id, contact)
  }
}
