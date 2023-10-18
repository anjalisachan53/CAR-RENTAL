import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { DecryptserviceService } from 'src/app/services/decryptservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  


  ProductArray: any[]=[];

  public UserName:string="";
  public Role:string="";

  constructor(public auth:AuthserviceService,private route:Router,private userStore:DecryptserviceService){}

  

  ngOnInit(): void {
    this.getAllProduct();

    this.UserName=this.auth.getUsername();
    this.userStore.getUsername().subscribe(val=>{
      const usernamefromtoken=this.auth.getUsername();
      this.UserName=val || usernamefromtoken
    })
    
    this.userStore.getRolefromStore().subscribe(val=>{
      const rolefromtoken=this.auth.getRoleofUser();
      this.Role=val || rolefromtoken;
    })
    
  }

  logout(){
    this.auth.logout();
  }

  getAllProduct(){
    this.auth.GetAllProducts().subscribe(
      (res: any)=>{
        this.ProductArray=res;
        console.log(res)
        //console.log(StudentArray[0][1])
        
      }
    )
  }

  login(){
    this.route.navigate(['login']);
  }

  register(){
    this.route.navigate(['signup']);
  }

  AddRecord(){
    this.route.navigate(['add'])
  }

  RentalApproval(){
    this.route.navigate(['rentalapproval'])
  }

  onOrder(){
    this.route.navigate(['order'])
  }


  onDelete(x:any){
    this.auth.DeleteData(x).subscribe(
      res=>{
        alert(res.message)
        this.getAllProduct();
      }
    )
  }


}
