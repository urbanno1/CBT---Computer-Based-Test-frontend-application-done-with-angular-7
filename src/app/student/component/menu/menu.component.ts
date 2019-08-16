import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router) { }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login-dashboard"])
  }

  ngOnDestroy() {
    // unsubscribe all subsciptons
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
