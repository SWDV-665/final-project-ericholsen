/**
 * This service is for the data of the passwords page
 */

import { Injectable } from '@angular/core';

/*needed for mongodb*/
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesProviderService {
  devices: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "https://devices-server.herokuapp.com"

  constructor(public http: HttpClient) {
    console.log('Hello DevicesProvider Service');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
   }

  getDevices(): Observable<object[]> {
    return <Observable<object[]>>this.http.get(this.baseURL + '/api/devices').pipe(
      map(this.extractData), catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    console.log(`Response is ::${res}`);
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error;
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return throwError(errMsg);
  }


  removeDevice(device) {
    console.log("#### Remove device - id=",device._id);
    this.http.delete(this.baseURL + "/api/devices/"+device._id).subscribe(res =>{
      this.devices=res;
      this.dataChangeSubject.next(true);
    });
  }




  addDevice(device) {
    this.http.post(this.baseURL +"/api/devices", device).subscribe(res=> {
      this.devices=res;
      this.dataChangeSubject.next(true);
    });
    
  }

  editDevice(device, index) {
    console.log("Editing device=", device, index);
    this.http.put(this.baseURL+"/api/devices/" +index,device).subscribe(res => {
      this.devices= <any> res;
      this.dataChangeSubject.next(true);
    });
  }

}