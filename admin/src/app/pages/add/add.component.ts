import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  product = {
    name: '',
    description: '',
    category: '',
    price: 0
  };
  image: any;
  categories = ['Salad',
'Rolls',
'Deserts',
'Sandwich',
'Cake',
'Pure Veg',
'Pasta',
'Noodles'];
  message = '';

  constructor(private api: ApiService) {}

  handleImage(event: any) {
    this.image = event.target.files[0];
  }

  submit() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('category', this.product.category);
    formData.append('price', this.product.price.toString());
    formData.append('image', this.image);

    this.api.addProduct(formData).subscribe((res: any) => {
      this.message = res.success ? 'Product Added Successfully!' : 'Something went wrong!';
    });
  }
}
