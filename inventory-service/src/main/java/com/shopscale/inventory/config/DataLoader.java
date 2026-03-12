package com.shopscale.inventory.config;

import com.shopscale.inventory.model.Inventory;
import com.shopscale.inventory.repository.InventoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    public CommandLineRunner loadData(InventoryRepository inventoryRepository) {
        return args -> {
            if (inventoryRepository.count() == 0) {
                Inventory item1 = new Inventory(null, "p1", 100);
                Inventory item2 = new Inventory(null, "p2", 50);
                Inventory item3 = new Inventory(null, "p3", 0);
                inventoryRepository.saveAll(List.of(item1, item2, item3));
                System.out.println("Inventory seeded with sample data.");
            }
        };
    }
}
