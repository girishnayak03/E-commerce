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

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.util.concurrent.CopyOnWriteArrayList;
import java.io.IOException;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

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

        // Calling customer service to verify customer info
        if (order.getCustomerId() != null) {
            String customerUrl = "http://CUSTOMER-SERVICE/api/customers/" + order.getCustomerId();
            try {
                ResponseEntity<String> customerResponse = restTemplate.getForEntity(customerUrl, String.class);
                if (!customerResponse.getStatusCode().is2xxSuccessful()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid customer ID.");
                }
            } catch (Exception e) {
                // If service is down, we might want to continue or fail. 
                // For now, let's keep it tight.
                return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("Customer Service is currently down.");
            }
        }

        if (order.getOrderNumber() == null || order.getOrderNumber().isEmpty()) {
            order.setOrderNumber(java.util.UUID.randomUUID().toString());
        }

        order.setOrderStatus("PENDING");
        Order savedOrder = orderRepository.save(order);
        OrderPlacedEvent event = new OrderPlacedEvent(savedOrder.getId(), savedOrder.getOrderNumber(),
                savedOrder.getProductId(), savedOrder.getQuantity(), savedOrder.getTotalPrice());
        kafkaTemplate.send("order-events", event);

        // Notify all connected clients about the new order for real-time frontend updates
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event().name("new-order").data(savedOrder));
            } catch (IOException e) {
                emitters.remove(emitter);
            }
        }

        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/stream")
    public SseEmitter streamOrders() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE); // Infinite timeout
        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((e) -> emitters.remove(emitter));

        return emitter;
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
