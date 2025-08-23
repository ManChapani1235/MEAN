// src/app/services/api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'http://localhost:4000'; // update if different

  constructor(private http: HttpClient) {}

  addProduct(data: FormData) {
    return this.http.post(`${this.BASE_URL}/api/food/add`, data);
  }

  getProducts() {
    return this.http.get(`${this.BASE_URL}/api/food/list`);
  }

  deleteProduct(id: string) {
    return this.http.post(`${this.BASE_URL}/api/food/remove`, id );
  }
}
