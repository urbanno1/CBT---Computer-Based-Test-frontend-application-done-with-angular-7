import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, takeUntil } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../../provider/login.service';
import { SuiModalService, ModalSize } from 'ng2-semantic-ui';
import { LoginModal } from 'src/app/shared/login-modal';
import { Router } from '@angular/router';

export interface Food {
  value: string;
  viewValue: string;
}

export interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  @Output() loginForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  hide = true
  pending: boolean;
  error: string | null;
  registerForm: FormGroup;
  modalTitle: string
  modalColor: string;
  modalMessage: string;
  categoryList: any[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private breakpointObserver: BreakpointObserver,
    private loginService: LoginService,
    private fb: FormBuilder,
    private route: Router,
    private modalService: SuiModalService) { }
  gender: Gender[] = [
    { value: 'Male', viewValue: 'Male' },
    { value: 'Female', viewValue: 'Female' },
  ];

  activateLoginForm() {
    this.loginForm.emit(false);
  }

  loginMessage() {
    this.modalService
      .open(new LoginModal(this.modalTitle, this.modalMessage, this.modalColor, ModalSize.Tiny))
      .onApprove(() => {
        this.activateLoginForm()
      })
      .onDeny(() => { });
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      otherNames: [''],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required],
      examCategoryId: ['', Validators.required],
    })

    this.getCategoryList();
  }

  Register() {
    this.error = null;
    if (this.registerForm.valid) {
      this.pending = true;
      this.loginService.registerUser({ body: this.registerForm.value }).pipe(
        takeUntil(this.unsubscribe$))
        .subscribe((res: any) => {
          this.registerForm.reset();
          this.pending = false;
          this.modalTitle = "Registration Successful!"
          this.modalMessage = res.success;
          this.modalColor = "";
          this.loginMessage();
        },
          error => {
            this.pending = false;
            this.error = error != null ? error.error.error[0].description : null;
            this.modalMessage = error != null ? error.error.error[0].description : null;
            this.modalTitle = "Registration Error!"
            this.modalColor = "red";
            this.loginMessage();
          });
    } else {
      this.pending = false;
    }
  }

  getCategoryList() {
    this.error = null;
    this.loginService.getCategoryList().pipe(
      takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.categoryList = res;
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
