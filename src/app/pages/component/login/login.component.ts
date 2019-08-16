import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../provider/login.service';
import { LoginModal } from 'src/app/shared/login-modal';
import { ModalSize, SuiModalService } from 'ng2-semantic-ui';
import { SharedService } from 'src/app/shared/service/shared-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  @Output() registerForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() IsDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  hide = true
  loginForm: FormGroup;
  pending: boolean;
  error: string | null;
  modalTitle:string;
  modalColor: string;
  modalMessage: string;
  isSettingToggled:boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private loginService: LoginService,
    private sharedService:SharedService,
    private modalService: SuiModalService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    })
    this.isRegisterToggled();
  }

  activateRegisterForm() {
    this.registerForm.emit(true);
  }

  loginMessage() {
    this.modalService
      .open(new LoginModal(this.modalTitle, this.modalMessage, this.modalColor, ModalSize.Tiny))
      .onApprove(() => { })
      .onDeny(() => { });
  }

  Login() {
    this.error = null;
    if (this.loginForm.valid) {
      this.pending = true;
      this.loginService.authenticateUser({ body: this.loginForm.value }).pipe(
        takeUntil(this.unsubscribe$))
        .subscribe((res: any) => {
          localStorage.clear();
          localStorage.setItem('roles', res.roles);
          localStorage.setItem('token', res.token);
          localStorage.setItem('expiration', res.expiration);
          this.sharedService.navigateMatch();
        },
          error => {
            this.pending = false;
            this.error = error != null ? error.error.error : null;
            this.modalTitle = "Login Error!"
            this.modalMessage = error != null ? error.error.error : null;
            this.modalColor = "red";
            this.loginMessage();
          });
    } else {
      this.pending = false;
    }
  }

  isRegisterToggled() {
     this.error = null;
    this.loginService.getToggledSetting({ settingLookUp: "Enroll" }).pipe(
      takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
      this.isSettingToggled = res.isSettingToggled
      },
        error => {
          this.error = error != null ? error.error.error : "";
        });
  }

  ngOnDestroy() {
    // unsubscribe all subsciptons
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
