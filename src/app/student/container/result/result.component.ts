import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  
  examResults:any;
  resultSuccess:boolean;

  constructor(private route: Router) { }

  ngOnInit() {
    this.getExamResults();
  }

  getExamResults()
  {
    this.resultSuccess = true;
    this.examResults = JSON.parse(localStorage.getItem("examResults"));
    if(this.examResults != null &&  this.examResults != undefined)
    {
      this.resultSuccess = false;
    }
  }

  exit()
  {
    localStorage.removeItem("token");
    
    localStorage.removeItem("examTopics");
    localStorage.removeItem("examQuestions");
    localStorage.removeItem("countSubmit");
    localStorage.removeItem("countFlagged");
    localStorage.removeItem("examResults");
    

    this.route.navigate(["/login-dashboard"])
  }

  ngOnDestroy() {
    // unsubscribe all subsciptons
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
