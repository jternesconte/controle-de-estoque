package com.example.controle_de_estoque.controllers;

import com.example.controle_de_estoque.models.entities.Categoria;
import com.example.controle_de_estoque.models.entities.Produto;
import com.example.controle_de_estoque.models.repositories.CategoriaRepository;
import com.example.controle_de_estoque.models.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

@Controller
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    public Produto novoProduto(int categoriaId, Produto produtoDetalhes) {

        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        Produto produto = new Produto(
                produtoDetalhes.getNome(),
                produtoDetalhes.getDescricao(),
                produtoDetalhes.getPreco(),
                produtoDetalhes.getQuantidade(),
                categoria,
                true
        );

        return produtoRepository.save(produto);
    }

    public List<Produto> getAllProdutos() {
        return (List<Produto>) produtoRepository.findAll();
    }

    public List<Produto> getAtivos() {
        List<Produto> produtosAtivos = produtoRepository.findByflAtivoTrue();
        return ResponseEntity.ok(produtosAtivos).getBody();
    }

    public List<Produto> getInativos() {
        List<Produto> produtosInativos = produtoRepository.findByflAtivoFalse();
        return ResponseEntity.ok(produtosInativos).getBody();
    }

    public Produto editarProduto(int id, Produto produtoDetalhes, int categoriaId) {
     Optional<Produto> optionalProduto = produtoRepository.findById(id);

     if(optionalProduto.isPresent()) {
         Produto produtoExistente = optionalProduto.get();
         produtoExistente.setNome(produtoDetalhes.getNome() != null ? produtoDetalhes.getNome() : produtoExistente.getNome());
         produtoExistente.setDescricao(produtoDetalhes.getDescricao() != null ? produtoDetalhes.getDescricao() : produtoExistente.getDescricao());
         produtoExistente.setPreco(produtoDetalhes.getPreco() != null ? produtoDetalhes.getPreco() : produtoExistente.getPreco());
         produtoExistente.setQuantidade(produtoDetalhes.getQuantidade());
         produtoExistente.setFlAtivo(produtoDetalhes.getFlAtivo() != null ? produtoDetalhes.getFlAtivo() : produtoExistente.getFlAtivo());

         Optional<Categoria> optionalCategoria = categoriaRepository.findById(categoriaId);

         if(optionalCategoria.isPresent()) {
             produtoExistente.setCategoriaId(optionalCategoria.get());
         } else {
             throw new RuntimeException("Categoria não encontrada com o id: " + produtoDetalhes.getCategoriaId());
         }

         return produtoRepository.save(produtoExistente);
     } else {
         throw new RuntimeException("Produto não encontrado com o id: " + id);
     }

    }
}