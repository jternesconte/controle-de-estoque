package com.example.controle_de_estoque.models;

public class Product {

    private int id;
    private String nmProduto;
    private int vlProduto;
    private String categoria;

    public Product(int id, String nmProduto, int vlProduto, String categoria) {
        this.id = id;
        this.nmProduto = nmProduto;
        this.vlProduto = vlProduto;
        this.categoria = categoria;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNmProduto() {
        return nmProduto;
    }

    public void setNmProduto(String nmProduto) {
        this.nmProduto = nmProduto;
    }

    public int getVlProduto() {
        return vlProduto;
    }

    public void setVlProduto(int vlProduto) {
        this.vlProduto = vlProduto;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
}
