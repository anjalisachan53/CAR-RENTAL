import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { DecryptserviceService } from 'src/app/services/decryptservice.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent {

  
  ProductArray: any[]=[];
  showError = false;
  reviewSaved = false;
  otherReviews: any[] = [];
  dataForm!: FormGroup;
  public UserId: string="";
  //reviewControl = new FormControl('');
 
  

  constructor(private fb:FormBuilder,private activatedroute:ActivatedRoute,public auth:AuthserviceService,private http:HttpClient,private userStore:DecryptserviceService,private route:Router){}

  public UserName:string="";
  public Role:string="";
  public startDate!: string;
  public endDate!: string;
  dateForm!: FormGroup;

  ngOnInit(): void {
    //console.log(this.activatedroute.snapshot.params['productId'])
    this.getAllProduct();
    
    this.userStore.getUsername().subscribe(val=>{
      const useridfromtoken=this.auth.getUserId();
      this.UserId=val || useridfromtoken
      //console.log(this.UserId)
    })

    this.userStore.getUsername().subscribe(val=>{
      const usernamefromtoken=this.auth.getUsername();
      this.UserName=val || usernamefromtoken
    })

    this.userStore.getRolefromStore().subscribe(val=>{
      const rolefromtoken=this.auth.getRoleofUser();
      this.Role=val || rolefromtoken;
    })

    this.dataForm=this.fb.group({
      description: ['',Validators.required]
    })

    this.dateForm=this.fb.group({
      start: ['',[Validators.required, this.dateValidator]],
      end: ['',[Validators.required,this.dateValidator]]
    })
  }

  dateValidator(control: { value: string | number | Date; }) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    // Set the time to the end of the current day for comparison
    currentDate.setHours(23, 59, 59, 999);

    if (selectedDate < currentDate) {
      return { pastDate: true };
    }

    return null;
  }

  getAllProduct(){
    this.auth.getProductById(this.activatedroute.snapshot.params['productId']).subscribe(
      (res: any)=>{
        this.ProductArray=res;
        console.log(res)
        //console.log(this.ProductArray[0])
        //const productArray = Object.values(res);
        
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


  onAddtoCart(){
    //console.log(this.UserId,this.activatedroute.snapshot.params['productId'])
    if(this.dateForm.valid){
    const productId = this.activatedroute.snapshot.params['productId'];
    const userId = this.UserId; // Assuming you have userId available in this component
    const startDate = this.dateForm.value.start;
    const endDate = this.dateForm.value.end;
    //console.log(productId)
    this.auth.pushCart(userId,productId,startDate,endDate).subscribe({
      next: (res)=>{
      alert(res.message)
      this.route.navigate(['viewcart'])
    },
    error:(err)=>{
      alert(err?.error.message)
      this.dateForm.reset();
    }
  })
}
}

  onOrder(){
    this.route.navigate(['orders'])
  }


}
