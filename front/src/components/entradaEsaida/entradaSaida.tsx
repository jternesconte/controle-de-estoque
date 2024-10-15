import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Product } from '@/types/product';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { DialogHeader } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';

const EntradaSaidaModal = ({ product }: { product: Product }) => {
  const [entrada, setEntrada] = useState<number | null>(null);
  const [saida, setSaida] = useState<number | null>(null);
  const { refreshProducts } = useProducts();

  const handleSubmit = async () => {
    try {
      let response;
      if (entrada !== null) {
        response = await fetch(`http://127.0.0.1:8080/api/entrada/novaEntrada/${product.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantidade: entrada }),
        });
        toast({
          title: "Entrada realizada com sucesso.",
        });
      } else if (saida !== null) {
        response = await fetch(`http://127.0.0.1:8080/api/saida/novaSaida/${product.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantidade: saida }),
        });
        toast({
          title: "Retirada realizada com sucesso.",
        });
      }
      if (response && !response.ok) {
        throw new Error('Erro ao processar a transação');
      }

      refreshProducts();
    } catch (error: any) {
      console.error('Erro:', error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="">entrada/saida</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Entrada/Saída de Produto: {product.nome}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <strong>Quantidade Atual:</strong> {product.quantidade}
          </div>
          <Input
            type="number"
            placeholder="Quantidade de Entrada"
            value={entrada ?? ''}
            onChange={(e) => {
              setEntrada(Number(e.target.value));
              setSaida(null);
            }}
            disabled={saida !== null}
          />
          <Input
            type="number"
            placeholder="Quantidade de Saída"
            value={saida ?? ''}
            onChange={(e) => {
              setSaida(Number(e.target.value));
              setEntrada(null);
            }}
            disabled={entrada !== null}
          />
          <Button onClick={handleSubmit}>Confirmar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EntradaSaidaModal;