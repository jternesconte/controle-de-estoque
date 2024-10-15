export interface Category {
  id: number;
  nome: string;
  descricao: string;
  fl_ativo: boolean;
}

export interface NewCategory {
  nome: string;
  descricao: string;
  fl_ativo?: boolean;
}
