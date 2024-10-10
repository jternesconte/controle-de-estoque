package com.example.controle_de_estoque.ws;

import com.example.controle_de_estoque.controllers.EntradaController;
import com.example.controle_de_estoque.controllers.ProdutoController;
import com.example.controle_de_estoque.models.entities.Entrada;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entrada")
public class EntradaWs {

    @Autowired
    private ProdutoController produtoController;

    @Autowired
    private EntradaController entradaController;

    @GetMapping("/getAllEntradas")
    public @ResponseBody List<Entrada> getAllEntradas() {
        return entradaController.getAllEntradas();
    }

    @PostMapping("/novaEntrada/{produtoId}")
    public Entrada novaEntrada(@PathVariable int produtoId, @RequestBody Entrada entradaDetalhes) {
        return entradaController.novaEntrada(produtoId, entradaDetalhes);
    }

}
