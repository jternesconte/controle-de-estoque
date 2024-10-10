package com.example.controle_de_estoque.ws;

import com.example.controle_de_estoque.controllers.ProdutoController;
import com.example.controle_de_estoque.controllers.SaidaController;
import com.example.controle_de_estoque.models.entities.Entrada;
import com.example.controle_de_estoque.models.entities.Saida;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saida")
public class SaidaWs {

    @Autowired
    private ProdutoController produtoController;

    @Autowired
    private SaidaController saidaController;

    @GetMapping("/getAllSaidas")
    public @ResponseBody List<Saida> getAllSaidas() {
        return saidaController.getAllSaidas();
    }

    @PostMapping("/novaSaida/{produtoId}")
    public Saida novaSaida(@PathVariable int produtoId, @RequestBody Saida saidaDetalhes) {
        return saidaController.novaSaida(produtoId, saidaDetalhes);
    }
}
