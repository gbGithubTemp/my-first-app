import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../Services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedinuser: string;
  constructor(private alertify: AlertifyService) { }

  ngOnInit() {
  }

  loggedin(){
    this.loggedinuser = localStorage.getItem('token');
    return this.loggedinuser;
  }

  onLogout(){
    localStorage.removeItem('token');
    this.alertify.success("You are logged out !");
  }

}
