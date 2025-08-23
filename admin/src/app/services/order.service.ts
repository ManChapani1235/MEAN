import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:4000/api/order';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-status/${orderId}`, { status });
  }
}
