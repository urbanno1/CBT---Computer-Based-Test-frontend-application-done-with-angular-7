import { NgModule } from '@angular/core';
import {
  MatToolbarModule, MatFormFieldModule, MatInputModule, MatButtonModule,
  MatSidenavModule, MatIconModule, MatListModule, MatGridListModule,
  MatCardModule, MatMenuModule, MatProgressSpinnerModule, MatDialogModule, MatTooltipModule, MatDividerModule, MatRadioModule, MatSelectModule, MatCheckboxModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SuiModule} from 'ng2-semantic-ui';
import { LoginModalComponent } from './login-modal';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ForbiddenComponent } from './component/forbidden/forbidden.component';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  imports: [
    
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatDividerModule,
    SuiModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    
    LayoutModule,    
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    
    SuiModule, 
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDividerModule,
    MatTooltipModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,

    ReactiveFormsModule,
    LayoutModule,
    FormsModule,
    CommonModule,

    SuiModule, 
  ],
  declarations: [
    LoginModalComponent,
    ForbiddenComponent,
  ],
  entryComponents: [
    LoginModalComponent
  ],
})

export class SharedModule {
  
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
      //   {
      //     provide: HTTP_INTERCEPTORS,
      //     useClass: AuthInterceptor,
      //     multi: true
      // }
      ],
    };
  }
  
}