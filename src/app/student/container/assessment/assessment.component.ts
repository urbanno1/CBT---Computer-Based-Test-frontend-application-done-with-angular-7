import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TimerObjectService, Time } from 'src/app/shared/service/timer-object.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  favoriteSeason: string;
  seasons: string[] = ['English', 'Mathematics', 'Chemistry', 'Physics','Biology'];
  selectAll:string = "Select all";
  time1$: Observable<Time>;
  checked:boolean
  
  currentDate = new Date();
  currentday: number = 0;
  currenthour: number = 0;
  currentMinute: number = 3;
  currentSecond: number = 2;

  constructor(private timerService: TimerObjectService,
    private route: Router) { }

  ngOnInit() {
    this.currentDate.setHours(this.currentDate.getHours() + this.currenthour);
    this.currentDate.setMinutes(this.currentDate.getMinutes() + this.currentMinute);
    this.currentDate.setSeconds(this.currentDate.getSeconds() + this.currentSecond);
    this.time1$ = this.timerService.timer(this.currentDate)

    this.time1$.pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result == null) {
        this.route.navigateByUrl('student/instruction');
      }
    })
  }

}
