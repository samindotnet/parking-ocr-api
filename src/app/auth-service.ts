import { Injectable } from '@angular/core';
import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
 } from 'firebase/auth';
import { app } from './firebase';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth(app);
  register(email:string, password:string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }  

  login(email:string, password:string){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(){
    return signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  onAuthChange(callback: (user: User | null) => void) {
    onAuthStateChanged(this.auth, callback);
  }
}
