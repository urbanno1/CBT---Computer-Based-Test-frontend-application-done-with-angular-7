import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared/service/shared-service.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string;
  headerReq;
  constructor(private sharedService: SharedService,
    private _http: HttpClient) 
     {
    this.baseUrl = this.sharedService.baseUrl;
    this.headerReq = this.sharedService.headersContentType
  }
  
  authenticateUser(payload) {
    return this._http.post(this.baseUrl + '/Auth/login', payload.body, {headers: new this.headerReq});
  }

  registerUser(payload) {
    return this._http.post(this.baseUrl + '/Auth/register', payload.body, {headers: new this.headerReq});
  }

  getToggledSetting(params) {
    return this._http.get(this.baseUrl + '/Auth/GetToggleSetting/' + `${params.settingLookUp}`, {headers: new this.headerReq});
  }

  getCategoryList() {
    return this._http.get<any>(this.baseUrl + '/Auth/GetCategoryList', {headers: new this.headerReq});
  }
  

}
