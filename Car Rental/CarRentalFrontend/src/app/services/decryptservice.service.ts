import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecryptserviceService {

  
  private UserName$=new BehaviorSubject<string>("");
  private Role$=new BehaviorSubject<string>("");

  constructor() { }


  public getRolefromStore(){
    return this.Role$.asObservable();
  }

  public setRoleforStore(role:string){
    this.Role$.next(role);
  }

  public getUsername(){
    return this.UserName$.asObservable();
  }

  public setUsernameforStore(username:string){
    this.UserName$.next(username);
  }

}
