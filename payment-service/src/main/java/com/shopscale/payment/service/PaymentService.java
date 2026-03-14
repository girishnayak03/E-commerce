package com.shopscale.payment.service;

import com.shopscale.payment.model.PaymentRequest;
import com.shopscale.payment.model.PaymentResponse;
import com.shopscale.payment.model.Payment;
import com.shopscale.payment.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public PaymentResponse processPayment(PaymentRequest request) {
        String transactionId = "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String paymentId = UUID.randomUUID().toString();
        LocalDateTime now = LocalDateTime.now();

        Payment payment = new Payment();
        payment.setPaymentId(paymentId);
        payment.setOrderId(request.getOrderId());
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setCurrency(request.getCurrency());
        payment.setStatus("SUCCESS");
        payment.setTransactionId(transactionId);
        payment.setTimestamp(now);

        paymentRepository.save(payment);

        return new PaymentResponse(
                paymentId,
                request.getOrderId(),
                "SUCCESS",
                transactionId,
                now
        );
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
}
