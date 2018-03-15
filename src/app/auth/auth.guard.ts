import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//         if (localStorage.getItem('currentUser')) {
//             // logged in so return true
//             return true;
//         }
//  
//         // not logged in so redirect to login page with the return url
//         this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
//         return false;
//     }

   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn       // {1}
      .take(1)                               // {2} 
      .map((isLoggedIn: boolean) => {        // {3}
        if (!isLoggedIn){
          this.router.navigate(['/login']);  // {4}
          return false;
        }
        return true;
      });
  }
}