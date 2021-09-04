import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddressBook } from 'src/app/model/address-book';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
 
  personForm: FormGroup = new FormGroup({});
  addressBook: AddressBook = new AddressBook();

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

  constructor(private formBuilder: FormBuilder, private httpService: HttpService ) {
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
    
  }
  addPerson() {
    this.addressBook = this.personForm.value;
    this.httpService.addAddressBook(this.addressBook).subscribe(response => {
      console.log(response)
    })
  }
}
