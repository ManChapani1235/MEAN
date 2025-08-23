import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  // -------------------------------
  // ✅ USER AUTHENTICATION
  // -------------------------------
  register(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/user/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/user/login`, data);
  }

  // -------------------------------
  // ✅ FOOD MANAGEMENT
  // -------------------------------
  getFoodList(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/food/list`);
  }

  addFood(formData: FormData): Observable<any> {
    return this.http.post(`${this.BASE_URL}/food/add`, formData);
  }

  removeFood(foodId: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/food/remove`, { _id: foodId });
  }

  // -------------------------------
  // ✅ CART MANAGEMENT
  // -------------------------------
  getCartItems(userId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/cart/${userId}`);
  }

  addToCart(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/cart`, data);
  }

  removeFromCart(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/cart/${id}`);
  }

  // -------------------------------
  // ✅ ORDER MANAGEMENT
  // -------------------------------
  placeOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/order/place`, orderData);
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/order/list`);
  }
}
