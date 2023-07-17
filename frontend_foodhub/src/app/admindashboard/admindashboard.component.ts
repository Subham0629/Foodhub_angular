
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  dishId: number = 123; // Replace with the actual dish ID
  menuData: any[] = [];
  orderData: any[] = [];
  orders: any[]=[];
  showMenuTable: boolean = false;
  showAddDishForm: boolean = false;
  showOrderTable: boolean = false;
  newDish: { dish_name: string, price: number, availability: boolean } = {
    dish_name: '',
    price: 0,
    availability: true
  };
  constructor(private http: HttpClient) {}
  

  calculateAverageRating(ratings: number[]): number {
    if (ratings.length > 0) {
      const sum = ratings.reduce((acc, rating) => acc + rating, 0);
      return sum / ratings.length;
    } else {
      return 0;
    }
  }

  cancelAddDish(): void {
    this.showAddDishForm = false;
    this.resetNewDishForm();
  }
  
  resetNewDishForm(): void {
    this.newDish = {
      dish_name: '',
      price: 0,
      availability: true
    };
  }

  getMenu(): void {
    this.http.get('https://foodhub-btuo.onrender.com/menu').subscribe((response) => {
      this.menuData = response as any[];
      this.showMenuTable = true;
      this.showAddDishForm = false;
      this.showOrderTable=false
    });
  }

  addDish(): void {
    this.http.post('https://foodhub-btuo.onrender.com/add_dish', this.newDish).subscribe(() => {
      // Success message or other handling
      this.getMenu(); // Refresh the menu after adding the dish
      this.cancelAddDish(); // Reset the form
      this.showOrderTable=false
    });
  }

  reviewOrders(): void {  
    this.http.get('https://foodhub-btuo.onrender.com/menu').subscribe((response) => {
      this.orderData = response as any[];
      this.showOrderTable=true
      this.showMenuTable=false
      this.showAddDishForm=false
    });
    this.http.get('https://foodhub-btuo.onrender.com/review_orders').subscribe((response) => {
      this.orders = response as any[];
    });
  }

  getDishName(dishId: number): string {
    const dish = this.orderData.find((dish: any) => dish.dish_id === dishId);
    return dish ? dish.dish_name : '';
  }


  removeDish(dishId: number): void {
    if (confirm('Are you sure you want to delete this dish?')) {
      this.http.delete(`https://foodhub-btuo.onrender.com/remove_dish/${dishId}`).subscribe(() => {
        alert("Dish Deleted")
        this.getMenu(); 
      });
    }
  }

  updateAvailability(dishId: number): void {
    const dish = this.menuData.find(d => d.dish_id === dishId);
    if (dish) {
      const newAvailability = !dish.availability; 
      this.http.patch(`https://foodhub-btuo.onrender.com/update_availability/${dishId}`, { availability: newAvailability }).subscribe(() => {
        dish.availability = newAvailability; 
        this.getMenu(); 
      });
  }

}
updateOrderStatus(order: any): void {
  const endpoint = `https://foodhub-btuo.onrender.com/update_order_status/${order.order_id}`;
  this.http.patch(endpoint, { status: order.status }).subscribe(() => {
   console.log("object")
  });
}

}