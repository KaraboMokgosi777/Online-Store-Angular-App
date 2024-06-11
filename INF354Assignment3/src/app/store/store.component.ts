import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from '../shared/product';
import { brands } from '../shared/brand';
import { productType } from '../shared/prodtype';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements AfterViewInit, OnInit {
  columnsToDisplay: string[] = ['Image', 'Name', 'Price', 'Brand', 'ProductType', 'Description'];
  
  prodData = new MatTableDataSource<Product>();
  branddata: brands[] = [];
  produType: productType[] =[];

  constructor(private dataservice : DataService,  private snackBar: MatSnackBar) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  ngAfterViewInit() {
    this.prodData.paginator = this.paginator;
    this.prodData.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataservice.GetProduct().subscribe((products:any) => {
      this.prodData.data = products
    });
    this.getBrands();
    this.getprodType();
  }

  logout(){
    localStorage.clear();
  }
  
  getBrands(){
    this.dataservice.GetBrands().subscribe(result => {
      let brandList:any[] = result
      brandList.forEach((element) => {
        this.branddata.push(element)
      });
    })
  }

  getprodType(){
    this.dataservice.GetProdTypes().subscribe(result => {
      let prodType:any[] = result
      prodType.forEach((element) => {
        this.produType.push(element)
      });
    })
  }

  filterProducts(event: Event) {
    const queryToFilter = (event.target as HTMLInputElement).value;
    this.prodData.filter = queryToFilter.trim().toLowerCase();
  }
}
