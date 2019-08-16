import { Component, OnInit, OnDestroy} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenericProfileService } from '../shared/component/generic-profile/generic-profile.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  constructor(private breakpointObserver: BreakpointObserver,
    private _genericProfile: GenericProfileService) {}

ngOnInit() {
    this._genericProfile.getGenericProfile();
}

get user(): any {
  return this._genericProfile.user;
}
set user(value: any) {
  this._genericProfile.user = value;
}

get pending(): any {
  return this._genericProfile.pending;
}
set pending(value: any) {
  this._genericProfile.pending = value;
}

  ngOnDestroy() {
    // unsubscribe all subsciptons
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
