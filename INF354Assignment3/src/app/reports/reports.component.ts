import { Component, OnInit, ChangeDetectorRef   } from '@angular/core';
import { DataService } from '../services/data.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';

interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],

})
export class ReportsComponent implements OnInit {
  products: any[] = [];
  brands: any[] = [];
  productTypes: any[] = [];
  activeProducts: any[] = [];

  brandChartData: ChartData[] = [];
  productTypeChartData: ChartData[] = [];

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#90E0EF', '#00B4D8']
  };

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchData();
  }

  
  fetchData() {
    let productRequest = this.dataService.GetProduct().toPromise();
    let brandRequest = this.dataService.GetBrands().toPromise();
    let productTypeRequest = this.dataService.GetProdTypes().toPromise();

    Promise.all([productRequest, brandRequest, productTypeRequest]).then(
      ([products, brands, productTypes]) => {
        this.products = products;
        this.brands = brands;
        this.productTypes = productTypes;

        console.log('Products:', this.products);
        console.log('Brands:', this.brands);
        console.log('Product Types:', this.productTypes);

        this.prepareChartData();
        this.prepareActiveProducts();
        this.cdr.markForCheck();  // Ensure the component is updated

      }
    ).catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  prepareChartData() {
    if (this.products.length && this.brands.length && this.productTypes.length) {
      console.log('Products:', this.products);
      console.log('Brands:', this.brands);
      console.log('Product Types:', this.productTypes);
  
      this.brandChartData = this.brands.map(brand => {
        const matchingProducts = this.products.filter(p => p.brandId === brand.brandId);
        console.log(`Brand: ${brand.name}, Matching Products:`, matchingProducts);
        return {
          name: brand.name,
          value: matchingProducts.length
        };
      });
  
      this.productTypeChartData = this.productTypes.map(pt => {
        const matchingProducts = this.products.filter(p => p.productTypeId === pt.productTypeId);
        console.log(`Product Type: ${pt.name}, Matching Products:`, matchingProducts);
        return {
          name: pt.name,
          value: matchingProducts.length
        };
      });
  
      console.log('Brand Chart Data:', this.brandChartData);
      console.log('Product Type Chart Data:', this.productTypeChartData);
    }
  }
  
  prepareActiveProducts() {
    this.activeProducts = this.products.filter(p => p.isActive);
    console.log('Active Products:', this.activeProducts);
  }

  // Helper method to filter products
  getFilteredProducts(typeId: number, brandId: number) {
    const filteredProducts = this.activeProducts.filter(p => p.productTypeId === typeId && p.brandId === brandId);
    console.log(`Filtered Products for Type ID ${typeId} and Brand ID ${brandId}:`, filteredProducts);
    return filteredProducts;
  }
}

