package com.shopscale.product.config;

import com.shopscale.product.model.Product;
import com.shopscale.product.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    public CommandLineRunner loadData(ProductRepository productRepository) {
        return args -> {
            if (productRepository.count() == 0) {
                productRepository.saveAll(List.of(
                    new Product("p1", "Gamer PC", "Extremely fast gaming PC", "Electronics", new BigDecimal("1500.00")),
                    new Product("p2", "Mechanical Keyboard", "RGB backlit keyboard", "Electronics", new BigDecimal("80.00")),
                    new Product("p3", "Gaming Mouse", "High DPI precision mouse", "Electronics", new BigDecimal("40.00")),
                    new Product("p4", "Modern Chair", "Comfortable office chair", "Furniture", new BigDecimal("120.00")),
                    new Product("p5", "Classic Table", "Wooden work desk", "Furniture", new BigDecimal("150.00"))
                ));
                System.out.println("Product catalog seeded with sample data.");
            }
        };
    }
}
