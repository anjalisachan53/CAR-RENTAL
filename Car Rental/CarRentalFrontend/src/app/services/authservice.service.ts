import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private baseUrl: string= "https://localhost:7185/api/User/";

  private userpayload:any;

  constructor(private http: HttpClient,private router: Router) { 
    this.userpayload=this.decodeToken();
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}login`,loginObj)
  }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj)
  }

  storeToken(tokenvalue:string){
    localStorage.setItem('token',tokenvalue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }

  logout(){
    localStorage.clear();
    window.location.reload();
    this.router.navigate(['dashboard'])
  }


  decodeToken(){
    const jwthelper=new JwtHelperService();
    const token=this.getToken()!;
    console.log(jwthelper.decodeToken(token))
    return jwthelper.decodeToken(token);
  }

  getUsername(){
    if(this.userpayload)
      return this.userpayload.UserName
  }

  getUserId(){
    if(this.userpayload)
      return this.userpayload.Id
  }

  getRoleofUser(){
    if(this.userpayload)
      return this.userpayload.Role
  }

  GetAllProducts():Observable<any[]>{
    return this.http.get<any>(`${this.baseUrl}get_all_products`);
  }


  pushData(userObj:any){
    return this.http.post<any>(`${this.baseUrl}AddProduct`,userObj)
  }

  getProductById(id:number){
    return this.http.get<any>(`${this.baseUrl}get_productby_id/`+id);
  }

  UpdateData(data:any){
    return this.http.put<any>(`${this.baseUrl}update_product`,data);
  }

  DeleteData(id: number){
    return this.http.delete<any>(`${this.baseUrl}delete_product/`+id);
  }

  pushCart(userid:any,productid:any,startDate: string, endDate: string){
    
    const bookingData = {
      userId: userid,
      carId: productid,
      startDate: startDate,
      endDate: endDate
    };
    //console.log(userid,productid)
    return this.http.post<any>(`${this.baseUrl}book/`,bookingData);
  }

  getCartByUserId(id:number){
    
    return this.http.get<any>(`${this.baseUrl}view_productby_id/`+id);
  }

  deletefromCart(userid:any,productid:any){
    return this.http.delete<any>(`${this.baseUrl}RemoveCartItems/`+ userid + `/` + productid,{});
  }

  placeOrder(userid:any){
    return this.http.post<any>(`${this.baseUrl}placeOrder/`+ userid,{});
  }

  getOrderByProductId(userid:any){
    return this.http.get<any>(`${this.baseUrl}ordered/`+ userid);
  }

  getOrderDate(userid:any,id:any){
    return this.http.get<any>(`${this.baseUrl}getOrderDatesByUserId/`+ userid + `/` + id,{});
  }

  getViewCartByUserId(id:number){
    return this.http.get<any>(`${this.baseUrl}GetCompleteCart/`+id);
  }

  GetAllRentals():Observable<any[]>{
    return this.http.get<any>(`${this.baseUrl}get_all_rentals`);
  }

  ApproveOrder(value:boolean){
    console.log(value)
    return this.http.post<any>(`${this.baseUrl}approveOrder/`+ value,{});
  }


}
