package com.example.controle_de_estoque.models.entities;

import com.example.controle_de_estoque.utils.BooleanToStringConverter;
import jakarta.persistence.*;

@Entity
@Table(name = "categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 100, nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Convert(converter = BooleanToStringConverter.class)
    @Column(name = "fl_ativo", nullable = false)
    private boolean flAtivo;

    public Categoria() {

    }

    public Categoria(String nome, String descricao, boolean flAtivo) {
        this.nome = nome;
        this.descricao = descricao;
        this.flAtivo = flAtivo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public boolean isFlAtivo() {
        return flAtivo;
    }

    public void setFlAtivo(boolean flAtivo) {
        this.flAtivo = flAtivo;
    }
}
