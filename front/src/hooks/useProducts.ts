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

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/produto/getAllProdutos`);
      if (!response.ok) {
        throw new Error("Error fetching products");
      }
      const data: Product[] = await response.json();
      // Ordena os produtos por um campo específico, como id
      const sortedProducts = data.sort((a, b) => a.id - b.id);
      setProducts(sortedProducts);
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
  };

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
          preco: product.preco,
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

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenEditDialog(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);

    const formattedTime = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);

    return `${formattedDate} - ${formattedTime}`;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loadingProducts,
    errorProducts,
    addProduct,
    editProduct,
    dialogOpenProducts,
    setDialogOpenProducts,
    handleEditProduct,
    openEditDialog,
    formatDate,
    setOpenEditDialog,
    selectedProduct,
    setSelectedProduct,
    refreshProducts: fetchProducts,
  };
};
