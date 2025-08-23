// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private BASE_URL = 'http://localhost:4000/api/order';

  constructor(private http: HttpClient) {}

  placeOrder(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.BASE_URL}/place`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/all`);
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${orderId}`);
  }
}
