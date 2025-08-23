import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private baseUrl = 'http://localhost:4000/api/wishlist';

  constructor(private http: HttpClient) {}

  getWishlist(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  addToWishlist(userId: string, productId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, {
      userId,
      productId,
    });
  }

  removeFromWishlist(userId: string, productId: string): Observable<any> {
    return this.http.request('delete', `${this.baseUrl}/remove`, {
      body: {
        userId,
        productId,
      },
    });
  }
}
