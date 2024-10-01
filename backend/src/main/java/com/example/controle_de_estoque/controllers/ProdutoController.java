package com.example.controle_de_estoque.controllers;

import com.example.controle_de_estoque.models.entities.Categoria;
import com.example.controle_de_estoque.models.entities.Produto;
import com.example.controle_de_estoque.models.repositories.CategoriaRepository;
import com.example.controle_de_estoque.models.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/produto")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @PostMapping("/adicionarProduto/{categoriaId}")
    public Produto novoProduto(@RequestParam String nome,
                                             @RequestParam String descricao,
                                             @RequestParam BigDecimal preco,
                                             @RequestParam int quantidade,
                                             @PathVariable int categoriaId) {

        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        Produto produto = new Produto(nome, descricao, preco,
                quantidade, categoria, true);

        produtoRepository.save(produto);
        return produto;
    }

    @GetMapping("/getAllProdutos")
    public @ResponseBody List<Produto> getProdutos() {
        return (List<Produto>) produtoRepository.findAll();
    }

    @GetMapping("/getProdutos/ativos")
    public @ResponseBody List<Produto> getAtivos() {
        List<Produto> produtosAtivos = produtoRepository.findByflAtivoTrue();
        return ResponseEntity.ok(produtosAtivos).getBody();
    }

    @GetMapping("/getProdutos/inativos")
    public @ResponseBody List<Produto> getInativos() {
        List<Produto> produtosInativos = produtoRepository.findByflAtivoFalse();
        return ResponseEntity.ok(produtosInativos).getBody();
    }

    @PutMapping("alterarItem/{id}")
    public Produto editarProduto(@PathVariable int id, Produto produtoDetalhes) {
     Optional<Produto> optionalProduto = produtoRepository.findById(id);

     if(optionalProduto.isPresent()) {
         Produto produtoExistente = optionalProduto.get();
         produtoExistente.setNome(produtoDetalhes.getNome());
         produtoExistente.setDescricao(produtoDetalhes.getDescricao());
         produtoExistente.setPreco(produtoDetalhes.getPreco());
         produtoExistente.setQuantidade(produtoDetalhes.getQuantidade());
         produtoExistente.setCategoriaId(produtoDetalhes.getCategoriaId());
         produtoExistente.setFlAtivo(produtoDetalhes.getFlAtivo());

         return produtoRepository.save(produtoExistente);
     } else {
         throw new RuntimeException("Produto não encontrado com o id: " + id);
     }

    }
}