import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../global-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  displaMsg:boolean=false;
  show = false;
  loginData: any;
  constructor(private service: GlobalServiceService,private route:Router) { }

  ngOnInit(): void {
    this.loginUserData = localStorage.getItem('loginUserData');
    if(this.loginUserData){
      this.route.navigateByUrl("Do-Reports");
    }
  }
  body: any = {};
  loginUserData: any;
  methodname: any;
  onSubmit(model: any){
    // console.log(form.value,'form')
    // this.methodname = 'login';
    // let body = { 'mobile': this.model.username, 'otp': this.model.username };
    // this.service.postData(body, this.methodname).subscribe((data:any) => {
    //   // this.loginUserData = data.data[0];
      // localStorage.setItem('loginUserData', JSON.stringify(this.loginUserData));
    //     this.route.navigateByUrl("Test");
    // })
    if(this.model.username == null || this.model.username == undefined || this.model.username == ""){
      alert("Please Enter Mobile Number");
      return false;
    }
    if(model.username.length >= 10){
      this.MobData = [];
      let body = { 'mobile': this.model.username, 'password': this.model.password };
      this.service.postData(body, 'login').subscribe((data: any) => {
          this.MobData = data;
          if(this.MobData['status'] == 'Success'){
            localStorage.setItem('loginUserData', JSON.stringify('Kshatriya'));
            this.route.navigateByUrl("Do-Reports");
          }else{
            alert("Invalid Mobile no or OTP");
          }
          
        // console.log(this.MobData,'DoData')
      });
    }else{
      alert("Enter valid mobile");
      return false;
    }

  }
  gotoLogin(){}
  gotoForgotPassword(a:any){}
  toggleShow(ev:any)
  {
    this.show = !this.show;
  }
  gotoRegister(){}

  MobData: any = [];
// sendOtp(model:any){
//   if(model.username.length >= 10){
//     this.MobData = [];
//     let body = { 'mobile': this.model.username };
//     this.service.postData(body, 'login').subscribe((data: any) => {
//         this.MobData = data;
//       // console.log(this.MobData,'DoData')
//     });
//   }else{
//     alert("Enter valid mobile");
//     return false;
//   }

// }

}

