import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VehicleService } from 'src/app/services/vehicle-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VehiclesPage implements OnInit, OnDestroy {

  vehicles: any[] = [];
  subscription: any;

  constructor(
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.vehicleService.getVehicles().subscribe((data) => {
      this.vehicles = data;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  goBack(){
    this.router.navigateByUrl('/home',{replaceUrl:true});
  }

  async deleteVehicle(id: string) {
    const confirmDelete = confirm('Delete this vehicle?');

    if (!confirmDelete) return;

    try {
      await this.vehicleService.deleteVehicle(id);
    } catch (error) {
      console.error(error);
      alert('Error deleting vehicle');
    }
  }
}