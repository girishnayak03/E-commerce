package com.shopscale.order.service;

import com.shopscale.order.model.InventoryResponseEvent;
import com.shopscale.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class OrderKafkaListener {

    @Autowired
    private OrderRepository orderRepository;

    @KafkaListener(topics = "inventory-responses", groupId = "order-group")
    public void handleInventoryResponse(InventoryResponseEvent event) {
        System.out.println("Received InventoryResponseEvent for order: " + event.orderId() + " Status: " + event.status());

        orderRepository.findById(event.orderId()).ifPresent(order -> {
            order.setOrderStatus(event.status());
            orderRepository.save(order);
            System.out.println("Updated order " + event.orderId() + " status to " + event.status());
        });
    }
}
