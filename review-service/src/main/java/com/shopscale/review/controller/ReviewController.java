package com.shopscale.review.controller;

import com.shopscale.review.model.Review;
import com.shopscale.review.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private org.springframework.web.client.RestTemplate restTemplate;

    @GetMapping("/{productId}")
    public ResponseEntity<List<Review>> getReviewsByProduct(@PathVariable String productId) {
        return ResponseEntity.ok(reviewRepository.findByProductId(productId));
    }

    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody Review review) {
        // Validate customer if email is provided as userId
        if (review.getUserId() != null && review.getUserId().contains("@")) {
            try {
                String customerUrl = "http://CUSTOMER-SERVICE/api/customers/email/" + review.getUserId();
                ResponseEntity<String> customerResponse = restTemplate.getForEntity(customerUrl, String.class);
                if (!customerResponse.getStatusCode().is2xxSuccessful()) {
                    return ResponseEntity.status(org.springframework.http.HttpStatus.BAD_REQUEST)
                            .body("You must be a registered customer to leave a review.");
                }
            } catch (Exception e) {
                // If service is down, we can log it and decide policy. For now, we continue.
                System.out.println("Warning: Could not contact Customer Service for validation.");
            }
        }
        return ResponseEntity.ok(reviewRepository.save(review));
    }
}
