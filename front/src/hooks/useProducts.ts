import { useState, useEffect, useCallback } from "react";
import { useToast } from "./use-toast";
import { NewProduct, Product } from "@/types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);
  const [dialogOpenProducts, setDialogOpenProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const { toast } = useToast();

  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/produto/getAllProdutos`);
      if (!response.ok) {
        throw new Error("Error fetching products");
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err: any) {
      setErrorProducts(err.message);
      toast({
        title: "Erro ao carregar produtos",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoadingProducts(false);
    }
  }, [toast]);

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
      await fetchProducts();
      toast({
        title: "Produto adicionado com sucesso.",
      });
    } catch (err: any) {
      setErrorProducts(err.message);
      toast({
        title: "Erro ao adicionar o produto.",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const editProduct = async (product: Product) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/produto/alterarItem/${product.id}/${product.categoriaId.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: product.nome,
          descricao: product.descricao,
          flAtivo: product.flAtivo,
          // Adicione outros campos que precisam ser atualizados
        }),
      });
      if (!response.ok) {
        throw new Error("Error editing product");
      }
      const updatedProduct: Product = await response.json();
      setProducts((prevProducts) => prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
      toast({
        title: "Produto editado com sucesso.",
      });
    } catch (err: any) {
      toast({
        title: "Ocorreu algum erro ao editar o produto.",
        description: err.message,
        variant: "destructive",
      });
      setErrorProducts(err.message);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/produto/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting product");
      }
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      toast({
        title: "Produto deletado com sucesso.",
      });
    } catch (err: any) {
      setErrorProducts(err.message);
      toast({
        title: "Erro ao deletar o produto.",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    console.log(product);
    setOpenEditDialog(true);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loadingProducts,
    errorProducts,
    addProduct,
    editProduct,
    deleteProduct,
    dialogOpenProducts,
    setDialogOpenProducts,
    handleEditProduct,
    openEditDialog,
    setOpenEditDialog,
    selectedProduct,
    setSelectedProduct,
    refreshProducts: fetchProducts,
  };
};
