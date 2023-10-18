import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../services/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private auth:AuthserviceService,private router:Router){

  }

  canActivate(): boolean {
    if(this.auth.isLoggedIn())
    {
    return true;
    }
    else{
      this.router.navigate(['login']) 
      alert("Login First")
      return false;
    }
  }
  
}
