import { Injectable, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SharedService } from '../../service/shared-service.service';

@Injectable({
  providedIn: 'root'
})
export class GenericProfileService implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  constructor(private sharedService: SharedService, ) { }

  user: any;
  roles: any;
  error: string;
  pending: boolean;

  getGenericProfile() {
    this.pending = true;
    this.sharedService.getProfile().pipe(
      takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        this.user = res;
        this.roles = localStorage.getItem('roles');
        this.pending = false;
      },
        error => {
          this.pending = false;
          this.error = error;
        })
  }

  ngOnDestroy() {
    // unsubscribe all subsciptons
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
