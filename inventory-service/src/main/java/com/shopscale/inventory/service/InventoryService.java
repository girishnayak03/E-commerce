package com.shopscale.inventory.service;

import com.shopscale.inventory.model.Inventory;
import com.shopscale.inventory.model.OrderPlacedEvent;
import com.shopscale.inventory.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

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
            } else {
                System.out.println("Insufficient inventory for product: " + event.productId());
                // In a real SAGA, we would publish an event here to trigger compensation in
                // Order Service
            }
        } else {
            System.out.println("Product not found in inventory: " + event.productId());
            // In a real SAGA, publish compensation event
        }
    }
}
