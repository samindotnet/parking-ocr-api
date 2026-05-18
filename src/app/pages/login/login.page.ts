import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule} from '@ionic/angular'; 
import { AuthService } from 'src/app/auth-service';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  isCheckingAuth = true
  email = ''
  password = ''
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async login() {
    try{
      await this.authService.login(this.email, this.password)
      this.router.navigate(['/home'])
    } catch(error:any){
      alert(error.message)
    }
  }

  ngOnInit() {
  }

  async goToRegister() {
    this.router.navigate(['/register'])
  }

}
