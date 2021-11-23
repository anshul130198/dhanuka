import { MainService } from './../../../services/main.service';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-location',
  templateUrl: 'location.component.html',
  styleUrls: ['location.component.scss']
})
export class LocationDialogeComponent {

  form: FormGroup;
  lat:any;
  long:any;
  coordinates;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LocationDialogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mainService: MainService) {
     this.coordinates = this.askForLocation();

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      mobile: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      location: ["", Validators.maxLength(100)],
    })
  }

  get f() {
    return this.form.controls;
  }

  // askForLocation() {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     console.log(position.coords);
  //     return position.coords;
  //   }, function () {
  //   }, { timeout: 10000 })
  // }

  askForLocation() {
    navigator.geolocation.getCurrentPosition((pos)=>this.setPosition(pos))
  }

  setPosition(pos) {
    // console.log(pos);
    this.coordinates = pos.coords;
  }

  onClose() {
    this.dialogRef.close();
  }

  submit() {
    console.log(this.form.value);

    let obj = {
      username: this.form.get('name').value,
      phone_no: this.form.get('mobile').value,
      user_location: this.form.get('location').value,
      lat: this.coordinates? this.coordinates.latitude : '' ,
      long: this.coordinates? this.coordinates.longitude : ''
    }
    let auth = localStorage.getItem('auth_session');
    this.mainService.sendLocationDetails(obj,auth).subscribe(res=>{

    })
    this.dialogRef.close(this.form.value);
  }

}
