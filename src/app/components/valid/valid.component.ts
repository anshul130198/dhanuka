import { MainService } from './../../services/main.service';
import { LocationDialogeComponent } from './../dialog/location/location.component';
import { Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { KeyValue } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private mainService: MainService,
    private router: Router,
    private route: ActivatedRoute) {
      this.tableData = JSON.parse(localStorage.getItem('tableData'));
      this.status = localStorage.getItem('status') === 'true'? true: false;
      // localStorage.setItem('auth_session', res['result'].length > 0 ? res['result'][0]['auth_session'] : '');


    // this.route.queryParams.subscribe( params =>  {
    //   console.log(params);
    // })
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
    'product_name': 'Product name',
    'batch_no': 'Batch No.',
    'date_of_mfg': 'Date of Mfg.',
    'date_of_expiry': 'Exp Date',
    'uid': 'UID',
    'product_video': 'Product video',
    'mfg_by': 'Mfg.by',
    'marketed_by': 'Marketed by',
    'cautionary_symbol': 'Cautionary Symbol',
    'registration_no': 'Registration No.',
    'customer_care_no': 'Customer Care No.',
    'antidote_statement': 'Antidote Statement',
    'label_information': 'Label information',
    'leaflet_information': 'Leaflet information',
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }


}
