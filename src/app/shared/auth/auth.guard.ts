import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SharedService } from '../service/shared-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private sharedService: SharedService,
    private route: Router){}
    
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
      if (localStorage.getItem('token') != null) {
        let roles = next.data['roles'] as Array<string>;
        if (roles) {
          var match = this.sharedService.roleMatch(roles);
          if (match)
            return true;
          else {
            this.route.navigate(['/forbidden']);
            return false;
          }
        }
        else
          return true;
      }
      this.route.navigate(['/login-dashboard'])
      return false;
    }
}
