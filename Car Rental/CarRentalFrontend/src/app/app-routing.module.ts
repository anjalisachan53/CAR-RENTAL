import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { ViewcartComponent } from './components/viewcart/viewcart.component';
import { OrderComponent } from './components/order/order.component';
import { RentalapprovalComponent } from './components/rentalapproval/rentalapproval.component';

const routes: Routes = [
  {path: '', redirectTo:'dashboard', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'add', component:AddComponent},
  {path:'edit/:productId',component: EditComponent},
  {path:'productdetail/:productId', component: ProductdetailComponent},
  {path:'viewcart', component: ViewcartComponent},
  {path:'order', component: OrderComponent},
  {path:'rentalapproval', component: RentalapprovalComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
