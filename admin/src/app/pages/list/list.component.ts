// src/app/pages/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  foodList: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getFoodList();
  }

  getFoodList() {
    this.http.get<any>('http://localhost:4000/api/food/list').subscribe({
      next: (res) => {
        if (res.success) {
          this.foodList = res.data;
        } else {
          console.error("Failed to fetch food items");
        }
      },
      error: (err) => {
        console.error("API error", err);
      }
    });
  }

  deleteFood(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.http.post<any>('http://localhost:4000/api/food/remove', { id }).subscribe({
        next: (res) => {
          if (res.success) {
            this.getFoodList(); // Refresh list
            // alert('Food removed successfully');
          } else {
            // alert('Failed to remove food');
          }
        },
        error: () => {
          // alert('Error while deleting food');
        }
      });
    }
  }
}
