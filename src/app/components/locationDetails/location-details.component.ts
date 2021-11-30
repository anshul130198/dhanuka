import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

    constructor(private formBuilder: FormBuilder,
        private mainService: MainService,
        private route: ActivatedRoute) {

        this.getProductData(this.route.snapshot.queryParamMap.get('URL'));
        this.getEmailAndNumber();
        this.coordinates = this.askForLocation();

        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(100)]],
            mobile: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
            location: ["", Validators.maxLength(100)],
        })
    }

    ngOnInit() {

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
            localStorage.setItem('tableData', JSON.stringify(res['result'][0]));
            localStorage.setItem('status', res['status']);
            localStorage.setItem('auth_session', res['result'].length > 0 ? res['result'][0]['auth_session'] : '');
        }, err => {
            console.log(err);
            localStorage.setItem('showError', 'true');
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
        })
    }


}
