package com.shopscale.inventory.model;

public record InventoryResponseEvent(Long orderId, String status) {
}
