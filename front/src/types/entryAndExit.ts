export interface Entrada {
  produtoId: {
    nome: string;
  };
  quantidade: number;
  dataEntrada: string;
}

export interface Saida {
  produtoId: {
    nome: string;
  };
  quantidade: number;
  dataSaida: string;
}
