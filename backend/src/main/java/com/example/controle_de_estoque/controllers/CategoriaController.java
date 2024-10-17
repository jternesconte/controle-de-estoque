package com.example.controle_de_estoque.controllers;

import com.example.controle_de_estoque.models.entities.Categoria;
import com.example.controle_de_estoque.models.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

@Controller
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> getAllCategorias() {
        return (List<Categoria>) categoriaRepository.findAll();
    }

    public List<Categoria> getAtivos() {
        List<Categoria> categoriasAtivas = categoriaRepository.findByflAtivoTrue();
        return ResponseEntity.ok(categoriasAtivas).getBody();
    }

    public List<Categoria> getInativos() {
        List<Categoria> categoriasInativas = categoriaRepository.findByflAtivoFalse();
        return ResponseEntity.ok(categoriasInativas).getBody();
    }

    public Categoria novaCategoria(Categoria categoriaDetalhes) {

        Categoria categoria = new Categoria(
                categoriaDetalhes.getNome(),
                categoriaDetalhes.getDescricao(),
                true
        );

        return categoriaRepository.save(categoria);
    }

    public Categoria editarCategoria(int id, Categoria categoriaDetalhes) {
        Optional<Categoria> optionalCategoria =  categoriaRepository.findById(id);

        if(optionalCategoria.isPresent()) {
            Categoria categoriaExistente = optionalCategoria.get();
            categoriaExistente.setNome(categoriaExistente.getNome());
            categoriaExistente.setDescricao(categoriaExistente.getDescricao());
            categoriaExistente.setFlAtivo(categoriaDetalhes.getFlAtivo());

            return categoriaRepository.save(categoriaExistente);
        } else {
            throw new RuntimeException("Categoria não encontrada com o id: " + id);
        }

    }
}
