import { MainService } from './../../services/main.service';
import { LocationDialogeComponent } from './../dialog/location/location.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KeyValue } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-valid',
  templateUrl: 'valid.component.html',
  styleUrls: ['valid.component.scss']
})
export class ValidComponent {

  locationDialogRef: MatDialogRef<LocationDialogeComponent>;
  showDataTable: boolean = false;
  tableData: any;
  status: boolean = false;
  showError: boolean = false;

  constructor(private dialog: MatDialog,
    private mainService: MainService,
    private router: Router,
    private route: ActivatedRoute) {
    this.userStartPopUp();
    // this.route.queryParams.subscribe( params =>  {
    //   console.log(params);
    // })
    this.getProductData(this.route.snapshot.queryParamMap.get('URL'));
    this.getEmailAndNumber();
  }

  // data = {
  //   'Mfg.by': 'Dhanuka Agritech Ltd',
  //   'Registration No.': 'test',
  //   'Batch No.': 'jvhbn',
  //   'Exp Date': '8564789',
  //   'Cautionary Symbol':
  //   {
  //     name: 'Poison',
  //     imgurl: '../../../assets/icons/Poison.svg'
  //   },
  //   'Antidote Statement': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
  //   'Customer Care No.': '1800-102-1022',
  //   'Label information': '#1',
  //   'Leaflet information': '#2',
  //   'Product video': '#3',
  // }

  data = {
    'mfg_by': 'Mfg.by',
    'registration_no': 'Registration No.',
    'batch_no': 'Batch No.',
    'date_of_mfg': 'Date of Mfg.',
    'date_of_expiry': 'Exp Date',
    'product_name': 'Product name',
    'cautionary_symbol': 'Cautionary Symbol',
    'customer_care_no': 'Customer Care No.',
    'marketed_by': 'Marketed by',
    'uid': 'UID',
    'antidote_statement': 'Antidote Statement',
    'label_information': 'Label information',
    'leaflet_information': 'Leaflet information',
    'product_video': 'Product video',
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
      if (this.status && this.tableData) {
        this.showDataTable = true;
      }
      else if (this.showError) {
        this.router.navigateByUrl('Error');
      }
      else if (this.tableData = []) {
        this.router.navigateByUrl('QRCODE/invalid');
      }
    })
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  getEmailAndNumber() {
    this.mainService.getNumber().subscribe(res=> {
      console.log(res['result']);
      localStorage.setItem('email', res['result'][1].value)
      localStorage.setItem('number', res['result'][0].value)
    })
  }

  getProductData(url) {
    let obj = {
      // url: 'HTTPS://DHANUKA.COM/SAM/B7GQ9HPQH7PA?3'
      // url: encodeURIComponent(url)
      url: url
      // url: decodeURIComponent(url)
    }
    this.mainService.getProductData(obj).subscribe(res => {
      this.tableData = res['result'][0];
      this.status = res['status']
      localStorage.setItem('auth_session', res['result'].length > 0 ? res['result'][0]['auth_session'] : '');
    }, err => {
      console.log(err);
      this.showError = true;
      // this.router.navigateByUrl('Error');
    })

  }


}
