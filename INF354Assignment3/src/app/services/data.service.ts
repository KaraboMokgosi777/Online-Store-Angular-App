import { Injectable } from '@angular/core';
import { map, Observable, of} from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm,FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user } from '../shared/users';
import { brands } from '../shared/brand';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  apiURl = "http://localhost:5240/api/";

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {}

  Login(emailaddress: string, password: string){
      let user = {emailaddress, password};      
      return this.httpClient.post(`${this.apiURl}Authentication/Login`, user)
  }

  //add user
  addUser(emailaddress: string, password: string){
    let userNew = {emailaddress, password};
    const url = `${this.apiURl}Authentication/RegisterUser`;
    return this.httpClient.post(url, userNew);
  }

  //get product
  GetProduct(): Observable<any> {
    return this.httpClient.get(`${this.apiURl}Products/GetAllProducts`)
      .pipe(map(result => result))
  }

  //get product types
  GetProdTypes(): Observable<any> {
    return this.httpClient.get(`${this.apiURl}Products/GetProductTypes`)
      .pipe(map(result => result))
  }

  //get brands
  GetBrands(): Observable<any> {
    return this.httpClient.get(`${this.apiURl}Products/GetBrands`)
      .pipe(map(result => result))
  }

  //add product
  addProducts(price: number, producttype: number, brand: number, description: string, name: string, image: string){
    
    let userNew = {price, producttype, brand, description, name, image};
    const url = `${this.apiURl}Products/AddProduct`;
    return this.httpClient.post(url, userNew);
    
  }
}

