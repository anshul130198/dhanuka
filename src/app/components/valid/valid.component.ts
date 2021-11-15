import { LocationDialogeComponent } from './../dialog/location/location.component';
import { Component,  OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
    'Exp Date': '8564789',
    'Cautionary Symbol': 
      {
        name:'Poison',
        imgurl:'../../../assets/icons/Poison.svg'
      }
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


}
