package com.example.controle_de_estoque.models.repositories;

import com.example.controle_de_estoque.models.entities.Entrada;
import org.springframework.data.repository.CrudRepository;

public interface EntradaRepository extends CrudRepository<Entrada, Integer> {
}
