package com.shopscale.inventory.service;

import com.shopscale.inventory.model.Inventory;
import com.shopscale.inventory.model.InventoryResponseEvent;
import com.shopscale.inventory.model.OrderPlacedEvent;
import com.shopscale.inventory.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    @KafkaListener(topics = "order-events", groupId = "inventory-group")
    public void handleOrderPlacedEvent(OrderPlacedEvent event) {
        System.out.println("Received OrderPlacedEvent for order: " + event.orderNumber());

        Optional<Inventory> inventoryOpt = inventoryRepository.findByProductId(event.productId());

        if (inventoryOpt.isPresent()) {
            Inventory inventory = inventoryOpt.get();
            if (inventory.getQuantity() >= event.quantity()) {
                inventory.setQuantity(inventory.getQuantity() - event.quantity());
                inventoryRepository.save(inventory);
                System.out.println("Decremented inventory for product: " + event.productId());
                
                // Send success response
                kafkaTemplate.send("inventory-responses", new InventoryResponseEvent(event.orderId(), "CONFIRMED"));
            } else {
                System.out.println("Insufficient inventory for product: " + event.productId());
                // Send failure response
                kafkaTemplate.send("inventory-responses", new InventoryResponseEvent(event.orderId(), "REJECTED"));
            }
        } else {
            System.out.println("Product not found in inventory: " + event.productId());
            // Send failure response
            kafkaTemplate.send("inventory-responses", new InventoryResponseEvent(event.orderId(), "REJECTED"));
        }
    }
}
