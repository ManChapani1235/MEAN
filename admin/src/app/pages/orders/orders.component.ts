import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add necessary imports here
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrderComponent implements OnInit {

  orders: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchAllOrders();
  }

  fetchAllOrders(): void {
    this.isLoading = true;
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching orders:', err);
        this.errorMessage = 'Failed to load orders';
        this.isLoading = false;
      }
    });
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleString();
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'text-warning';
      case 'delivered':
        return 'text-success';
      case 'cancelled':
        return 'text-danger';
      default:
        return '';
    }
  }

  updateStatus(orderId: string, newStatus: string): void {
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
      next: (res) => {
        this.fetchAllOrders(); // refresh list
      },
      error: (err) => {
        // console.error('Failed to update status', err);
        // alert('Error updating status');
      }
    });
  }

}
