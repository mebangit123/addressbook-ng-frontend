import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  getAddressBookData(): Observable<any> {
    return this.httpClient.get(this.baseUrl+ "/get");
  }
  addAddressBook(person): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/create", person);
  }
  deleteContact(id: number) {
    return this.httpClient.delete(this.baseUrl+"/delete/"+id);
  }
}
