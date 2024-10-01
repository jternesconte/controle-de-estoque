package com.example.controle_de_estoque.models.repositories;

import com.example.controle_de_estoque.models.entities.Produto;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProdutoRepository extends CrudRepository<Produto, Integer> {
    List<Produto> findByflAtivoTrue();
    List<Produto> findByflAtivoFalse();
}
