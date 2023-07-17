import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
interface SignupResponse {
  message: string;
  // Add any other properties returned by the backend
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  showSignupForm: boolean = true;
  signupEmail: string = '';
  signupPassword: string = '';
  loginEmail: string = '';
  loginPassword: string = '';

  constructor(private http: HttpClient,private router: Router) {}

  

  toggleForm(): void {
    this.showSignupForm = !this.showSignupForm;
    this.clearFields();
  }

  signup(): void {
    const userData = {
      email: this.signupEmail,
      password: this.signupPassword
    };

    this.http.post<SignupResponse>('https://foodhub-btuo.onrender.com/signup', userData).subscribe(response => {
      
      if (response.message === 'User signup successful!') {
        // Signup success
        alert('Signup successful');
        
        // Reset form fields
        this.clearFields();
      } else {
        // Signup failed
        alert(`${response.message}`);
        this.clearFields();
      }
    });

  }

  login(): void {
    const userData = {
      email: this.loginEmail,
      password: this.loginPassword
    };
  
    this.http.post<any>('https://foodhub-btuo.onrender.com/login', userData).subscribe(response => {
      console.log(response)
      // Handle the response from the backend
      if (response.message=='Login successful!') {
        // Login successful
        alert('Login successful');
        // Reset form fields
        localStorage.setItem('customer_email', this.loginEmail);
        this.clearFields();
        this.router.navigateByUrl('/user-dashboard');
        // Save the authentication token or perform any other actions
      } else {
        // Login failed
        alert(`${response.message}`);
      }
      
    });
    
  }

  clearFields(): void {
    this.signupEmail = '';
    this.signupPassword = '';
    this.loginEmail = '';
    this.loginPassword = '';
  }
}
