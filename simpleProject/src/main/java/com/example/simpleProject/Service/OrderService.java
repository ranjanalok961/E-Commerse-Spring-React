package com.example.simpleProject.Service;


import com.example.simpleProject.Model.Order;
import com.example.simpleProject.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // Get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get order by ID
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }


    // Create new order
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    // Update existing order
    public Order updateOrder(Long id, Order orderDetails) {
        return orderRepository.findById(id).map(order -> {
            order.setUserId(orderDetails.getUserId());
            order.setTime(orderDetails.getTime());
            order.setPaymentMethod(orderDetails.getPaymentMethod());
            order.setProductIds(orderDetails.getProductIds());
            order.setTotalAmount(orderDetails.getTotalAmount());
            order.setBillingDetails(orderDetails.getBillingDetails());
            order.setStatus(orderDetails.getStatus());
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    // Delete order by ID
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserIdOrderByTimeDesc(userId);
    }
}

