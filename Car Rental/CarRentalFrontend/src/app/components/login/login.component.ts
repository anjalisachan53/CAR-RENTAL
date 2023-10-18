import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  

  
  type: string="password";
  isText: boolean=false;
  eyeIcon: string="fa-eye-slash";
  loginform!: FormGroup;

  constructor(private fb: FormBuilder, private router:Router,private auth:AuthserviceService){}

  ngOnInit(): void {  
    this.loginform=this.fb.group({
      useremail: ["",[Validators.required]],
      password: ["",[Validators.required]]
    });
  }

  hideShowPass(){
    this.isText=!this.isText;
    this.isText? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText ? this.type="text" : this.type = "password";
  }
  
  onLogin(){
    
    if(this.loginform.valid){
      //send to DB
      console.log(this.loginform.value);
      this.auth.login(this.loginform.value).subscribe({
        next:(res)=> {
          alert(res.message)
          this.loginform.reset();
          this.auth.storeToken(res.token);
          //const tokenpayload=this.auth.decodeToken();
          //this.usrStore.setUsernameforStore(tokenpayload.UserName);
          //this.usrStore.setRoleforStore(tokenpayload.Role);
          this.router.navigate(['dashboard'])
          //var token=localStorage.getItem('token');
          //const decodedToken = new JwtHelperService().decodeToken(token);
  
        },
        error:(err)=>{
          alert(err?.error.message)
          this.loginform.reset();
        }
      })

    }
    else{
      //throw error
   
      //validateform.validateFormFields(this.loginform);
      alert("form is invalid")
    }    
  }



}
