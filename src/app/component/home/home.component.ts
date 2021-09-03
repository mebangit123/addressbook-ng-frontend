import { Component, OnInit } from '@angular/core';
import { AddressBook } from 'src/app/model/address-book';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  addressBookList: AddressBook[] = [];

  constructor(private httpService: HttpService) {}
 
  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(response => {
      console.log(response);
      this.addressBookList = response.data;
    })
  }

}