import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Time } from '@angular/common';
import { Observable, timer, of, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-exam-menu',
  templateUrl: './exam-menu.component.html',
  styleUrls: ['./exam-menu.component.scss']
})
export class ExamMenuComponent implements OnInit, OnDestroy {
  @Input() time1$: Observable<Time>;
  @Input() firstTitle: any;
  @Input() secondTitle: any;
  @Input() currentPage: any;
  @Input() totalPage: any;
  @Output() timedEnded = new EventEmitter();
  private unsubscribe$: Subject<void> = new Subject<void>();

  assignment: any = "English";
  constructor() { 
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe all subsciptons
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
