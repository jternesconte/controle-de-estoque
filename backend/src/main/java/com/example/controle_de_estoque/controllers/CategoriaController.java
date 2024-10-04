package com.example.controle_de_estoque.controllers;

import com.example.controle_de_estoque.models.entities.Categoria;
import com.example.controle_de_estoque.models.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Categoria novaCategoria(Categoria categoriaDetalhes) {

        Categoria categoria = new Categoria(
                categoriaDetalhes.getNome(),
                categoriaDetalhes.getDescricao(),
                true
        );

        return categoriaRepository.save(categoria);
    }

    public Categoria editarCategoria(int id, boolean flAtivo) {
        Optional<Categoria> optionalCategoria =  categoriaRepository.findById(id);

        if(optionalCategoria.isPresent()) {
            Categoria categoriaExistente = optionalCategoria.get();
            categoriaExistente.setNome(categoriaExistente.getNome());
            categoriaExistente.setDescricao(categoriaExistente.getDescricao());
            categoriaExistente.setFlAtivo(flAtivo);

            return categoriaRepository.save(categoriaExistente);
        } else {
            throw new RuntimeException("Categoria não encontrada com o id: " + id);
        }

    }
}
