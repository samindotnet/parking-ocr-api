import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle-service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './add-vehicle.page.html',
  styleUrls: ['./add-vehicle.page.scss'],
})
export class AddVehiclePage {

  vehicle = {
    make: '',
    model: '',
    year: '',
    classification: '',
    licensePlate: '',
    state: ''
  };

  vehicleData: any = {
    Toyota: ['Corolla', 'Camry', 'RAV4', 'Highlander'],
    Honda: ['Civic', 'Accord', 'CR-V', 'Pilot'],
    Ford: ['F-150', 'Escape', 'Explorer', 'Mustang'],
    BMW: ['3 Series', '5 Series', 'X3', 'X5']
  };

  makes: string[] = [];
  models: string[] = [];
  years: number[] = [];

  constructor(private vehicleService: VehicleService, private router: Router) {
    this.makes = Object.keys(this.vehicleData);
    this.generateYears();
  }

  generateYears() {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1990; y--) {
      this.years.push(y);
    }
  }

  states: { name: string; code: string }[] = [
    { name: 'New York', code: 'NY' },
    { name: 'New Jersey', code: 'NJ' },
    { name: 'Connecticut', code: 'CT' },
    { name: 'Pennsylvania', code: 'PA' },
    { name: 'California', code: 'CA' },
    { name: 'Texas', code: 'TX' },
    { name: 'Florida', code: 'FL' }
  ];

  onMakeChange() {
    this.models = this.vehicleData[this.vehicle.make] || [];
    this.vehicle.model = '';
  }

  async saveVehicle() {

    if (!this.vehicle.make ||
      !this.vehicle.model ||
      !this.vehicle.year ||
      !this.vehicle.licensePlate ||
      !this.vehicle.state) {
        alert('Please fill in all required fields.');
        return; // 🔥 THIS WAS MISSING
    }
      
    try {
      await this.vehicleService.addVehicle(this.vehicle);
      alert('Vehicle Saved to Firestore!');
      
      this.vehicle = {
        make: '',
        model: '',
        year: '',
        classification: '',
        licensePlate: '',
        state: ''
      };
  
      this.models = [];
  
    } catch (error) {
      console.error(error);
      alert('Error saving vehicle.');
    }
  }

  async scanPlate() {
    try {
      alert('Scanning plate ...')
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
  
      const imageBlob = await fetch(image.webPath!).then(r => r.blob());
  
      const formData = new FormData();
      formData.append('file', imageBlob, 'plate.jpg');
  
      const response = await fetch('http://localhost:8000/read-plate/', {
        method: 'POST',
        body: formData
      });
  
      const data = await response.json();
      console.log(data)

      if (data.best_plate !== undefined) {

        this.vehicle.licensePlate = data.best_plate || '';
      
        if (data.best_plate) {
          alert(`Detected Plate: ${data.best_plate}`);
        } else {
          alert('OCR completed but no valid plate found.');
        }
      
      } else {
        alert('Unexpected API response.');
      }
  
    } catch (error) {
      console.error('OCR Error:', error);

      alert(JSON.stringify(error));
    }
  }
  onLicensePlateInput(event: any) {
    this.vehicle.licensePlate = event.target.value.toUpperCase();
  }

  goBack(){
    this.router.navigateByUrl('/home',{replaceUrl:true});
  }
}