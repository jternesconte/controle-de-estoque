package com.example.controle_de_estoque.controllers;

import com.example.controle_de_estoque.models.Product;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class ProductsController {

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable int id) {
        return new Product(id, "Celular", 1299, "Smartphones");
    }
}