import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalServiceService } from '../global-service.service';
import { DatePipe } from '@angular/common';
// import * as XLSX from 'xlsx';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-do-reports',
  templateUrl: './do-reports.component.html',
  styleUrls: ['./do-reports.component.scss']
})
export class DoReportsComponent implements OnInit {
  finalform: any;
  DoData: any = [];
  DoData1: any = [];
  btn: boolean = true;
  methodname: any;
  searchText: any;
  p: any = 1;
  head: any = {};
  Surnames: any = [];
  AreasData: any = [];
  CityData: any = [];
  StateData: any = [];
  sel = {
    mobileno : true, 
    name : true,
    surname : true,
    nickname : true,
    address1 : true,
    address2 : true,
    area : true,
    city : true,
    state : true,
    pincode : true,
    email : true,
    gotra : true,
    native : true,
    district : true,
    bloodgroup : true,
    // amount : true,
    agentmobileno : true,
  };
  @ViewChild('txt1') txt1Input: ElementRef | any;
  @ViewChild('TABLE',{ read: ElementRef }) table: ElementRef | any;
  loginUserData: any;
  constructor(private service: GlobalServiceService,private DatePipe: DatePipe,private route:Router) {}
  model: any = {};
   
  // @ViewChild('TABLE',{ read: ElementRef }) table: ElementRef | undefined;

  ngOnInit(): void {
    this.loginUserData = localStorage.getItem('loginUserData');
    this.getData();
    this.head.fromdate = this.DatePipe.transform(new Date('2022-10-01'), "yyyy-MM-dd");
    this.head.todate = this.DatePipe.transform(new Date(), 'yyyy-MM-dd');
    // this.txt1Input.nativeElement.focus();
    // $('txt1').focus();
    this.getSurnames();
    this.getAreas();
    this.getCity();
    this.getState();
    if(!this.loginUserData){
      this.route.navigateByUrl("DoForm");

    }

  }
  getSurnames(){
    this.service.getMethodData('drop12').subscribe((data: any) => {
      this.Surnames = data;
      // console.log(this.Surnames,'Surnames');
      });
  }
  getAreas(){
    this.service.getMethodData('getarea').subscribe((data: any) => {
      this.AreasData = data.data;
      // console.log(this.AreasData,'AreasData');
      });
  }
  getCity(){
    this.service.getMethodData('getcity').subscribe((data: any) => {
      this.CityData = data.data;
      // console.log(this.CityData,'CityData');
      });
  }
  getState(){
    this.service.getMethodData('getstate').subscribe((data: any) => {
      this.StateData = data.data;
      // console.log(this.StateData,'StateData');
      });
  }

  getData() {
    
    this.DoData = [];
    this.model = {};

    let fromtime=' 00:00:00';
    let totime=' 23:59:59';
    let fromdate, todate;
    if (this.head.fromdate && this.head.todate) {
      fromdate = this.DatePipe.transform(this.head.fromdate, 'yyyy-MM-dd') + fromtime;
      todate = this.DatePipe.transform(this.head.todate, 'yyyy-MM-dd') + totime;
    } else {
      fromdate = this.DatePipe.transform(new Date('2022-10-01'), "yyyy-MM-dd") + fromtime;
      todate = this.DatePipe.transform(new Date(), "yyyy-MM-dd") + totime;
    }

    // let fromdate = this.DatePipe.transform(this.head.fromdate, 'yyyy-MM-dd');
    // let todate = this.DatePipe.transform(this.head.todate, 'yyyy-MM-dd');
    this.btn = true;
    this.methodname = 'getreport';
    this.service.getDatawithMethodParam7(this.methodname,fromdate,todate,
      this.head.area?this.head.area:'',
      this.head.city?this.head.city:'',
      this.head.state?this.head.state:'',
      this.head.surname?this.head.surname:'',
      this.head.nickname?this.head.nickname:'',
      ).subscribe((data: any) => {
        this.DoData = data.data;
      });
    // console.log(this.DoData,'DoData')
  }
  removerow(i: any, data: any) {
    // this.DoData1 = [];
    // let obj;
    // this.DoData1.push(
    //   (obj = {
    //     companycode: data.companycode,
    //   })
    // );
    // this.service
    //   .postData(this.DoData1, 'companydel')
    //   .subscribe((data: any) => {
    //     // this.DoData = data.data;
    //     this.DoData.splice(i, 1);
    //   });
  }
  companycode: any;
  Editrow(data: any) {
    // model
    // this.btn = false;
    // this.model = data;
    // this.companycode = data.companycode;
    // this.txt1Input.nativeElement.focus();
    // console.log(data, 'data');
  }
  selectCheckBox(event:any,id:any) {
    // console.log(this.model.selected,'1');
    if (event.target.checked == true) {
    }
    else {
    }
  }
  // EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // EXCEL_EXTENSION = '.xlsx';
  // ExportTo(data:any) {

  //   var excelFileName = "Report";
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  //   console.log('worksheet', worksheet);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }
  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], {
  //     type: this.EXCEL_TYPE
  //   });
  //   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
  // };



  ExportTo()
  {
    console.log("export");
    // this.table.nativeElement.style.background = "grey";
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb,'SheetJS.xlsx');
    console.log("exported");

  }

  // ExportTo(){

  // }
  printreport() {
    let popupWinindow: any;
    let innerContents = document.getElementById('printSectionId')?.innerHTML;
    popupWinindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWinindow.document.open();
    
  // <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet">
  // <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>
  popupWinindow.document.write(`<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet"  href="styles.scss" />

      <style>
      #printsuppndng{
        width: 100% !important;
        margin:0 !important;
      }
      body{
        width: 100% !important;
      }
      table thead th,table tbody td{
        font-size: 9px !important;
      }
      table, th, td, tr{
        border: 1px solid #DDDDDD !important;
        border-collapse: collapse !important;
      }
      .busname {
        display: contents;
        text-align: center !important;
      }
      // @page { size: landscape; }
      p{margin:0px;font-size: 12px;}
      table thead th {background: gray;color:white;}
        #printPageButton,.page {
          display: none !important;
        }
      
      
      .printTable tbody tr td{
        font-size: 11px;
    }
      }
      </style>
      </head>
      <body class="container"  onload="window.print()">` + innerContents + '</html>');
    popupWinindow.document.close();
  }


}


// Address1: "hyd1"
// Address2: "hyd2"
// Agentmobile: "1234567890"
// Amount: "1000"
// Cnfdonate: "Yes"
// district: "Yes"
// Datasubmetby: "Agent"
// Email: "kum@gmail.com"
// Mobile: "7702954013"
// Name: "Kumar"
// Otherinfo: "info"
// nullSurname: "D"
// area: "hyda"
// city: "hydc"
// date: "2022-11-09T16:09:16"
// id: 38
// nickname: "kum"
// pincode: "500044"
// state: "ts"