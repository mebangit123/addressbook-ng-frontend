import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
  isInvalid: boolean = false;
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
              private dataService: DataService,
              private snackBar: MatSnackBar,
              private route: Router) {
    this.personForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Z]{1}[a-zA-Z\\s]{2,}$')])],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.compose([Validators.required, Validators.pattern('^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$')])],
      phoneNo: ['', Validators.compose([Validators.required, Validators.pattern('^[1-9]{1}[0-9]{9}$')])]
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
  * Purpose: To display Error message using Snackbar.
  * @param message Error message
  */
  openSnackBar(message: string) {
    this.snackBar.open(message, '',{
      duration:3000,
      verticalPosition: 'top',
      panelClass: ['red-snackbar']
    })
  }

  /**
   * Purpose: Check validation for input fields.
   * @returns 
   */
  checkValidation() {
    if(this.personForm.get('city').hasError('required')) {
      this.isInvalid = true;
      this.openSnackBar("Select city!")
      return;
    } else if(this.personForm.get('state').hasError('required')) {
      this.isInvalid = true;
      this.openSnackBar("Select state")
      return;
    }
  }
  /**
   * Purpose: To add AddressBook data to the database.
   */
  addPerson() {
    this.addressBookContact = this.personForm.value;
    if(!this.isInvalid) {
      if(this.isUpdate) {
        this.httpService.updateAddressbookContact(this.id, this.addressBookContact).subscribe(response => {
          this.snackBar.open(response.message,'',{
            duration:3000,
            verticalPosition: 'top',
            panelClass: ['green-snackbar']
          })
      })
      } else {
        this.httpService.addAddressBookContact(this.addressBookContact).subscribe(response => {
          this.snackBar.open(response.message,'',{
            duration:3000,
            verticalPosition: 'top',
            panelClass: ['green-snackbar']
        })
        })
      }
      this.route.navigateByUrl('/home');
    } else { return;}
  }
}
