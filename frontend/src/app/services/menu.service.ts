// // src/app/services/menu.service.ts
// import { Injectable } from '@angular/core';
// import { MenuItem, Menu_List } from '../data/menu-list';

// @Injectable({
//   providedIn: 'root',
// })
// export class MenuService {
//   private cart: { item: MenuItem; quantity: number }[] = [];
//   private wishlist: MenuItem[] = [];

//   getMenu(): MenuItem[] {
//     return Menu_List;
//   }

//   getCart(): { item: MenuItem; quantity: number }[] {
//     return this.cart;
//   }

//   getWishlist(): MenuItem[] {
//     return this.wishlist;
//   }

//   getItemQuantity(itemId: string): number {
//     const found = this.cart.find(c => c.item.id === itemId);
//     return found ? found.quantity : 0;
//   }

//   incrementCart(item: MenuItem): void {
//     const found = this.cart.find(c => c.item.id === item.id);
//     if (found) {
//       found.quantity += 1;
//     } else {
//       this.cart.push({ item, quantity: 1 });
//     }
//   }

//   decrementCart(itemId: string): void {
//     const foundIndex = this.cart.findIndex(c => c.item.id === itemId);
//     if (foundIndex > -1) {
//       if (this.cart[foundIndex].quantity > 1) {
//         this.cart[foundIndex].quantity -= 1;
//       } else {
//         this.cart.splice(foundIndex, 1); // remove from cart if quantity is 0
//       }
//     }
//   }

//   isInWishlist(itemId: string): boolean {
//     return this.wishlist.some(item => item.id === itemId);
//   }

//   toggleWishlist(item: MenuItem): void {
//     if (this.isInWishlist(item.id)) {
//       this.wishlist = this.wishlist.filter(i => i.id !== item.id);
//     } else {
//       this.wishlist.push(item);
//     }
//   }
// }
