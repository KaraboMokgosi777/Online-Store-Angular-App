import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StoreComponent } from './store/store.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {path: 'reports', component: ReportsComponent}
,  {path: 'login', component: LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'store', component:StoreComponent},
  {path: 'addProduct', component:AddProductComponent},
  {path: '', redirectTo: '/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
