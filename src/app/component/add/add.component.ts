import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddressBook } from 'src/app/model/address-book';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
 
  id: number;
  isUpdate: boolean = false;
  personForm: FormGroup = new FormGroup({});
  addressBookContact: AddressBook = new AddressBook();

  states: string[] = [
      'Andaman and Nicobar Islands','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar',
      'Chandigarh','Chhattisgarh','Dadra and Nagar Haveli','Daman and Diu','Delhi','Goa',
      'Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka',
      'Kerala','Ladakh','Lakshadweep','Madhya Pradesh','Maharashtra','Manipur','Meghalaya',
      'Mizoram','Nagaland','Odisha','Puducherry','Punjab','Rajasthan','Sikkim','Tamil Nadu',
      'Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'
  ];
  cities: string[] = [
    'Shillong','Gauhati','Imphal','Aizawl','Itanagar',
    'Kohima','Lucknow','Delhi','Mumbai','Pune','Chennai',
    'Jaipur','Kolkata','Hyderabad','Kochi'
];

  constructor(private formBuilder: FormBuilder, 
              private httpService: HttpService,
              private activatedRoute: ActivatedRoute,
              private dataService: DataService  ) {
    this.personForm = this.formBuilder.group({
      firstName: [''],
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
      phoneNo: ['']
    }) 
   }
   
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    console.log(this.id);
    if(this.id != undefined) {
      this.isUpdate = true;
      this.dataService.currentContact.subscribe(contact => {
        if(Object.keys(contact).length !== 0) {
          this.personForm.patchValue({
            firstName: contact.firstName,
            address: contact.address,
            city: contact.city,
            state: contact.state,
            zip: contact.zip,
            phoneNo: contact.phoneNo
          })
        }
      })
    }
  }
  /**
   * Purpose: To add AddressBook data to the database.
   */
  addPerson() {
    this.addressBookContact = this.personForm.value;
    if(this.isUpdate) {
      console.log(this.addressBookContact);
      
      this.httpService.updateAddressbookContact(this.id, this.addressBookContact).subscribe(response => {
        console.log(response);
      })
    } else {
      this.httpService.addAddressBookContact(this.addressBookContact).subscribe(response => {
        console.log(response);
      })
    }
  }
}
