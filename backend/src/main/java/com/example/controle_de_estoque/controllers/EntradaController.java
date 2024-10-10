package com.example.controle_de_estoque.controllers;

import com.example.controle_de_estoque.models.entities.Entrada;
import com.example.controle_de_estoque.models.entities.Produto;
import com.example.controle_de_estoque.models.repositories.EntradaRepository;
import com.example.controle_de_estoque.models.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class EntradaController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private EntradaRepository entradaRepository;

    public List<Entrada> getAllEntradas() {
        return (List<Entrada>) entradaRepository.findAll();
    }

    public Entrada novaEntrada(int produtoId, Entrada entradaDetalhes) {
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));;

        if (produto.getCategoriaId() == null) {
            throw new RuntimeException("Produto não possui uma categoria associada");
        }

        int novaQuantidade = produto.getQuantidade() + entradaDetalhes.getQuantidade();
        produto.setQuantidade(novaQuantidade);
        produto.setNome(produto.getNome());
        produto.setDescricao(produto.getDescricao());
        produto.setPreco(produto.getPreco());
        produto.setQuantidade(produto.getQuantidade());
        produto.setFlAtivo(produto.getFlAtivo());

        produtoRepository.save(produto);

        Entrada entrada = new Entrada(
          produto,
          entradaDetalhes.getQuantidade()
        );

        return entradaRepository.save(entrada);
    }
}
