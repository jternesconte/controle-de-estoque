package com.example.controle_de_estoque.controllers;

import com.example.controle_de_estoque.models.repositories.CategoriaRepository;
import com.example.controle_de_estoque.models.repositories.EntradaRepository;
import com.example.controle_de_estoque.models.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class EntradaController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    EntradaRepository entradaRepository;
}
