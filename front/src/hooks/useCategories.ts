// hooks/useCategories.ts
import { useState, useEffect } from "react";
import { useToast } from "./use-toast";
import { Category, NewCategory } from "@/types/category";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);

  const { toast } = useToast();

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/categoria/getAllCategorias`);
      if (!response.ok) {
        throw new Error("Error fetching categories");
      }
      const data: Category[] = await response.json();
      setCategories(data);
    } catch (err: any) {
      setErrorCategories(err.message);
    } finally {
      setLoadingCategories(false);
    }
  };

  const addCategory = async (newCategory: NewCategory) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/categoria/adicionarCategoria`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
      if (!response.ok) {
        throw new Error("Error adding category");
      }
      fetchCategories();
      toast({
        title: "Categoria criada com sucesso.",
      });
    } catch (err: any) {
      setErrorCategories(err.message);
      toast({
        title: "Erro ao criar a categoria.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loadingCategories,
    errorCategories,
    addCategory,
  };
};