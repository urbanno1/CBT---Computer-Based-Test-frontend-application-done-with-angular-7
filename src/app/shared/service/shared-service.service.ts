import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private route: Router,
    private _http: HttpClient,) { }

get baseUrl() {
    return environment.API_BASE_URL;
}

getProfile() {
  return this._http.get(this.baseUrl + '/Candidate/GetUserClaims')
}

getToken() {
    return localStorage.getItem('roles');
}

headersContentType() {
  let headerContent = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
  return headerContent;
}

roleMatch(roles) {
    var isMatch = false;
    var allowedUserRoles = roles.split(',');
    var userRoles = localStorage.getItem('roles');
    var splittedRoles = userRoles.split(',')
    allowedUserRoles.forEach(element => {
      splittedRoles.forEach(role => {
        if (element === role) {
          isMatch = true
        }
      });
    });
    return isMatch;
}
  
navigateMatch() {
   var roles = this.getToken();
    var allowedUserRoles =  roles.split(',');
    if (this.roleMatch(roles)) {
      allowedUserRoles.forEach(element => {
        switch (element) {
          case "RegisteredStudent":
          this.route.navigateByUrl('student/assessment');
          break;

          case "Admin":
            this.route.navigateByUrl('/admin');
            break;

          case "UploadedStudent":
            this.route.navigateByUrl('student/instruction');
            break;
        }
      });
    }
  }
}
