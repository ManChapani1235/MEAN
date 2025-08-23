import { Routes } from '@angular/router';
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';
import { OrderComponent } from './pages/orders/orders.component';

export const routes: Routes = [
  { path: 'admin/add', component: AddComponent },
  { path: 'admin/list', component: ListComponent },
  {
    path: 'admin/orders',
    component: OrderComponent
  }
  // other routes
];
