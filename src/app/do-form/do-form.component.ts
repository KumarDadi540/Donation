import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalServiceService } from '../global-service.service';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-do-form',
  templateUrl: './do-form.component.html',
  styleUrls: ['./do-form.component.scss']
})
export class DoFormComponent implements OnInit {
  model: any = {};
  model2: any = {};
  nmodel: any = {};
  finalform: any;
  MobData: any = [];
  DoData: any = [];
  Surnames: any = [];
  relationList: any = [];
  AreasData: any = [];
  methodname: any;
  detailform:boolean=false;
  detailform2:boolean=false;
  disableVerifybtn:boolean=false;
  disableOtp:boolean=false;
  disableInput:boolean=false;
  disableInput2:boolean=false;
  disableclear2:boolean=true;
  p: any = 1;

  // @ViewChild('closebutton') closebutton : any;
  // @ViewChild('viewdetails')  viewdetails: any;
  constructor(private service: GlobalServiceService, private DatePipe: DatePipe) { }

  ngOnInit(): void {
    this.getSurnames();
    this.getAreas();
  }
  getSurnames(){
    this.service.getMethodData('drop12').subscribe((data: any) => {
      this.Surnames = data;
      // console.log(this.Surnames,'Surnames');
      });
  }
  getrelationList(mon_num: any){
    this.service.getcheckdata('getseclist/',mon_num).subscribe((data: any) => {
      this.relationList = data;
      // console.log(this.AreasData,'AreasData');
      });
  }
  getAreas(){
    this.service.getMethodData('getareaname').subscribe((data: any) => {
      this.AreasData = data;
      // console.log(this.AreasData,'AreasData');
      });
  }
  areaChange(model:any){
    if(this.AreasData.length>0){
      for (let name of this.AreasData) {
        if (model.area.replace(/\s/g, '') === name.area.replace(/\s/g, '')) {
          
      // this.model.area = name.area;
      this.model.city = name.city;
      this.model.state = name.state;
      this.model.pincode = name.pincode;
          break;
        }
      }
    }
    
    
  }

  mobChange(model:any){
    if(model.mobileno.length >= 10){
      this.MobData = [];
      this.methodname = 'drop123';
      let body = { 'mobile': this.model.mobileno };
      this.service.postData(body, this.methodname).subscribe((data: any) => {
          this.MobData = data;
          this.disableOtp=true;

          // if(this.MobData['status'] == '1'){
          //   this.detailform=true;
          //   this.disableOtp=false;
          //   this.disableVerifybtn=true;

          //   let Data = this.MobData.data[0];
          //   this.model.mobileno = Data.Mobile;
          //   this.model.name = Data.Name;
          //   this.model.surname = Data.Surname;
            
          //   this.model.nickname = Data.Address;
          //   this.model.address1 = Data.Address1;
          //   this.model.address2 = Data.Address2;
          //   this.model.area = Data.area;
          //   this.model.city = Data.city;
          //   this.model.state = Data.state;
          //   this.model.pincode = Data.pincode;
          //   this.model.email = Data.Email;
          //   this.model.otherinfo = Data.Otherinfo;
          //   this.model.confrmtodonate = Data.Cnfdonate;
          //   this.model.amount = Data.Amount;
          //   this.model.submittedby = Data.Datasubmetby;
          //   this.model.agentmobileno = Data.Agentmobile;
          // }else{
          //   this.disableOtp=true;
          // }
        // console.log(this.MobData,'DoData')
      },
      error => {
        alert('Something went wrong');
      });
    }else{
      alert("Enter valid mobile");
      return false;
    }

  }
  surnameChange(model:any){
    if(this.Surnames.length>0){
      for (let name of this.Surnames) {
        if (model.surname.replace(/\s/g, '') === name.Surname.replace(/\s/g, '')) {
          
          model.gotram = name.gotram;
          console.log(name.gotram,'gotram');
          break;
        }
      }
      // if(!this.model.gotram){
      //   alert("Please Select valid Surname");
      //   this.model.surname = '';
      //   this.model.gotram = '';
      //   return false;
      // }

    }
  }
  age: any;
  DOBChange(model:any){
    if (model.dob) {
      //convert date again to type Date
      const bdate = new Date(model.dob);
      const timeDiff = Math.abs(Date.now() - bdate.getTime() );
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      console.log('age:',this.age);

      if(this.detailform==true){
        this.model.age = this.age;
      }else{
        this.model2.age = this.age;
      }
    }
  }

  Verify(){
    if(this.model.mobileno == null || this.model.mobileno == undefined || this.model.mobileno == ""){
      alert("Please Enter Mobile Number");
      return false;
    }
    if(this.MobData.otp == this.model.otp){
      this.detailform=true;
      this.disableVerifybtn=true;
      // if(this.MobData['status'] == '1'){
      if(this.MobData.data.length>0){
        this.getrelationList(this.model.mobileno);
        this.detailform=true;
        // this.disableOtp=false;
        //disablebtn
        // this.disableVerifybtn=true;
        this.disableInput=true;

        let Data = this.MobData.data[0];
        console.log(Data,'Data');
        // this.model.mobileno = Data.Mobile;
        if(Data){
          this.model.id = Data.id;
          this.model.name = Data.Name;
          this.model.surname = Data.Surname;
          this.model.membertype = Data.membertype;
          this.model.mobileno2 = Data.mobile2;
          this.model.relationship = Data.relationship;
          
          this.model.nickname = Data.nickname;
        // this.model.dob = Data.dob;
          this.model.dob = new Date(Data.dob).toISOString().split('T')[0];
          this.model.age = Data.age;
          this.model.bloodgroup = Data.bloodgroup;
          this.model.address1 = Data.Address1;
          this.model.address2 = Data.Address2;
          this.model.area = Data.area;
          this.model.city = Data.city;
          this.model.state = Data.state;
          this.model.pincode = Data.pincode;
          this.model.email = Data.Email;
          this.model.otherinfo = Data.Otherinfo;
          this.model.native = Data.native;
          this.model.district = Data.district;
          this.model.gotram = Data.gotra;
          // this.model.confrmtodonate = Data.Cnfdonate;
          // this.model.amount = Data.Amount;
          this.model.submittedby = Data.Datasubmetby;
          this.model.agentmobileno = Data.Agentmobile;
          // this.model.mobile2 = Data.mobile2;
          this.jsondata = Data.image;
        }
      }
    }else{
      this.detailform=false;
      alert("Please enter avlid OTP");
    }
  }
  confrmtodonateSelect(model:any){
    model.amount= '';
    model.submittedby= undefined;
    model.agentmobileno= '';
  }
  submittedbySelect(model:any){
    model.agentmobileno= '';
  }
  checkln: any;
  Besumbit(model:any){
    this.nmodel = {};
    this.checkln = undefined;
    if(this.detailform==true){
      this.nmodel = this.model;
      // this.nmodel.membertype = 'Primary';
      this.nmodel.membertype = this.model.membertype?this.model.membertype:'Primary';
      this.nmodel.img = this.jsondata;
      
    }else{
      this.model2.mobileno = this.model.mobileno;
      this.nmodel = this.model2;
      // this.nmodel.membertype = 'Secondary';
      this.nmodel.membertype = this.model2.membertype?this.model2.membertype:'Secondary';
      this.nmodel.img = this.jsondata2;
      if(this.nmodel.relationship==undefined || this.nmodel.relationship==null || this.nmodel.relationship==''){
        alert("Please fill all mandatory fields");
        return false;
      }
    }
    if(this.nmodel.termsandconditions==undefined || this.nmodel.termsandconditions==null || this.nmodel.termsandconditions=='' || this.nmodel.termsandconditions==false){
      alert("Please accept terms and conditions");
      return false;
    }
    if(this.nmodel.mobileno==undefined || this.nmodel.mobileno==null || this.nmodel.mobileno==''){
      alert("Please fill all mandatory fields");
      return false;
    }
    if(this.nmodel.name==undefined || this.nmodel.name==null || this.nmodel.name==''){
      alert("Please fill all mandatory fields");
      return false;
    }
    if(this.nmodel.surname==undefined || this.nmodel.surname==null || this.nmodel.surname==''){
      alert("Please fill all mandatory fields");
      return false;
    }
    if(this.nmodel.native==undefined || this.nmodel.native==null || this.nmodel.native==''){
      alert("Please fill all mandatory fields");
      return false;
    }
    if(this.nmodel.dob==undefined || this.nmodel.dob==null || this.nmodel.dob==''){
      alert("Please fill all mandatory fields");
      return false;
    }
    if(this.nmodel.area==undefined || this.nmodel.area==null || this.nmodel.area==''){
      alert("Please fill all mandatory fields");
      return false;
    }
    if(this.nmodel.bloodgroup==undefined || this.nmodel.bloodgroup==null || this.nmodel.bloodgroup==''){
      alert("Please fill all mandatory fields");
      return false;
    }
    if(this.nmodel.age==undefined || this.nmodel.age==null || this.nmodel.age==''){
      alert("Please fill all mandatory fields");
      return false;
    }
    if(this.detailform==true){
      // let checkln = this.Surnames.filter((e:any) => { return e.Surname == this.model.surname })
      this.model.surname = this.model.surname.charAt(0).toUpperCase() + this.model.surname.slice(1);
      this.checkln = this.Surnames.filter((e:any) => { return e.Surname == this.model.surname })
    }else{
      this.model2.surname = this.model2.surname.charAt(0).toUpperCase() + this.model2.surname.slice(1);
      this.checkln = this.Surnames.filter((e:any) => { return e.Surname == this.model2.surname })
    }

    if(this.checkln.length >0 ){
      $("#viewdetails").modal('show');      
    }else{
      alert("Please Select valid Surname");
    }
    console.log(this.checkln,'checkln');


  }
clsbtn:any;
  Submit(form: NgForm) {
    // if(!this.model.mobileno || this.model.name || this.model.surname ||this.model.native){
    //   alert("Please fill all mandatory fields");
    //   return false;
    // }
    this.DoData = [];
    let body = {

        id: this.nmodel.id ? this.nmodel.id : '-1',
        mobile: this.nmodel.mobileno ? this.nmodel.mobileno : null,
        otp: this.nmodel.otp ? this.nmodel.otp : null,
        name: this.nmodel.name ? this.nmodel.name : null,
        surname: this.nmodel.surname? this.nmodel.surname : null,
        gotra: this.nmodel.gotram? this.nmodel.gotram : null,
        
        nickname: this.nmodel.nickname? this.nmodel.nickname : null,
        dob: this.nmodel.dob? this.DatePipe.transform(this.nmodel.dob, 'yyyy-MM-dd') : null,
        age: this.nmodel.age? this.nmodel.age : 0,
        bloodgroup: this.nmodel.bloodgroup? this.nmodel.bloodgroup : null,
        address1: this.nmodel.address1? this.nmodel.address1 : null,
        address2: this.nmodel.address2? this.nmodel.address2 : null,
        area: this.nmodel.area? this.nmodel.area : null,
        city: this.nmodel.city? this.nmodel.city : null,
        state: this.nmodel.state? this.nmodel.state : null,
        pincode: this.nmodel.pincode? this.nmodel.pincode : null,
        
        // address: this.nmodel.address? this.nmodel.address : null,
        email: this.nmodel.email? this.nmodel.email : null,
        otherinfo: this.nmodel.otherinfo? this.nmodel.otherinfo : null,
        cnfdonate: this.nmodel.confrmtodonate? this.nmodel.confrmtodonate : null,
        amount: this.nmodel.amount? this.nmodel.amount : null,
        datasubmetby: this.nmodel.submittedby? this.nmodel.submittedby : 'Self',
        agentmobile: this.nmodel.agentmobileno? this.nmodel.agentmobileno : null,
        native: this.nmodel.native? this.nmodel.native : null,
        district: this.nmodel.district? this.nmodel.district : null,
        image: this.nmodel.img? this.nmodel.img : null,
        membertype: this.nmodel.membertype? this.nmodel.membertype : null,
        relationship: this.nmodel.relationship? this.nmodel.relationship : null,
        termsandconditions: this.nmodel.termsandconditions? this.nmodel.termsandconditions : null,
        mobile2: this.nmodel.mobileno2 ? this.nmodel.mobileno2 : 'null',
        
        date: this.DatePipe.transform(new Date(), 'yyyy-MM-dd'),
        // contactnumber: this.model.contactnumber? this.model.contactnumber.toString(): null,
      }
    this.methodname = 'inssubcribers';
    this.service.postData(body, this.methodname).subscribe((data: any) => {
    this.DoData = data.data;
    // console.log(this.DoData,'DoData');
    // $('#viewdetails').modal('hide');


    if(this.detailform==true){
      this.Clear();
    }else{
      this.detailform2=false;
      this.detailform=true;
      this.Clear2();
      this.getrelationList(this.model.mobileno);
    }
      this.MobData = [];
      this.relationList = [];


    });
  }
  Clear(){
    this.model = {};
    this.model2 = {};
    this.nmodel = {};
    this.detailform=false;
    this.disableVerifybtn=false;
    this.disableOtp=false;
    this.disableInput=false;
    this.disableInput2=false;
    this.detailform2=false;
    this.jsondata = undefined;
    this.jsondata2 = undefined;
    
}
Clear2(){
  // this.model = {};
  this.model2 = {};
  this.nmodel = {};
  this.jsondata2 = undefined;
  this.disableInput2=false;  
  this.disableclear2=true;  
}
  add_disable(attr: any) {

      let arr = ['mobileno', 'name', 'surname', 'native','dob'];
      for (let i of arr) {
      if (attr[i] == null || attr[i] == undefined) {

        return true;
      }
    }

    return false;
  }
  keynumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  addMember(){
    this.detailform=false;
    this.jsondata2 = undefined;
    this.detailform2=true;
    this.disableInput2=false;
    this.disableclear2=true;
  }
  Editrelation(Data: any){
    // this.addMember();
    
    this.detailform=false;
    this.jsondata2 = undefined;
    this.detailform2=true;
    this.disableInput2=true;
    this.disableclear2=false;
    if(Data){
      this.model2.id = Data.id;
      this.model2.name = Data.Name;
      this.model2.surname = Data.Surname;
      this.model2.relationship = Data.relationship;
      this.model2.membertype = Data.membertype;
      
      this.model2.nickname = Data.nickname;
    // this.model2.dob = Data.dob;
      this.model2.dob = new Date(Data.dob).toISOString().split('T')[0];
      this.model2.age = Data.age;
      this.model2.bloodgroup = Data.bloodgroup;
      this.model2.address1 = Data.Address1;
      this.model2.address2 = Data.Address2;
      this.model2.area = Data.area;
      this.model2.city = Data.city;
      this.model2.state = Data.state;
      this.model2.pincode = Data.pincode;
      this.model2.email = Data.Email;
      this.model2.otherinfo = Data.Otherinfo;
      this.model2.native = Data.native;
      this.model2.district = Data.district;
      this.model2.gotram = Data.gotra;
      this.model2.mobileno2 = Data.Mobile;
      // this.model2.mobileno2 = this.model.mobileno;
      // this.model2.confrmtodonate = Data.Cnfdonate;
      // this.model2.amount = Data.Amount;
      this.model2.submittedby = Data.Datasubmetby;
      this.model2.agentmobileno = Data.Agentmobile;
      this.jsondata2 = Data.image;
    }
  }
  gobacktoform(){
    this.model2 = {};
    this.nmodel = {};
    this.detailform2 = false;
    this.detailform = true;
    
  }

  ///
  uploadStockfile: any;
  file: File | any;
    imagedata: any;
    response: any;
    stockurl: any;
    lasturl: any;
  jsondata: any
  jsondata2: any
  attrexcelUpload(evt: any): void {
  
    this.uploadStockfile = evt.target.files[0].name;
    console.log(evt.target.files[0].name,'fname')
    console.log(evt.target,'ftarget')
    this.onFileChange(evt.target, 'doc2');
  };
  onFileChange(evt: any, data:any) {
  
    /* wire up file reader */
    // const file: File = evt.files[0];

    // const reader: FileReader = new FileReader();
    this.file = evt.files[0]
    var reader = new FileReader();
    reader.onload = (e: any) => {
      if (data == "doc2") {
        this.stockurl = "https://img.icons8.com/color/50/000000/ms-excel.png";
      }     
      if (data == "doc2") {

        if(this.detailform==true){
          this.jsondata = e.target.result
          console.log("json1", this.jsondata);
        }else{
          this.jsondata2 = e.target.result
          console.log("json2", this.jsondata2);
        }

        // this.uploaddata3()
      }
    };

    reader.readAsDataURL(this.file);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  uploaddata3() {
    this.methodname = "FileUploadView/";
    this.imagedata = { "image": this.jsondata, "userid": '1234', "processes": "import" }
    this.service.postData(this.imagedata, this.methodname).subscribe((data) => {
      this.response = data;
      // this.headerdata.doc2 = this.response.image
    })
  }

}







// mobileno
// otp
// name
// surname
// nickname
// dob
// address1
// address2
// area
// city
// state
// pincode
// email
// otherinfo
// confrmtodonate
// amount
// submittedby
// agentmobileno

