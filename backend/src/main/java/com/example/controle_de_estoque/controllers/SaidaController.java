package com.example.controle_de_estoque.controllers;

import com.example.controle_de_estoque.models.entities.Produto;
import com.example.controle_de_estoque.models.entities.Saida;
import com.example.controle_de_estoque.models.repositories.CategoriaRepository;
import com.example.controle_de_estoque.models.repositories.ProdutoRepository;
import com.example.controle_de_estoque.models.repositories.SaidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class SaidaController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private SaidaRepository saidaRepository;

    public List<Saida> getAllSaidas() {
        return (List<Saida>) saidaRepository.findAll();
    }

    public Saida novaSaida(int produtoId, Saida saidaDetalhes) {
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));;

        if (produto.getCategoriaId() == null) {
            throw new RuntimeException("Produto não possui uma categoria associada");
        }

        int novaQuantidade = produto.getQuantidade() - saidaDetalhes.getQuantidade();

        if(novaQuantidade > 0) {
        produto.setQuantidade(novaQuantidade);
        produto.setNome(produto.getNome());
        produto.setDescricao(produto.getDescricao());
        produto.setPreco(produto.getPreco());
        produto.setQuantidade(produto.getQuantidade());
        produto.setFlAtivo(produto.getFlAtivo());
        } else {
            throw new RuntimeException("Quantidade do produto não pode ficar negativa");
        }

        produtoRepository.save(produto);

        Saida saida = new Saida(
                produto,
                saidaDetalhes.getQuantidade()
        );

        return saidaRepository.save(saida);
    }
}
