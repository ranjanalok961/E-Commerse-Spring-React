package com.example.simpleProject.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private LocalDateTime time;
    private String paymentMethod;
    private Double totalAmount;
    private String billingDetails;
    private String status;

    @ElementCollection
    private List<Long> productIds;

    public Order() {}

    public Order(Long userId, LocalDateTime time, String paymentMethod, List<Long> productIds, Double totalAmount, String billingDetails, String status) {
        this.userId = userId;
        this.time = time;
        this.paymentMethod = paymentMethod;
        this.productIds = productIds;
        this.totalAmount = totalAmount;
        this.billingDetails = billingDetails;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public LocalDateTime getTime() { return time; }
    public void setTime(LocalDateTime time) { this.time = time; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public List<Long> getProductIds() { return productIds; }
    public void setProductIds(List<Long> productIds) { this.productIds = productIds; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public String getBillingDetails() { return billingDetails; }
    public void setBillingDetails(String billingDetails) { this.billingDetails = billingDetails; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
