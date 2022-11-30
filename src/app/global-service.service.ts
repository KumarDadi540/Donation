import { Injectable } from '@angular/core';
// import { Http, RequestOptions, Headers } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import "rxjs/add/operator/map";
// import { BehaviorSubject } from "rxjs/Rx";

@Injectable({
  providedIn: 'root',
})
export class GlobalServiceService {
  options: any;
  response: any;
  sessionState: any;
  token: any;
  // resources = new BehaviorSubject<any>([]);
  // getresource = this.resources.asObservable();
  constructor(public http: HttpClient) {
    this.sessionState = localStorage.getItem('sessionState');
    // window.localStorage.clear();
  }

  // createauthorizationheaders(headers:Headers){
  //   this.token = localStorage.getItem('token');

  //   // const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append( 'Web','P0W3RTEX@123#');

  //     headers.append( 'Authorization',this.token);

  //   this.options = new RequestOptions({ headers: headers });

  // }

  // apiUrl = "http://192.168.20.132:8000/get/";
  // posturl = "http://192.168.20.132:8000/";
  // imageurl = "http://192.168.20.132:8000";

  // live
  apiUrl = '  http://183.82.121.112/get/';
  posturl = ' http://183.82.121.112/';
  imageurl = ' http://183.82.121.112';

  //Post Data With Only Method
  postdataonlywithmethod(methodName: any) {
    return this.http.post(this.posturl + methodName + '/', this.makeHeaders());
  }
  // POST Method
  postData(body: any, methodName: any) {
    return this.http.post(this.posturl + methodName, body, this.makeHeaders());
  }
  postData1(methodName: any, param1: any) {
    return this.http.post(
      this.posturl + methodName + '/' + '?param_other1=' + param1,
      this.makeHeaders()
    );
  }

  // GET Method
  getMethodData(methodName: any) {
    return this.http.get(this.posturl + methodName, this.options);
  }
  getDatawithQuery(methodName: any, param: any) {
    return this.http.get(
      this.posturl + methodName + '?num=' + param,
      this.options
    );
  }

  getcheckdata(methodName: any, param: any) {
    return this.http.get(
      this.posturl + methodName + '?param_other1=' + param,
      this.options
    );
  }
  // GET Method Start
  getData(methodName: any) {
    return this.http.get(this.apiUrl + '/' + methodName + '/', this.options);
  }
  getData3(methodName: any) {
    return this.http.get(this.posturl + methodName + '/', this.options);
  }

  getDataOnlyWithMethod(methodName: any) {
    return this.http.get(this.posturl + methodName, this.makeHeaders());
  }
  getData1(body: any, methodName: any) {
    return this.http.get(
      this.posturl + methodName + '?user_id=' + body,
      this.options
    );
  }
  getDatawithMethodParams1(methodName: any, param1: any) {
    return this.http.get(
      this.posturl + methodName + '?param_other1=' + param1,
      this.makeHeaders()
    );
  }
  getDatawithMethodParam2(methodName: any, param2: any) {
    return this.http.get(
      this.posturl + methodName + '?param_other2=' + param2,
      this.options
    );
  }
  getDatawithMethod1(methodName: any) {
    return this.http.get(this.posturl + methodName, this.options);
  }
  getDatawithMethodParam1(methodName: any, param1: any) {
    return this.http.get(
      this.posturl + methodName + '?param_other2=' + param1,
      this.options
    );
  }
  getDatawithMethodParam7(
    methodName: any,
    param1: any,
    param2: any,
    param3: any,
    param4: any,
    param5: any,
    param6: any,
    param7: any,
  ) {
    return this.http.get(
      this.posturl +
        methodName +
        '?param_other1=' +
        param1 +
        '&param_other2=' +
        param2 +
        '&param_other3=' +
        param3 +
        '&param_other4=' +
        param4 +
        '&param_other5=' +
        param5 +
        '&param_other6=' +
        param6 +
        '&param_other7=' +
        param7,
      this.options
    );
  }
  getDatawithMethodParams2(methodName: any, param1: any, param2: any) {
    return this.http.get(
      this.posturl +
        methodName +
        '?param_other1=' +
        param1 +
        '&param_other2=' +
        param2,
      this.options
    );
  }
  makeHeaders() {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return headers;
  }
  check_user() {
    // return JSON.parse(localStorage.getItem("loginUserData"));
    return JSON.parse(localStorage.getItem('loginUserData') || 'any');
  }
}
