package com.shopscale.order.model;

import java.math.BigDecimal;

public record OrderPlacedEvent(Long orderId, String orderNumber, String productId, Integer quantity, BigDecimal totalPrice) {
}
