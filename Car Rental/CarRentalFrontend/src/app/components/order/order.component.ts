import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { DecryptserviceService } from 'src/app/services/decryptservice.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  
  public UserId: number=0;
  public UserName:string="";
  public Date:string="";
  ProductArray: any[]=[];
  CartArray:any[]=[];
  DateArray: any[]=[];

  constructor(private fb:FormBuilder,private activatedroute:ActivatedRoute,public auth:AuthserviceService,private http:HttpClient,private userStore:DecryptserviceService,private route:Router){}
  
  
  ngOnInit(): void {
    this.userStore.getUsername().subscribe(val=>{
      const useridfromtoken=this.auth.getUserId();
      this.UserId=val || useridfromtoken
      console.log(this.UserId)
    })

    this.userStore.getUsername().subscribe(val=>{
      const usernamefromtoken=this.auth.getUsername();
      this.UserName=val || usernamefromtoken
    })
    this.getAllCart()
    //this.getAllProduct()
    //this.getOrderDate()
  }

  
  getAllCart(){
    //console.log(this.UserId)
    this.auth.getOrderByProductId(this.UserId).subscribe(
      (res: any)=>{
        this.CartArray=res;
        //console.log(res)
        this.getAllProduct();
      }
    )
  }
  

  getAllProduct(){
    var id=this.CartArray[0]
    //console.log(id)
    this.auth.getProductById(id).subscribe(
      (res: any)=>{
        this.ProductArray=res;
        //console.log(res)
        this.getOrderDate()
      }
    )
  }
  
  getOrderDate(){
    var id=this.ProductArray[0].productId
    console.log(id)
    this.auth.getOrderDate(this.UserId,id).subscribe(res=>{
      this.DateArray=res
      console.log(this.DateArray)
    })
  }



  onViewCart(){
    this.route.navigate(['viewcart'])
  }



  onOrder(){
    this.route.navigate(['orders'])
  }

  logout(){
    this.auth.logout();
  }


}
