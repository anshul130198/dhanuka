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

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LocationDialogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mainService: MainService) {
    this.askForLocation();

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      mobile: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      location: ["", Validators.maxLength(100)],
    })
  }

  get f() {
    return this.form.controls;
  }

  askForLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      alert('Location accessed');
      console.log(position.coords);
    }, function () {
      alert('User not allowed')
    }, { timeout: 10000 })
  }

  onClose() {
    this.dialogRef.close();
  }

  submit() {
    console.log(this.form.value);
    let obj = {
      name: this.form.get('name').value,
      mobile: this.form.get('mobile').value,
      location: this.form.get('location').value,
      userLocation: ''
    }
    this.mainService.sendLocationDetails(obj).subscribe(res=>{

    })
    this.dialogRef.close(this.form.value);
  }

}
