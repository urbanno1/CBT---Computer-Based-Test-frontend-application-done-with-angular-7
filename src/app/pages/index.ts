import { LoginDashboardComponent } from './container/login-dashboard/login-dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import { NavComponent } from './component/nav/nav.component';
import { LoginComponent } from './component/login/login.component';

export function pages()
{
 return [
    LoginDashboardComponent,
    RegisterComponent,
    NavComponent,
    LoginComponent,
 ]
}