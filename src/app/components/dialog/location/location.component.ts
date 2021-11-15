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
    public dialogRef: MatDialogRef<LocationDialogeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      mobile: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      location: ["", Validators.maxLength(100)],
    })
  }

  get f(){  
    return this.form.controls;  
  }  

  onClose() {
    this.dialogRef.close();
  }

  submit() {
    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
  }

}
