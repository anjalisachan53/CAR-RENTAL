import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {


  dataForm!: FormGroup;


  constructor(private auth:AuthserviceService,private route:Router,private fb: FormBuilder){}


  ngOnInit(): void {
    this.dataForm=this.fb.group({
      productname: ['',Validators.required],
      description: ['',Validators.required],
      price: ['',Validators.required],
      productcategory: ['',Validators.required]
    })
  }

  onAdd(){
    if(this.dataForm.valid)
    {
      console.log(this.dataForm.value)
      this.auth.pushData(this.dataForm.value).subscribe({
        next: (res)=>{
          this.dataForm.reset();
          alert(res.message)
          this.route.navigate(['dashboard'])
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }
    else{
      //validateForm.validateFormFields(this.dataForm)
      alert("One or more empty entries");
    }
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
