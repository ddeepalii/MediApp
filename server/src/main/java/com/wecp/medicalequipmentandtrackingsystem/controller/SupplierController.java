package com.wecp.medicalequipmentandtrackingsystem.controller;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Order;
import com.wecp.medicalequipmentandtrackingsystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;
 
@RestController
public class SupplierController {
   
    @Autowired
    private OrderService orderService;
 
    @GetMapping("/api/supplier/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> a=orderService.getAllOrders();
        return new ResponseEntity<>(a,HttpStatus.OK);

    }
 
    @PutMapping("/api/supplier/order/update/{orderId}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @RequestParam String newStatus) {
        Order b=orderService.updateOrderStatus(orderId, newStatus);
        return new  ResponseEntity<>(b,HttpStatus.OK);

    }
}