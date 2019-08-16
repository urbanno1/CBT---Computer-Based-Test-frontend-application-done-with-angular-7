import { NgModule } from '@angular/core';
import { StudentRoutingModule } from './student-routing.module';
import { students } from './index';
import { studentProviders } from './provider';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    students(),
],
  imports: [
    StudentRoutingModule,
    SharedModule.forRoot(),
  ]
})

export class StudentModule {
  static forRoot() {
    return {
      ngModule: StudentModule,
      providers: [
        studentProviders()
      ]
    };
  }
}