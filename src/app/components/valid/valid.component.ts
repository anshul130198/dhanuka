import { LocationDialogeComponent } from './../dialog/location/location.component';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-valid',
  templateUrl: 'valid.component.html',
  styleUrls: ['valid.component.scss']
})
export class ValidComponent {

  locationDialogRef: MatDialogRef<LocationDialogeComponent>;

  constructor(private dialog: MatDialog) {
    this.userStartPopUp();

  }

  data = {
    'Mfg.by': 'Dhanuka Agritech Ltd',
    'Registration No.': 'test',
    'Batch No.': 'jvhbn',
    'Exp Date': '8564789'

  }

  message = 'Thank you for scanning Geniune Dhanuka Products Or QR Details';


  userStartPopUp() {
    this.locationDialogRef = this.dialog.open(LocationDialogeComponent, {
      disableClose: true,
      panelClass: 'custom-dialog-container',
      height: 'auto',
      width: 'auto',
      data: {}
    });

    this.locationDialogRef.afterClosed().subscribe(result => {
      console.log(result)
      navigator.geolocation.getCurrentPosition(function (position) {
        alert('Location accessed');
        console.log(position);
      }, function () {
        alert('User not allowed')
      }, { timeout: 10000 })
      //this.claimPointsPopUp();
      // let check = localStorage.getItem('newUser')
      // if (check && check != 'false') {
    })
  }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }


}
