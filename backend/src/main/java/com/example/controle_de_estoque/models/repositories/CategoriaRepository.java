package com.example.controle_de_estoque.models.repositories;

import com.example.controle_de_estoque.models.entities.Categoria;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CategoriaRepository extends CrudRepository<Categoria, Integer> {
    List<Categoria> findByflAtivoTrue();
    List<Categoria> findByflAtivoFalse();
}
