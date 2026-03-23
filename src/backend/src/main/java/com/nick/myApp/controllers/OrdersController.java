package com.nick.myApp.controllers;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.nick.myApp.models.*;

import com.nick.myApp.repos.*;


import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor

public class OrdersController {
    @Autowired
    private OrdersRepo ordersRepo;

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private OrderItemRepo orderItemRepo;

    @GetMapping("/{orderId}")
public ResponseEntity<?> getOrderDetails(@PathVariable int orderId, Authentication authentication) {
    String identifier = authentication.getName();
    Users user = usersRepo.findByEmailIgnoreCase(identifier)
        .orElseGet(() -> usersRepo.findByMobile(identifier)
        .orElseThrow(() -> new RuntimeException("User not found: " + identifier)));

    Orders order = ordersRepo.findById(orderId)
        .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

    // make sure the order belongs to that user
    if (!order.getUser().equals(user)) {
        return ResponseEntity.status(403).body(Map.of("Error", "Unauthorized access"));
    }

    return ResponseEntity.ok(order);
}
    

    // checkout
    @PostMapping("/checkout")
     public ResponseEntity<?> checkout(Authentication authentication) {
        String identifier = authentication.getName();
        Users user = usersRepo.findByEmailIgnoreCase(identifier)
            .orElseGet(() -> usersRepo.findByMobile(identifier)
            .orElseThrow(() -> new RuntimeException("User not found: " + identifier)));

        List<Cart> cartItems = cartRepo.findByUser(user);
        if (cartItems.isEmpty()) {
            return ResponseEntity.status(403).body(Map.of("Error", "Empty cart , checkout are not allowed"));
        }

        Orders order = new Orders();
        order.setUser(user);
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus("Pending");
        order.setPaymentMethod("Unpaid");
         // Cart → OrderItem
    List<OrderItem> orderItems = cartItems.stream()
    .map(c -> new OrderItem(
        0,
        order,
        c.getCourse(),
        c.getQuantity(),
        BigDecimal.valueOf(c.getCourse().getPrice()) // ✅ Double → BigDecimal
    ))
    .toList();


    order.setItems(orderItems);
    order.calculateTotal();
        ordersRepo.save(order);

        orderItemRepo.saveAll(orderItems);

        // clear cart
        cartRepo.deleteAll(cartItems);

        return ResponseEntity.ok(order);
    }

}
