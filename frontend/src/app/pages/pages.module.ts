// src/app/pages/pages.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { ContactComponent } from './contact/contact.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    MenuComponent,
    CartComponent,
    OrderComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    FormsModule
  ],
  exports: [
    HomeComponent,
    AboutComponent,
    MenuComponent,
    CartComponent,
    OrderComponent
  ]
})
export class PagesModule {}
