export interface Category {
  id: number;
  nome: string;
  descricao: string;
  flAtivo: "S" | "N";
}

export interface NewCategory {
  nome: string;
  descricao: string;
  flAtivo: "S" | "N";
}
