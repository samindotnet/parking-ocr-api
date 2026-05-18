import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then(m => m.RegisterPage),
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(m => m.HomePage),
  },

  {
    path: 'vehicles',   // ✅ THIS WAS MISSING
    loadComponent: () =>
      import('./pages/vehicles/vehicles.page').then(m => m.VehiclesPage),
  },

  {
    path: 'add-vehicle',   // ✅ ALSO NEEDED
    loadComponent: () =>
      import('./pages/add-vehicle/add-vehicle.page').then(m => m.AddVehiclePage),
  },

  {
    path: 'parking-session',   // ✅ ALSO NEEDED
    loadComponent: () =>
      import('./pages/parking-session/parking-session.page').then(m => m.ParkingSessionPage),
  },

  {
    path: '**',
    redirectTo: 'login',
  }

];