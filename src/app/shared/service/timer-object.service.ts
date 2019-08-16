import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subject, observable, Subscription } from 'rxjs';
import { map} from 'rxjs/operators';

export interface Time {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}


@Injectable({
  providedIn: 'root'
})
export class TimerObjectService implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  id:number;
  
  constructor() {}
  ngOnInit() {
   }

  private createTimerObject(date: Date): Time {
    const now = new Date().getTime();
    const distance = date.getTime() - now;

    let time: Time = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    time.days = time.days == 0 ?  Math.floor(distance / (1000 * 60 * 60 * 24)) : ((time.days * 0) + (Math.floor(distance / (1000 * 60 * 60 * 24))));
    time.hours = time.hours == 0 ?  Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) : ((time.days * 0) + (Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))));;
    time.minutes = time.minutes == 0 ?  Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) : ((time.days * 0) + (Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))));
    time.seconds = time.seconds == 0 ?  Math.floor((distance % (1000 * 60)) / 1000) : ((time.days * 0) + (Math.floor((distance % (1000 * 60)) / 1000)));

    if (time.days <= 0 && time.hours <= 0 && time.minutes <= 0 && time.seconds <= 0) {
      time = null
      return time;
    }
    else
      return time;
  }

  timer(date: Date): Observable<Time> {
    return interval(1000).pipe(
      map(() => 
      this.createTimerObject(date)))
  }

  ngOnDestroy() {
    // unsubscribe all subsciptons
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
