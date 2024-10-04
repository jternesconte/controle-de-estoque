package com.example.controle_de_estoque.ws;


import com.example.controle_de_estoque.controllers.CategoriaController;
import com.example.controle_de_estoque.models.entities.Categoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categoria")
public class CategoriaWs {

    @Autowired
    private CategoriaController categoriaController;

    @GetMapping("/getAllCategorias")
    public @ResponseBody List<Categoria> getAllCategorias() {
        return categoriaController.getAllCategorias();
    }

    @PostMapping("/adicionarCategoria")
    public Categoria novaCategoria(@RequestBody Categoria categoriaDetalhes) {
        return categoriaController.novaCategoria(categoriaDetalhes);
    }

    @PutMapping("/alterarCategoria/{id}/{flAtivo}")
    public Categoria editarCategoria(@PathVariable int id, @PathVariable boolean flAtivo) {
        return  categoriaController.editarCategoria(id, flAtivo);
    }
}