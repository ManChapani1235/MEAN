import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  promoCode: string = '';

  constructor(private cartService: CartService, private router: Router) {}


  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
  }

  removeItem(id: string) {
    this.cartService.removeItem(id);
    this.cartItems = this.cartService.getItems();
  }

  getSubtotal(): number {
    return this.cartService.getSubtotal();
  }

  getTotal(): number {
    const subtotal = this.getSubtotal();
    const deliveryFee = 2;
    return subtotal + deliveryFee;
  }

  // ✅ Add this method to fix the error
  submitOrder() {
    this.router.navigate(['/order']);
  }

  getImageUrl(image: string): string {
    return `http://localhost:4000/images/${image}`;
  }

  
}
