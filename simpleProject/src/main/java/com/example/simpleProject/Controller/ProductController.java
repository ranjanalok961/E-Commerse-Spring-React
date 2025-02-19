package com.example.simpleProject.Controller;


import com.example.simpleProject.Model.Product;
import com.example.simpleProject.Model.User;
import com.example.simpleProject.Service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping("/")
    public String Default(){
        return "Product";
    }

    @GetMapping("/product")
    public List<Product> getAllProducts(){
        return service.getAllProducts();
    }
    @GetMapping("/product/{productId}/image")
    public ResponseEntity<byte[]> getImageByProductId(@PathVariable int productId){

        Product product = service.getProductById(productId);
        byte[] imageFile = product.getImageDate();

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(product.getImageType()))
                .body(imageFile);

    }

    @PostMapping("/product")
    public ResponseEntity<?> addProduct(@RequestParam("product") String productJson,
                                        @RequestParam("imageFile") MultipartFile imageFile) {
        try {
            // Deserialize product JSON
            Product product = new ObjectMapper().readValue(productJson, Product.class);

            // Call service to add product
            Product product1 = service.addProduct(product, imageFile);
            return new ResponseEntity<>(product1, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/product/{id}")
    public Product getById(@PathVariable int id){
        return service.getProductById(id);
    }




}