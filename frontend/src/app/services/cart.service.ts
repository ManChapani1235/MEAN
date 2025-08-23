// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];

  constructor() {
    this.loadCart();
  }

  addToCart(item: CartItem): void {
    const existing = this.items.find(i => i._id === item._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    this.saveCart();
  }

  updateQuantity(id: string, quantity: number): void {
    const item = this.items.find(i => i._id === id);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(id);
      }
      this.saveCart();
    }
  }

  removeItem(id: string): void {
    this.items = this.items.filter(i => i._id !== id);
    this.saveCart();
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getSubtotal(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  getTotal(): number {
    return this.getSubtotal() + 2; // assuming fixed delivery fee
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem('cartItems');
  }


  saveCart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  loadCart(): void {
    const stored = localStorage.getItem('cartItems');
    if (stored) {
      this.items = JSON.parse(stored);
    }
  }
}
