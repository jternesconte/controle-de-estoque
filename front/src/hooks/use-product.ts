// hooks/useProducts.ts
import { useState, useEffect } from "react";

interface Category {
  id: number;
  nome: string;
  flAtivo: "S" | "N";
}

interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  quantidade: number;
  categoria: number;
  flAtivo: "S" | "N";
}

interface NewProduct {
  nome: string;
  descricao: string;
  categoria_id: number;
  preco: number;
  quantidade: number;
  fl_ativo: "S" | "N";
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para obter todos os produtos
  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/produto/getAllProdutos`);
      if (!response.ok) {
        throw new Error("Error fetching products");
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/categoria/getAllCategorias`);
      if (!response.ok) {
        throw new Error("Error fetching products");
      }
      const data: Category[] = await response.json();
      setCategory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para adicionar um novo produto
  const addProduct = async (newProduct: NewProduct, categoriaId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/produto/adicionarProduto/${categoriaId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error("Error adding product");
      }
      fetchProducts(); // Atualiza a lista de produtos após adicionar
    } catch (err) {
      setError(err.message);
    }
  };

  // Função para deletar um produto
  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/produto/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting product");
      }
      fetchProducts(); // Atualiza a lista de produtos após deletar
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return {
    products,
    loading,
    error,
    category,
    addProduct,
    deleteProduct,
    fetchCategories,
  };
};
