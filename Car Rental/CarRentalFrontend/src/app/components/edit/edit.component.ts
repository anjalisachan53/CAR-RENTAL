import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductModel} from 'src/app/components/model/car.model';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { DecryptserviceService } from 'src/app/services/decryptservice.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {


  

  dataForm!: FormGroup;
  productobj: ProductModel = new ProductModel();

  constructor(private fb:FormBuilder,private activatedroute:ActivatedRoute,public auth:AuthserviceService,private http:HttpClient,private userStore:DecryptserviceService,private route:Router){}


  ngOnInit(): void {
    //console.log(this.activatedroute.snapshot.params['productId'])
    this.auth.getProductById(this.activatedroute.snapshot.params['productId']).subscribe((res)=>{
      console.log(res[0])
      this.dataForm=this.fb.group({
        productname: (res[0]['productName']),
        description: (res[0]['description']),
        price: (res[0]['price']),
        productCategory: (res[0]['productCategory'])
      })
      
    })


    this.dataForm=this.fb.group({
      productname: ['',Validators.required],
      description: ['',Validators.required],
      price: ['',Validators.required],
      productCategory: ['',Validators.required]
    })
  }

  

  onEdit(){
    this.productobj.productId=this.activatedroute.snapshot.params['productId'];
    this.productobj.productName=this.dataForm.value.productname
    this.productobj.description=this.dataForm.value.description
    this.productobj.price=this.dataForm.value.price
    this.productobj.productCategory=this.dataForm.value.productCategory

    this.auth.UpdateData(this.productobj).subscribe(res=>{
      this.dataForm.reset();
      alert(res.message)
      this.route.navigate(['dashboard'])
    })
   
  }



  logout(){
    this.auth.logout();
  }

  AddRecord(){
    this.route.navigate(['addproduct'])
  }

  onClear(){
    if(this.dataForm.valid){
      this.dataForm.reset();
    }
  }
  

  onBack(){
    this.route.navigate(['dashboard'])
  }

  

}
