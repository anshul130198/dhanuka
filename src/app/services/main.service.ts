import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class MainService {

    baseUrl = environment.baseUrl

    constructor(private http: HttpClient) {

    }

    // encodeURIComponent
    getProductData(obj) {
        return this.http.post(`${this.baseUrl}qrcode-auth-logs`, obj);
    }

    sendLocationDetails(obj, auth) {
        return this.http.put(`${this.baseUrl}update/qrcode-auth-logs/${auth}`, obj)
    }

    getNumber() {
        return this.http.get(`${this.baseUrl}general-preferences/whatspp-email`)
    }

}