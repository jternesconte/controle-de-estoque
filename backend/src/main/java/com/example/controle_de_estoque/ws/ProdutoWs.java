package com.example.controle_de_estoque.ws;

import com.example.controle_de_estoque.controllers.ProdutoController;
import com.example.controle_de_estoque.models.entities.Produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produto")
public class ProdutoWs {
    @Autowired
    private ProdutoController produtoController;

    @GetMapping("/getAllProdutos")
    public @ResponseBody List<Produto> getAllProdutos() {
        return produtoController.getAllProdutos();
    }

    @PostMapping("/adicionarProduto/{categoriaId}")
    public Produto novoProduto(@PathVariable int categoriaId, @RequestBody Produto produtoDetalhes) {
        return produtoController.novoProduto(categoriaId, produtoDetalhes);
    }

    @GetMapping("/getProdutos/ativos")
    public @ResponseBody List<Produto> getAtivos() {
        return produtoController.getAtivos();
    }

    @GetMapping("/getProdutos/inativos")
    public @ResponseBody List<Produto> getInativos() {
        return produtoController.getInativos();
    }

    @PutMapping("alterarItem/{id}/{categoriaId}")
    public Produto editarProduto(@PathVariable int id, @PathVariable int categoriaId , @RequestBody Produto produtoDetalhes) {
        return produtoController.editarProduto(id, produtoDetalhes, categoriaId);
    }
}
