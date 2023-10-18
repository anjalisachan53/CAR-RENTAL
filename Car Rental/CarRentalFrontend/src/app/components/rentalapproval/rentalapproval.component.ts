import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { DecryptserviceService } from 'src/app/services/decryptservice.service';

@Component({
  selector: 'app-rentalapproval',
  templateUrl: './rentalapproval.component.html',
  styleUrls: ['./rentalapproval.component.scss']
})
export class RentalapprovalComponent {


  
  constructor(private fb:FormBuilder,private activatedroute:ActivatedRoute,public auth:AuthserviceService,private http:HttpClient,private userStore:DecryptserviceService,private route:Router){}

  public UserName:string="";
  public Role:string="";
  ProductArray: any[]=[];
  CartArray:any[]=[];
  public UserId: number=0;
  DateArray: any[]=[];
  public ApprovalUserId: number=0;

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

  //this.getAllCart()
  this.getAllRental()
  this.getAllProduct
  }




  getAllRental(){
    this.auth.GetAllRentals().subscribe(
      (res: any)=>{
        this.ProductArray=res;
        this.DateArray=res;
        this.ApprovalUserId=this.ProductArray[0].userId
        console.log(res)
        //console.log(StudentArray[0][1])
        this.getAllProduct(); 
      }
    )
  }

  
  getAllProduct(){
    var id=this.ProductArray[0].carId
    this.auth.getProductById(id).subscribe(
      (res: any)=>{
        this.ProductArray=res;
        //console.log(res)
        
      }
    )
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

  onOrder(value:boolean){
    //console.log(this.ApprovalUserId,value)
    this.auth.ApproveOrder(value).subscribe(res=>{
      alert(res.message)
      this.route.navigate(['dashboard'])
      //console.log(res)
    })
  }



  


}
