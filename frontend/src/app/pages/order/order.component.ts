// src/app/pages/order/order.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  errorMessage: string = '';

  orderData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    this.totalAmount = this.cartService.getTotal();
  }

  proceedToPayment(): void {
    const orderPayload = {
      ...this.orderData,
      items: this.cartItems.map(item => ({
        itemId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      amount: this.totalAmount
    };

    this.orderService.placeOrder(orderPayload).subscribe({
      next: (res) => {
        alert('Order placed successfully!');
        this.cartService.clearCart();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Order Error:', err);
        this.errorMessage = err?.error?.message || 'Something went wrong.';
      }
    });
  }
}
