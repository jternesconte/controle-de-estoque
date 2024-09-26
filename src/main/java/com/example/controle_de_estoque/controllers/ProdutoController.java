package com.example.controle_de_estoque.controllers;

import com.example.controle_de_estoque.models.entities.Categoria;
import com.example.controle_de_estoque.models.entities.Produto;
import com.example.controle_de_estoque.models.repositories.CategoriaRepository;
import com.example.controle_de_estoque.models.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/produto")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @PostMapping("/adicionarProduto/{categoriaId}")
    public @ResponseBody Produto novoProduto(@RequestParam String nome,
                                             @RequestParam String descricao,
                                             @RequestParam BigDecimal preco,
                                             @RequestParam int quantidade,
                                             @PathVariable int categoriaId) {

        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        Produto produto = new Produto(nome, descricao, preco,
                quantidade, categoria);

        produtoRepository.save(produto);
        return produto;
    }
}