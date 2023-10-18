import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { DecryptserviceService } from 'src/app/services/decryptservice.service';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.scss']
})
export class ViewcartComponent {

  
  constructor(private fb:FormBuilder,private activatedroute:ActivatedRoute,public auth:AuthserviceService,private http:HttpClient,private userStore:DecryptserviceService,private route:Router){}

  public UserName:string="";
  public Role:string="";
  ProductArray: any[]=[];
  CartArray:any[]=[];
  public UserId: number=0;

  ngOnInit(): void {
    //console.log(this.activatedroute.snapshot.params['productId'])
    this.UserName=this.auth.getUsername();
    this.userStore.getUsername().subscribe(val=>{
      const usernamefromtoken=this.auth.getUsername();
      this.UserName=val || usernamefromtoken
    })

    this.userStore.getUsername().subscribe(val=>{
      const useridfromtoken=this.auth.getUserId();
      this.UserId=val || useridfromtoken
      //console.log(this.UserId)
    })

  this.getAllCart()
  this.getAllProduct()
  }


  getAllCart(){
    
    this.auth.getViewCartByUserId(this.UserId).subscribe(
      (res: any)=>{
        this.CartArray=res;
        console.log(res,this.CartArray.length)
        this.getAllProduct();
      }
    )
  }

  
  getAllProduct(){
    var id=this.CartArray[0].carId
    this.auth.getProductById(id).subscribe(
      (res: any)=>{
        this.ProductArray=res;
        //console.log(res)
      }
    )
  }

  removeFromCart(id:any){
    //var id=this.CartArray[0].productId
    this.auth.deletefromCart(this.UserId,id).subscribe(res=>{
      alert(res.message)
      this.getAllCart()
      window.location.reload();
    })
  }



  logout(){
    this.auth.logout();
  }

  login(){
    this.route.navigate(['login']);
  }

  register(){
    this.route.navigate(['signup']);
  }

  AddRecord(){
    this.route.navigate(['addproduct'])
  }

  onOrder(){
    this.auth.placeOrder(this.UserId).subscribe(res=>{
      alert(res.message)
      this.route.navigate(['order'])
      //console.log(res)
    })
  }

  onOrderClick(){
    this.route.navigate(['order'])
  }

  


}
