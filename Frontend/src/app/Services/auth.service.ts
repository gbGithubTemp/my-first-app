import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }
authUser(user: any): any{
  let userArray = [];
  if(localStorage.getItem('Users')){
    userArray = JSON.parse(localStorage.getItem('Users'));
  } 
  return userArray.find(p => p.userName === user.userName && p.password === user.password);
}
}
