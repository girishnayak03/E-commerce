package com.shopscale.apigateway.config;

import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.reactive.ServerHttpRequest;
import reactor.core.publisher.Mono;

import java.net.InetSocketAddress;

@Configuration
public class RateLimiterConfig {

    @Bean
    public KeyResolver ipKeyResolver() {
        return exchange -> {
            ServerHttpRequest request = exchange.getRequest();
            InetSocketAddress remoteAddress = request.getRemoteAddress();
            if (remoteAddress != null) {
                return Mono.just(remoteAddress.getAddress().getHostAddress());
            }
            return Mono.just("unknown");
        };
    }
}
