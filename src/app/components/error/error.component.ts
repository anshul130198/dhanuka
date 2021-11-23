import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnDestroy {

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
