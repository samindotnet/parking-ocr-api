import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle-service';
import { ParkingSessionService } from 'src/app/services/parking-session-service';

@Component({
  selector: 'app-parking-session',
  templateUrl: './parking-session.page.html',
  styleUrls: ['./parking-session.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ParkingSessionPage implements OnInit {

  vehicles: any[] = [];
  selectedVehicleId = '';
  isLoading = false;

  constructor(
    private vehicleService: VehicleService,
    private parkingSessionService: ParkingSessionService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.vehicles = await this.vehicleService.getVehiclesOnce();
    } catch (error) {
      console.error(error);
      alert('Error loading vehicles.');
    }
  }

  get selectedVehicle() {
    return this.vehicles.find(v => v.id === this.selectedVehicleId);
  }

  async startSession() {
    if (!this.selectedVehicleId) {
      alert('Please select a vehicle.');
      return;
    }

    try {
      this.isLoading = true;
      await this.parkingSessionService.startSession(this.selectedVehicle);
      alert('Parking session started.');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error(error);
      alert('Error starting parking session.');
    } finally {
      this.isLoading = false;
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}