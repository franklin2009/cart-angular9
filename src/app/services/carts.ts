import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CartService {

// API_KEY = 'YOUR_API_KEY';
  apiUrl: string = 'http://localhost/cart/public/api/v1';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }
  
  total() {
    return this.http.get(`${this.apiUrl}/cart/total`);
  }
  
  list() {
    return this.http.get(`${this.apiUrl}/cart/list-product`);
  }

  add(data){
    let API_URL = `${this.apiUrl}/cart/add-product`;
    return this.http.post(API_URL, data, { headers: this.headers }).pipe(catchError(this.error));
  }
  
  chechout(data){
    let API_URL = `${this.apiUrl}/cart/chechout`;
    return this.http.post(API_URL, data).pipe(catchError(this.error));
  }

  update(data) {
    let API_URL = `${this.apiUrl}/cart/update-product`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(catchError(this.error));
  }

  delete(id) {
    var API_URL = `${this.apiUrl}/cart/delete-product/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}