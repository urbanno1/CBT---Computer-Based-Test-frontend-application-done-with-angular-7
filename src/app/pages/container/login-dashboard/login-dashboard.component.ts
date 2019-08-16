import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../provider/login.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrls: ['./login-dashboard.component.scss'],
})
export class LoginDashboardComponent implements OnInit {
  @Output() loginForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() registerForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  private unsubscribe$: Subject<void> = new Subject<void>();

  register = false
  error: string | null;
  isSettingToggled:boolean;
  constructor(private loginService: LoginService) { }


  activateForm(event) {
    if (event) {
      this.register = true;
    }
    else {
      this.register = false;
    }
  }

  activateLoginForm(event) {
    if (event) {
      this.register = true;
    }
    else {
      this.register = false;
    }
  }

  ngOnInit() {
  //this.isRegisterToggled()
  }

  isRegisterToggled() {
    this.error = null;
    this.loginService.getToggledSetting({ body: "Register" }).pipe(
      takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
      console.log(res)
      this.isSettingToggled = res.isSettingToggled
      },
        error => {
          this.error = error.error.error;
        });
  }

}
