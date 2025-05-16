import { Routes } from '@angular/router';
import { HelpComponent } from './components/help/help.component'; // Add this import
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'help', component: HelpComponent },
];
