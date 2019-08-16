import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { DashboardComponent } from './container/dashboard/dashboard.component';
import { InstructionComponent } from './container/instruction/instruction.component';
import { AssessmentComponent } from './container/assessment/assessment.component';
import { AuthGuard } from '../shared/auth/auth.guard';
import { ResultComponent } from './container/result/result.component';

export const routes = [
  {
    path: '', component: StudentComponent, CanActivate: [AuthGuard], data: { breadcrumb: 'Student' },
    children: [
      { path: '', redirectTo: 'instruction', },
      { path: 'instruction', component: InstructionComponent, data: { breadcrumb: 'Instruction' } },
      { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' } },
      { path: 'assessment', component: AssessmentComponent, data: { breadcrumb: 'Assessment' } },
      { path: 'result', component: ResultComponent, data: { breadcrumb: 'Results' } },
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
