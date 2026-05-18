import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {

  constructor(private router: Router) {}


  goToViewVehicles() {
    this.router.navigate(['/vehicles']);
  }

  goToAddVehicle() {
    this.router.navigate(['/add-vehicle']);
  }

  goToParkingSession() {
    this.router.navigate(['/parking-session']);
  }

  async logout() {
    await signOut(getAuth());
    this.router.navigate(['/login']);
  }
}