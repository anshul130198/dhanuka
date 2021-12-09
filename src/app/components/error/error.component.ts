import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnDestroy {

  number: any;
  mail: any;
  whatsapp: any;

  constructor() {
    this.number = localStorage.getItem('web_auth_customer_contact');
    this.whatsapp = localStorage.getItem('web_auth_whats_app_no');
    this.mail = localStorage.getItem('web_auth_email');
  }

  ngOnDestroy() {
    localStorage.clear();
  }


}
