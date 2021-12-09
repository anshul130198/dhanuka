import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-invalid',
  templateUrl: 'invalid.component.html',
  styleUrls: ['invalid.component.scss']
})
export class InvalidComponent implements OnDestroy {

  number: any;
  whatsapp: any;
  mail: any;

  constructor() {
    this.number = localStorage.getItem('web_auth_customer_contact');
    this.whatsapp = localStorage.getItem('web_auth_whats_app_no');
    this.mail = localStorage.getItem('web_auth_email');
  }

  ngOnDestroy() {
    localStorage.clear();
  }

}
