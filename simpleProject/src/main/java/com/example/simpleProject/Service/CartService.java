package com.example.simpleProject.Service;

import com.example.simpleProject.Model.Cart;
import com.example.simpleProject.Repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // Add item to cart
    public Cart addCartItem(Cart cart) {
        return cartRepository.save(cart);
    }

    // Get all cart items
    public List<Cart> getAllCartItems() {
        return cartRepository.findAll();
    }

    // Get cart items by user ID
    public List<Cart> getCartItemsByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    // Remove cart item
    public void deleteCartItem(Long id) {
        cartRepository.deleteById(id);
    }

    // Update cart item quantity
    public Cart updateCartItem(Long id, int quantity) {
        Optional<Cart> cartItem = cartRepository.findById(id);
        if (cartItem.isPresent()) {
            Cart cart = cartItem.get();
            int newQuantity = cart.getQuantity() + quantity;
            if (newQuantity < 1) newQuantity = 1; // Prevent quantity going below 1
            cart.setQuantity(newQuantity);
            return cartRepository.save(cart);
        }
        return null;
    }




}
