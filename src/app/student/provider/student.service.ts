import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared/service/shared-service.service';
import { HttpClient} from "@angular/common/http";
import { Instruction } from '../models/instruction';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl: string;
  constructor(private sharedService: SharedService,
    private _http: HttpClient) { 
      this.baseUrl = this.sharedService.baseUrl;
    }

    // getExamInstruction(params) {
    //   return this._http.get(this.baseUrl + '/Candidate/GetInstructions/' +  `${params.timeLookUp}`)
    // }
    // getExamQuestions(params) {
    //   return this._http.get(this.baseUrl + '/Candidate/GetExamQuestions/' +  `${params.timeLookUp}`)
    // }

    submitExamQuestions(payLoad) {
        return this._http.post(this.baseUrl + '/Candidate/SubmitExamQuestionModel/', payLoad.body)
      }

    getExamQuestionModels(params) {
      return this._http.get(this.baseUrl + '/Candidate/GetExamQuestionModel/' +  `${params.timeLookUp}`)
    }
}
