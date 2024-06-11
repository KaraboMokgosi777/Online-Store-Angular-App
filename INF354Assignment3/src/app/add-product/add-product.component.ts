import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product';
import { brands } from '../shared/brand';
import { productType } from '../shared/prodtype';
import { AfterViewInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Route, Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  branddata: brands[] = [];
  produType: productType[] = [];

  constructor(private dataservice: DataService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getBrands();
    this.getprodType();
  }

  addProduct() {


    //collect values from form inputs
    const prodName = (<HTMLInputElement>document.getElementById('productName')).value;
    const price = parseFloat((<HTMLInputElement>document.getElementById('price')).value);
    const brand = parseFloat((<HTMLInputElement>document.getElementById('brand')).value);
    const prodType = parseFloat((<HTMLInputElement>document.getElementById('producType')).value);
    const description = (<HTMLInputElement>document.getElementById('description')).value;


    const fileImage = document.getElementById('image') as HTMLInputElement;


    if (prodName == '') {
      this._snackBar.open("Please ensure all fields are fiiled in!", "OK");
    }
    else if (price == null) {
      this._snackBar.open("Please ensure all fields are fiiled in!", "OK");
    }
    else if (brand == null) {
      this._snackBar.open("Please ensure all fields are fiiled in!", "OK");
    }
    else if (prodType == null) {
      this._snackBar.open("Please ensure all fields are fiiled in!", "OK");
    }
    else if (description == '') {
      this._snackBar.open("Please ensure all fields are fiiled in!", "OK");
    }
    else {
      //start
      if (fileImage.files != null && fileImage.files.length != 0) {
        const file = fileImage.files[0]
        //create base 64 image
        this.createIamge(file).then((base64String) => {
          const image = base64String.replace(/^data:image\/(png|jpeg);base64,/, '');
          //add the product with image
          this.dataservice.addProducts(price, prodType, brand, description, prodName, image).subscribe(() => {
            this.router.navigate(['/store']);//navigate to products store page once product is added
            this._snackBar.open(prodName + " has been created successfully!", "OK");//success message
          });
        }).catch((error) => {
          console.error('Error converting image to base64:', error);
        });

      } else {
        // add product without image
        this.dataservice.addProducts(price, prodType, brand, description, prodName, '').subscribe(() => {
          this.router.navigate(['/store']);//navigate to products store page once product is added
          this._snackBar.open(prodName + " has been created successfully!", "OK");//success message
        });

      }
      //end
    }
  }

  //converts the image to base64
  createIamge(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error)
      };
      reader.readAsDataURL(file);
    });
  }

  //gets all brands
  getBrands() {
    this.dataservice.GetBrands().subscribe(result => {
      let brandList: any[] = result
      brandList.forEach((element) => {
        this.branddata.push(element)
      });
    })
  }

  getprodType() {
    this.dataservice.GetProdTypes().subscribe(result => {
      let prodType: any[] = result
      prodType.forEach((element) => {
        this.produType.push(element)
      });
    })
  }

}
