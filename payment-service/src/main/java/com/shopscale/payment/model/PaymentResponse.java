package com.shopscale.payment.model;

import java.time.LocalDateTime;

public class PaymentResponse {
    private String paymentId;
    private String orderId;
    private String status;
    private String transactionId;
    private LocalDateTime timestamp;

    public PaymentResponse() {}

    public PaymentResponse(String paymentId, String orderId, String status, String transactionId, LocalDateTime timestamp) {
        this.paymentId = paymentId;
        this.orderId = orderId;
        this.status = status;
        this.transactionId = transactionId;
        this.timestamp = timestamp;
    }

    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
