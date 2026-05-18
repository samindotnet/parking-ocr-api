import { Injectable } from '@angular/core';
import { collection, addDoc, onSnapshot, doc, deleteDoc, query, where, getDocs} from 'firebase/firestore';
import { db } from '../firebase';
import { Observable } from 'rxjs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  async getVehiclesOnce() {
    const user = getAuth().currentUser;
  
    if (!user) {
      throw new Error('User not authenticated');
    }
  
    const q = query(
      collection(db, 'vehicles'),
      where('userId', '==', user.uid)
    );
  
    const snapshot = await getDocs(q);
  
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async addVehicle(vehicle: any) {

    const user = getAuth().currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const vehiclesRef = collection(db, 'vehicles');
    return await addDoc(vehiclesRef, {
      ...vehicle,
      userId: user.uid,
      createdAt: new Date()
    });
  }

  getVehicles(): Observable<any[]> {
    return new Observable((observer) => {
  
      const auth = getAuth();
  
      const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
  
        if (!user) {
          observer.next([]);
          return;
        }

        console.log("🔥 USER UID:", user.uid);
  
        const q = query(
          collection(db, 'vehicles'),
          where('userId', '==', user.uid)
        );
  
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
  
          const vehicles = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          console.log("🚗 VEHICLES:", vehicles); // DEBUG

  
          observer.next(vehicles);
        });
  
        // cleanup snapshot
        return () => unsubscribeSnapshot();
      });
  
      // cleanup auth listener
      return () => unsubscribeAuth();
    });
  }

  async deleteVehicle(id: string) {
    const ref = doc(db, 'vehicles', id);
    await deleteDoc(ref);
  }
  
  

}
