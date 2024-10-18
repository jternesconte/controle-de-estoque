export interface Category {
  id: number;
  nome: string;
  descricao: string;
  flAtivo: boolean;
}

export interface NewCategory {
  nome: string;
  descricao: string;
  flAtivo?: boolean;
}
