import { Injectable } from '@angular/core';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';

@Injectable({
  providedIn: 'root'
})
export class ParkingSessionService {

  fixedPrice = 15;

  async startSession(vehicle: any) {
    const user = getAuth().currentUser;

    if (!user) {
      throw new Error('User not authenticated');
    }

    return await addDoc(collection(db, 'parking_sessions'), {
      userId: user.uid,
      vehicleId: vehicle.id,
      vehicleLabel: `${vehicle.make} ${vehicle.model} - ${vehicle.licensePlate}`,
      startTime: new Date(),
      endTime: null,
      status: 'active',
      price: this.fixedPrice
    });
  }
}