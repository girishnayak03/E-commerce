package com.shopscale.order.model;

public record InventoryResponseEvent(Long orderId, String status) {
}
