import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
    selector: 'app-location-details',
    templateUrl: 'location-details.component.html',
    styleUrls: ['location-details.component.scss']
})
export class LocationDetailComponent implements OnInit {

    form: FormGroup;
    lat: any;
    long: any;
    coordinates;
    @ViewChild('mobile') Search: ElementRef;
    showError: boolean = false;
    status: boolean = false;
    numberCheck = ['0','1','2','3','4'];

    constructor(private formBuilder: FormBuilder,
        private mainService: MainService,
        private route: ActivatedRoute,
        private router: Router) {

        this.getProductData(this.route.snapshot.queryParamMap.get('URL'));
        this.getEmailAndNumber();
        this.coordinates = this.askForLocation();

        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(100)]],
            mobile: ["", [Validators.required, Validators.pattern("([5-9][0-9]{9})$")]],
            location: ["", Validators.maxLength(100)],
        })
    }

    ngOnInit() {

    }

    validateNumber(event) {
        // console.log(this.form.controls);
        console.log(this.form.controls['mobile'].value[0])
        if (this.form.controls['mobile'].value && this.numberCheck.includes(this.form.controls['mobile'].value[0]) ) {
            this.form.controls['mobile'].markAsTouched()
        }
        const keyCode = event.keyCode;

        const excludedKeys = [8, 37, 39, 46];

        if (!((keyCode >= 48 && keyCode <= 57) ||
            (keyCode >= 96 && keyCode <= 105) ||
            (excludedKeys.includes(keyCode)))) {
            event.preventDefault();
        }
    }

    get f() {
        return this.form.controls;
    }

    askForLocation() {
        navigator.geolocation.getCurrentPosition((pos) => this.setPosition(pos))
    }

    setPosition(pos) {
        this.coordinates = pos.coords;
    }

    getEmailAndNumber() {
        this.mainService.getNumber().subscribe(res => {
            console.log(res['result']);
            res['result'].map(item => {
                localStorage.setItem(item.name, item.value)
            })
            // localStorage.setItem('number', res['result'][0].value)
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
            localStorage.setItem('tableData', JSON.stringify(res['result'][0]));
            localStorage.setItem('status', res['status']);
            localStorage.setItem('auth_session', res['result'][0]['auth_session']);
            this.status = res['status'];
        }, err => {
            console.log(err);
            localStorage.setItem('showError', 'true');
            this.showError = true
            // this.router.navigateByUrl('Error');
        })

    }

    submit() {
        console.log(this.form.value);
        let obj = {
            username: this.form.get('name').value,
            phone_no: this.form.get('mobile').value,
            user_location: this.form.get('location').value,
            lat: this.coordinates ? this.coordinates.latitude : '',
            long: this.coordinates ? this.coordinates.longitude : ''
        }
        let auth = localStorage.getItem('auth_session');
        this.mainService.sendLocationDetails(obj, auth).subscribe(res => {
            console.log(res);
        })

        if (this.showError) {
            this.router.navigateByUrl('/Error');
        } else if (!this.status) {
            this.router.navigateByUrl('/QRCODE/invalid');
        } else {
            this.router.navigateByUrl('/QRCODE/valid');
        }
    }


}
