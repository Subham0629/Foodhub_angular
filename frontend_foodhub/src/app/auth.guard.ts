import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate(): boolean {
    const isLoggedIn = this.checkAuthentication();

    if (isLoggedIn) {
      this.authService.setLoggedInStatus(true);
      return true;
    } else {
      this.router.navigate(['/admin']);
      this.authService.setLoggedInStatus(false);
      return false;
    }
  }

  private checkAuthentication(): boolean {
    const adminToken = localStorage.getItem('adminToken');
    // Replace the following check with your actual authentication logic
    return adminToken === 'admin';
  }
}
