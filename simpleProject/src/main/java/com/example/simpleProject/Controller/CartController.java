package com.example.simpleProject.Controller;

import com.example.simpleProject.Model.Cart;
import com.example.simpleProject.Repository.CartRepository;
import com.example.simpleProject.Service.CartService;
import com.example.simpleProject.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private ProductService productService;

    // 1. Add a new cart item
    @PostMapping
    public Cart addCartItem(@RequestBody Cart cart) {
        System.out.println(cart);
        return cartService.addCartItem(cart);
    }

    // 2. Get all cart items
    @GetMapping("/all")
    public List<Cart> getAllCartItems() {
        return cartService.getAllCartItems();
    }

    // 3. Get cart items by user ID
    @GetMapping("/user/{userId}")
    public List<Cart> getCartItemsByUserId(@PathVariable Long userId) {
        return cartService.getCartItemsByUserId(userId);
    }

    // 4. Update cart item quantity
    @PutMapping("/{id}")
    public Cart updateCartItem(@PathVariable Long id, @RequestParam int quantity) {
        return cartService.updateCartItem(id, quantity);
    }



    // 5. Delete a cart item
    @DeleteMapping("/{id}")
    public void deleteCartItem(@PathVariable Long id) {
        cartService.deleteCartItem(id);
    }

    @PutMapping("/update")
    public Cart updateCartItem(
            @RequestParam Long userId,
            @RequestParam Long productId,
            @RequestParam int quantity
    ) {
        Optional<Cart> cartItem = cartRepository.findByUserIdAndProductId(userId, productId);
        if (cartItem.isPresent()) {
            Cart cart = cartItem.get();
            int newQuantity = Math.max(1, cart.getQuantity() + quantity); // Prevent < 1
            cart.setQuantity(newQuantity);
            return cartRepository.save(cart);
        }
        return null;
    }


}
