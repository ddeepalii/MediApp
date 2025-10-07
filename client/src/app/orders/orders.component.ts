import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  showError: boolean = false;
  errorMessage: any;
  showMessage: boolean = false;
  responseMessage: any;
  orderList: any[] = [];
  statusModel: any = { newStatus: null, orderId: null };

  constructor(
    public router: Router,
    public httpService: HttpService,
    public authService: AuthService
  ) {
    if (
      this.authService.getRole !== 'HOSPITAL' &&
      this.authService.getRole !== 'SUPPLIER'
    ) {
      this.router.navigateByUrl('dashboard');
    }
  }

  ngOnInit(): void {
    this.getOrders();
  }

  // 🔄 Fetch orders
  getOrders(): void {
    this.orderList = [];
    this.httpService.getorders().subscribe(
      (data: any) => {
        this.orderList = data;
      },
      (error) => {
        this.showError = true;
        this.errorMessage =
          'An error occurred while fetching orders. Please try again later.';
      }
    );
  }

  // // Prepare order for update
  // edit(order: any): void {
  //   this.statusModel.orderId = order.id;
  //   this.statusModel.newStatus = null; // Reset status selection
  //   this.showMessage = false;
  //   this.showError = false;
  // }

 //update
  // update(): void {
  //   if (this.statusModel.newStatus != null) {
  //     this.httpService
  //       .UpdateOrderStatus(
  //         this.statusModel.newStatus,
  //         this.statusModel.orderId
  //       )
  //       .subscribe(
  //         (data: any) => {
  //           this.showMessage = true;
  //           this.responseMessage = 'Status updated successfully.';
  //           this.getOrders(); // Refresh list
  //         },
  //         (error) => {
  //           this.showError = true;
  //           this.errorMessage =
  //             'An error occurred while updating status. Please try again later.';
  //         }
  //       );
  //   }
  // }

  updateOrderStatus(newStatus: string, orderId: number): void {
    // 🧠 Optimistically update the order's status in UI
    const targetOrder = this.orderList.find((order) => order.id === orderId);
    if (targetOrder) {
      targetOrder.status = newStatus;
    }
  
    // ✅ Proceed with backend update
    this.httpService.UpdateOrderStatus(newStatus, orderId).subscribe(
      (data: any) => {
        this.showMessage = true;
        this.responseMessage = `Status updated to '${newStatus}' successfully.`;
        this.getOrders(); // Final refresh
      },
      (error) => {
        this.showError = true;
        this.errorMessage = 'Failed to update order status. Please try again.';
      }
    );
  }
  
  

  // 🗑️ Delete an order
  delete(orderId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) return;

    this.httpService.deleteOrder(orderId).subscribe(
      (res: any) => {
        this.showMessage = true;
        this.responseMessage = 'Order deleted successfully.';
        this.getOrders(); // Refresh list
      },
      (error) => {
        this.showError = true;
        this.errorMessage =
          'An error occurred while deleting the order. Please try again.';
      }
    );
  }

  // 🎨 Dynamic status style
  getStatusStyle(status: string): any {
    switch (status) {
      case 'Delivered':
        return { color: 'green', 'font-weight': 'bold', 'font-size': '20px' };
      case 'In Transit':
        return { color: '#FFC300', 'font-weight': 'bold', 'font-size': '20px' };
      default:
        return { color: '#3371FF', 'font-weight': 'bold', 'font-size': '20px' };
    }
  }
}
