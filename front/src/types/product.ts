import { Category } from "./category";

export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  categoriaId: Category;
  flAtivo: boolean;
}

export interface NewProduct {
  nome: string;
  descricao: string;
  // categoria_id: Category;
  categoria_id: number;
  preco: number;
  quantidade: number;
  flAtivo?: boolean;
}
