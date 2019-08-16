import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './pages/component/nav/nav.component';
import { LoginDashboardComponent } from './pages/container/login-dashboard/login-dashboard.component';
import { LoginComponent } from './pages/component/login/login.component';
import { RegisterComponent } from './pages/component/register/register.component';
import { AppCustomPreloader } from './custom.strategy';

const routes: Routes = [
  { path: '', redirectTo: '/login-dashboard',  pathMatch: 'full' },
  { path: 'login-dashboard', component: LoginDashboardComponent },
  { path: 'nav', component: NavComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  {
    path: 'student',
    loadChildren: './student/student.module#StudentModule',
    data: { preload: true }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: AppCustomPreloader })],
  exports: [RouterModule],
  providers: [AppCustomPreloader]
})
export class AppRoutingModule { }
