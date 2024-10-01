package com.example.controle_de_estoque.models.entities;

import com.example.controle_de_estoque.utils.BooleanToStringConverter;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 100, nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;

    @Column(name = "quantidade", nullable = false, columnDefinition = "int4 default 0")
    private int quantidade;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoriaId;

    @Convert(converter = BooleanToStringConverter.class)
    @Column(name = "fl_ativo", nullable = false)
    private Boolean flAtivo;


    public Produto() {

    }

    public Produto(String nome, String descricao, BigDecimal preco, int quantidade, Categoria categoriaId, Boolean flAtivo) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.categoriaId = categoriaId;
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

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public Categoria getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Categoria categoriaId) {
        this.categoriaId = categoriaId;
    }

    public Boolean getFlAtivo() {
        return flAtivo;
    }

    public void setFlAtivo(Boolean flAtivo) {
        this.flAtivo = flAtivo;
    }
}
