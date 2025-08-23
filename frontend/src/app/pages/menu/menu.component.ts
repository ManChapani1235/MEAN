import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

interface FoodItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity?: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  foodList: FoodItem[] = [];
  selectedCategory: string = 'All';
  categories: string[] = ['All', 'Salad', 'Rolls', 'Deserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles'];

  constructor(private api: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchFoods();
  }

  fetchFoods(): void {
    this.api.getFoodList().subscribe((res: any) => {
      if (res.success) {
        this.foodList = res.data.map((food: FoodItem) => ({
          ...food,
          quantity: 0
        }));
      }
    });
  }

  get filteredFoodList(): FoodItem[] {
    if (this.selectedCategory === 'All') return this.foodList;
    return this.foodList.filter(food => food.category === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  increment(food: FoodItem): void {
    food.quantity = (food.quantity || 0) + 1;
    this.cartService.addToCart(food as any);
  }

  decrement(food: FoodItem): void {
    if (food.quantity && food.quantity > 0) {
      food.quantity -= 1;
      this.cartService.updateQuantity(food._id, food.quantity);
    }
  }

  getImageUrl(image: string): string {
    return `http://localhost:4000/images/${image}`;
  }

  getCategoryImage(category: string): string {
    const index = this.categories.indexOf(category);
    if (index === -1) return '';
    return `../../../assets/menu_${index}.png`;
  }
}
