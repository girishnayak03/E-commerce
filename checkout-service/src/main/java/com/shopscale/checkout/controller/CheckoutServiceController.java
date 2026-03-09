package com.shopscale.checkout.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutServiceController {

    @PostMapping("/process")
    public ResponseEntity<Map<String, String>> processCheckout(@RequestBody Map<String, Object> checkoutData) {
        // Simulate payment/order processing logic
        Map<String, String> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("message", "Payment processed and order placed successfully.");
        return ResponseEntity.ok(response);
    }
}
