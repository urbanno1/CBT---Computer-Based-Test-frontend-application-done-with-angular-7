import { DashboardComponent } from './container/dashboard/dashboard.component';
import { StudentComponent } from './student.component';
import { MenuComponent } from './component/menu/menu.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { ExamMenuComponent } from './component/exam-menu/exam-menu.component';
import { InstructionComponent } from './container/instruction/instruction.component';
import { AssessmentComponent } from './container/assessment/assessment.component';
import { ResultComponent } from './container/result/result.component';

export function students()
{
    return [
        DashboardComponent,
        StudentComponent,
        MenuComponent,
        SideNavComponent,
        ExamMenuComponent,
        InstructionComponent,
        AssessmentComponent,
        ResultComponent,
    ]
}
