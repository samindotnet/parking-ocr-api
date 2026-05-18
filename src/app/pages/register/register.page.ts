import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from  'src/app/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './register.page.html',
})
export class RegisterPage {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      alert('Account created!');
      this.router.navigate(['/']);
    } catch (error: any) {
      alert(error.message);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}