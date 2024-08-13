import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StoreComponent } from './store/store.component';
import { AddProductComponent } from './add-product/add-product.component';
import {FormControl,FormGroupDirective,NgForm,Validators,FormsModule,ReactiveFormsModule,} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports/reports.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StoreComponent,
    AddProductComponent,
    ReportsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [
    {provide: ErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
