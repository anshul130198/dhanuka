
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MainService {

    constructor(private http: HttpClient) {

    }


    getProductData(obj) {
        return this.http.post('',obj);
    }

    sendLocationDetails(obj) {
        return this.http.put('', obj)
    }

}