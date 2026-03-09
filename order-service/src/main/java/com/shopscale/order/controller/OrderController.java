package com.shopscale.order.controller;

import com.shopscale.order.model.Order;
import com.shopscale.order.repository.OrderRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.shopscale.order.model.OrderPlacedEvent;
import org.springframework.kafka.core.KafkaTemplate;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private KafkaTemplate<String, OrderPlacedEvent> kafkaTemplate;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @PostMapping
    @CircuitBreaker(name = "productServiceCB", fallbackMethod = "fallbackCreateOrder")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {

        // Calling product service to verify product info before saving order
        String productUrl = "http://PRODUCT-SERVICE/api/products/" + order.getProductId();
        ResponseEntity<String> productResponse = restTemplate.getForEntity(productUrl, String.class);

        if (!productResponse.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid product ID.");
        }

        Order savedOrder = orderRepository.save(order);
        OrderPlacedEvent event = new OrderPlacedEvent(savedOrder.getId(), savedOrder.getOrderNumber(),
                savedOrder.getProductId(), savedOrder.getQuantity(), savedOrder.getTotalPrice());
        kafkaTemplate.send("order-events", event);

        return ResponseEntity.ok(savedOrder);
    }

    public ResponseEntity<?> fallbackCreateOrder(Order order, Throwable t) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body("Product Service is currently down. Fallback message: Order could not be placed because we could not verify the product. Please try again later.");
    }

    @GetMapping("/track/{orderNumber}")
    public ResponseEntity<Order> trackOrder(@PathVariable String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
