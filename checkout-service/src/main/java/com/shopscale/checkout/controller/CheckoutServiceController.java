package com.shopscale.checkout.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutServiceController {

    @Autowired
    private org.springframework.web.client.RestTemplate restTemplate;

    @PostMapping("/process")
    public ResponseEntity<Map<String, String>> processCheckout(@RequestBody Map<String, Object> checkoutData) {
        String email = (String) checkoutData.get("userId");
        String address = "Standard Shipping";

        // Try to fetch real address from Customer Service
        if (email != null) {
            try {
                String customerUrl = "http://CUSTOMER-SERVICE/api/customers/email/" + email;
                Map<String, Object> customer = restTemplate.getForObject(customerUrl, Map.class);
                if (customer != null && customer.get("address") != null) {
                    address = (String) customer.get("address");
                }
            } catch (Exception e) {
                System.out.println("Could not fetch customer address, using default.");
            }
        }

        Map<String, String> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("message", "Payment processed. Shipping to: " + address);
        return ResponseEntity.ok(response);
    }
}
