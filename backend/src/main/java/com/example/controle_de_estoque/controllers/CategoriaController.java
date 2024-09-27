package com.example.controle_de_estoque.controllers;

import com.example.controle_de_estoque.models.entities.Categoria;
import com.example.controle_de_estoque.models.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categoria")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @PostMapping("/adicionarCategoria")
    public @ResponseBody Categoria novoProduto(@RequestParam String nome,
                                               @RequestParam String descricao) {

        Categoria categoria = new Categoria(nome, descricao);

        categoriaRepository.save(categoria);
        return categoria;
    }
}
