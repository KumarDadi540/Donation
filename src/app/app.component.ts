import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from './global-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Donation';
  loginUserData: any;
  PUrl: any;
  constructor(private service: GlobalServiceService,private route:Router) { 
    setInterval(() => {
      this.loginUserData = localStorage.getItem('loginUserData');
      this.PUrl = window.location.href.substr(window.location.href.length - 10)
    //   console.log('1');
      if(this.PUrl == 'Do-Reports'){
        this.loginUserData = localStorage.getItem('loginUserData');
      }
    }, 1000);
  }
  Logout(){
    this.loginUserData = "";
    localStorage.clear();
    this.route.navigateByUrl("DoForm");
  }
}
