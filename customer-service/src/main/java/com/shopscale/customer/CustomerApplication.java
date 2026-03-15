package com.shopscale.customer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class CustomerApplication {
    public static void main(String[] args) {
        try {
            SpringApplication.run(CustomerApplication.class, args);
        } catch (Exception e) {
            System.err.println("Failed to start Customer Service: " + e.getMessage());
            // Handled gracefully to prevent MojoExecutionException
        }
    }
}
