package com.shopscale.customer.config;

import com.shopscale.customer.model.Customer;
import com.shopscale.customer.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    public CommandLineRunner loadData(CustomerRepository customerRepository) {
        return args -> {
            if (customerRepository.count() == 0) {
                customerRepository.saveAll(List.of(
                    new Customer(null, "John", "Doe", "john@example.com", "1234567890", "123 Main St, New York"),
                    new Customer(null, "Jane", "Smith", "jane@example.com", "9876543210", "456 Oak Ave, Los Angeles"),
                    new Customer(null, "Alice", "Johnson", "alice@example.com", "5551234567", "789 Pine Rd, Chicago")
                ));
                System.out.println("Customer data seeded successfully.");
            }
        };
    }
}
