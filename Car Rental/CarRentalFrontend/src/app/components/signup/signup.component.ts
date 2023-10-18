import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  
  type: string="password";
  isText: boolean=false;
  eyeIcon: string="fa-eye-slash";
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,private router: Router,private auth:AuthserviceService){}

  ngOnInit(): void {  
    this.signupForm=this.fb.group({
      username: ["",[Validators.required,Validators.maxLength(50)]],
      useremail: ["",[Validators.required]],
      password: ["",[Validators.required,Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
 
    },
    )
  }

  hideShowPass(){
    this.isText=!this.isText;
    this.isText? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText ? this.type="text" : this.type = "password";
  }


  onSignup(){

    if(this.signupForm.valid){
      //send to DB
      console.log(this.signupForm.value);
      this.auth.signUp(this.signupForm.value).subscribe({
        next:(res)=> {
          alert(res.message)
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }
    
    else{
      //throw error
   
      //validateform.validateFormFields(this.signupForm);
      alert("form is invalid")
  }
}


}
