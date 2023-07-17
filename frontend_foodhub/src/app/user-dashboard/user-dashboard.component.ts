import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io } from 'socket.io-client';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  menuData: any[] = [];
  reviewData: any[] = [];
  selectedDishIds: number[] = [];
  customerName: string = '';
  isReviewMode: boolean = false;

  constructor(private http: HttpClient) {}

  


  ngOnInit(): void {
    this.getMenu();
    const socket = io('https://foodhub-btuo.onrender.com'); // Replace with your server URL
  
  socket.on('order_status_updated', (updatedOrder: any) => {
    console.log(updatedOrder)
    this.http.get('https://foodhub-btuo.onrender.com/review_orders').subscribe((response) => {
      const allOrders = response as any[];
      // this.reviewData = response as any[];
      const data=localStorage.getItem('customer_email')
      this.reviewData = allOrders.filter((order) => order.customer_email === data);
      const socketdata=this.reviewData.find((order) => order.order_id === updatedOrder.order_id);
      this.isReviewMode = true;
      if(socketdata){
        alert(`Order Id ${updatedOrder.order_id} status changed to ${updatedOrder.status}`)
      }
      
    });
    // Handle the order status update event
    console.log('Order status updated:', updatedOrder);
    // Perform any necessary actions based on the updated order
  });
  }

  getMenu(): void {
    this.http.get('https://foodhub-btuo.onrender.com/menu').subscribe((response) => {
      const data=response as any[]
      console.log(data)
      this.menuData = data.filter((dish: any) => dish.availability) as any[];
    });
  }

  addToSelectedDishes(dishId: number): void {
    if (this.selectedDishIds.includes(dishId)) {
      // Remove the dish ID from the selected dishes array
      this.selectedDishIds = this.selectedDishIds.filter(id => id !== dishId);
    } else {
      // Add the dish ID to the selected dishes array
      this.selectedDishIds.push(dishId);
    }
  }

  addDishesToOrder(): void {
    // Implement the logic to add the selected dishes to the order
    console.log(localStorage.getItem('customer_email'))
    const order = {
      customer_name: this.customerName,
      dish_ids: this.selectedDishIds,
      status: 'received',
      customer_email: localStorage.getItem('customer_email')
    };
  
    this.http.post('https://foodhub-btuo.onrender.com/new_order', order).subscribe(() => {
      console.log('Order added successfully');
      // Reset selected dishes and customer name
      this.selectedDishIds = [];
      this.customerName = '';
    });
  }

  
  reviewOrders(): void {
    this.http.get('https://foodhub-btuo.onrender.com/review_orders').subscribe((response) => {
      const allOrders = response as any[];
      // this.reviewData = response as any[];
      const data=localStorage.getItem('customer_email')
      this.reviewData = allOrders.filter((order) => order.customer_email === data);
      this.isReviewMode = true;
    });
  }

  toggleView(): void {
    this.isReviewMode = !this.isReviewMode;
  }

  getDishName(dishId: number): string {
    const dish = this.menuData.find(d => d.dish_id === dishId);
    return dish ? dish.dish_name : '';
  }
  
}
