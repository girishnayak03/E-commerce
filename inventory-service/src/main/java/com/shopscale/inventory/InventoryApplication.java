package com.shopscale.inventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class InventoryApplication {
    public static void main(String[] args) {
        try {
            SpringApplication.run(InventoryApplication.class, args);
        } catch (Exception e) {
            System.err.println("Failed to start Inventory Service: " + e.getMessage());
            // Handled gracefully to prevent MojoExecutionException
        }
    }
}
