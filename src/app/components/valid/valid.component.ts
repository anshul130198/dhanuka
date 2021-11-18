import { MainService } from './../../services/main.service';
import { LocationDialogeComponent } from './../dialog/location/location.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KeyValue } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-valid',
  templateUrl: 'valid.component.html',
  styleUrls: ['valid.component.scss']
})
export class ValidComponent {

  locationDialogRef: MatDialogRef<LocationDialogeComponent>;
  showDataTable: boolean = false;

  constructor(private dialog: MatDialog,
    private mainService: MainService,
    private router: Router) {
    this.userStartPopUp();
    console.log(this.router.url)
    this.getProductData(this.router.url);
  }

  data = {
    'Mfg.by': 'Dhanuka Agritech Ltd',
    'Registration No.': 'test',
    'Batch No.': 'jvhbn',
    'Exp Date': '8564789',
    'Cautionary Symbol':
    {
      name: 'Poison',
      imgurl: '../../../assets/icons/Poison.svg'
    },
    'Antidote Statement': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    'Customer Care No.': '1800-102-1022',
    'Label information': '#1',
    'Leaflet information': '#2',
    'Product video': '#3',
  }

  userStartPopUp() {
    this.locationDialogRef = this.dialog.open(LocationDialogeComponent, {
      disableClose: true,
      panelClass: 'custom-dialog-container',
      height: 'auto',
      width: 'auto',
      data: {}
    });

    this.locationDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.showDataTable = true;
    })
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  getProductData(url) {
    this.mainService.getProductData(url).subscribe(res => {
      console.log(res);
    })

  }


}
