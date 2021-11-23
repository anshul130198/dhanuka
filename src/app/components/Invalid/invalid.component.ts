import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-invalid',
  templateUrl: 'invalid.component.html',
  styleUrls: ['invalid.component.scss']
})
export class InvalidComponent implements OnDestroy {

  number: any;
  mail: any;

  constructor() {
    this.number = localStorage.getItem('number');
    this.mail = localStorage.getItem('email');
  }

  ngOnDestroy() {
    localStorage.clear();
  }

}
