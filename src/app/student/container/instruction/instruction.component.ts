import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TimerObjectService, Time } from 'src/app/shared/service/timer-object.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { StudentService } from '../../provider/student.service';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss']
})
export class InstructionComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  currentDate = new Date();
  error: string | null;
  time1$: Observable<Time>;
  examQuestions: any[] = [];
  examTopicArray: any[];

  timeObject: any;
  examTopics: any;
  instruction: any;
  instructionModel: any;

  instructionTimeSuccess: boolean;
  isTimeOff: boolean;


  constructor(
    private timerService: TimerObjectService,
    private route: Router,
    private studentService: StudentService) {
    this.getExamQuestionModels("Instruction");
  }

  ngOnInit() {
  }

  getExamQuestionModels(timeLookUp: any) {
    this.error = null;
    this.instructionTimeSuccess = true;
    this.studentService.getExamQuestionModels({ timeLookUp: timeLookUp }).pipe(
      takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        this.ExamInstruction(res.instructionViewModel);

        this.timeObject = res.timeViewModel;

        let currentday = 0;
        let currenthour = 0;
        let currentMinute = 0
        let currentSecond = 0;

        currentday = this.timeObject.instructionDays;
        currenthour = this.timeObject.instructionHours;
        currentMinute = this.timeObject.instructionMins;
        currentSecond = this.timeObject.instructionSeconds > 2 ? (this.timeObject.instructionSeconds + 2) : 2;

        this.currentDate.setDate(this.currentDate.getDate() + currentday);
        this.currentDate.setHours(this.currentDate.getHours() + currenthour);
        this.currentDate.setMinutes(this.currentDate.getMinutes() + currentMinute);
        this.currentDate.setSeconds(this.currentDate.getSeconds() + currentSecond);
  
        this.time1$ = this.time1$ == null ? this.timerService.timer(this.currentDate) : new Observable<Time>();
        this.time1$.pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
          if (result == null) {
            this.logIntoExam()
          }
        })
        this.instructionTimeSuccess = false;
      },
        error => {
          this.instructionTimeSuccess = false;
          this.error = error != null ? error.error.error : "";
        })
  }

  ExamInstruction(instructionViews: any) {
    if (instructionViews != null && instructionViews != undefined) {
      this.instruction = instructionViews
    }
  }


  logIntoExam() {
    this.route.navigateByUrl('student/dashboard');
    this.route.navigate(['student/dashboard']);
  }

  ngOnDestroy() {
    // unsubscribe all subsciptons
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
