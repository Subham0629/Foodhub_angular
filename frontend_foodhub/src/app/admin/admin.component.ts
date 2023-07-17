import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login(): void {
    if (this.email === 'admin@gmail.com' && this.password === 'admin') {
      alert('Login Successfull');
      this.setLoggedInStatus(true);
      this.router.navigate(['/admindashboard']);
    } else {
      this.setLoggedInStatus(false);
      alert('Invalid credentials');
    }
  }

  private setLoggedInStatus(isLoggedIn: boolean): void {
    if (isLoggedIn) {
      localStorage.setItem('adminToken', 'admin');
    } else {
      localStorage.removeItem('adminToken');
    }
  }
}
