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
export class PasswordsProviderService {
  passwords: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "https://passwords-server-ericholsen.herokuapp.com"

  constructor(public http: HttpClient) {
    console.log('Hello PasswordsProvider Service');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
   }

  getPasswords(): Observable<object[]> {
    return <Observable<object[]>>this.http.get(this.baseURL + '/api/passwords').pipe(
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


  removePassword(password) {
    console.log("#### Remove password - id=",password._id);
    this.http.delete(this.baseURL + "/api/passwords/"+password._id).subscribe(res =>{
      this.passwords=res;
      this.dataChangeSubject.next(true);
    });
  }




  addPassword(password) {
    this.http.post(this.baseURL +"/api/passwords", password).subscribe(res=> {
      this.passwords=res;
      this.dataChangeSubject.next(true);
    });
    
  }

  editPassword(password, index) {
    console.log("Editing password=", password, index);
    this.http.put(this.baseURL+"/api/passwords/" +index,password).subscribe(res => {
      this.passwords= <any> res;
      this.dataChangeSubject.next(true);
    });
  }

}