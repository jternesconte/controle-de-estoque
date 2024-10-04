package com.example.controle_de_estoque.controllers;

import com.example.controle_de_estoque.models.repositories.CategoriaRepository;
import com.example.controle_de_estoque.models.repositories.ProdutoRepository;
import com.example.controle_de_estoque.models.repositories.SaidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class SaidaController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private SaidaRepository saidaRepository;
}
