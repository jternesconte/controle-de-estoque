package com.example.controle_de_estoque.models.repositories;

import com.example.controle_de_estoque.models.entities.Categoria;
import org.springframework.data.repository.CrudRepository;

public interface CategoriaRepository extends CrudRepository<Categoria, Integer> {
}
