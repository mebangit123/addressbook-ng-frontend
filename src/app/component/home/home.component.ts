import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressBook } from 'src/app/model/address-book';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  addressBookContactList: AddressBook[] = [];

  constructor(private httpService: HttpService,private route: Router, private dataService: DataService) {}
 
  ngOnInit(): void {
    this.httpService.getAllAddressBookContact().subscribe(response => {
      console.log(response);
      this.addressBookContactList = response.data;
    })
  }
  /**
   * Purpose: To delete AddressBook Contact from the database.
   * @param id AddressBook Contact to be deleted.
   */
  remove(id: number) {
    this.httpService.deleteAddressBookContact(id).subscribe(response=> {
        console.log(response)
        this.ngOnInit(); 
    })     
  }
  /**
   * Purpose: To update AddressBook Contact from the database.
   * @param id AddressBook Contact to be updated.
   * @param contact 
   */
  update(id, contact) {
    this.dataService.changeContact(contact);
    this.route.navigateByUrl('update/'+id);
  }
}
