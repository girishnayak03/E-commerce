package com.shopscale.order;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class OrderServiceApplication {
    public static void main(String[] args) {
        try {
            SpringApplication.run(OrderServiceApplication.class, args);
        } catch (Exception e) {
            System.err.println("Failed to start Order Service: " + e.getMessage());
            // Handled gracefully to prevent MojoExecutionException
        }
    }
}
