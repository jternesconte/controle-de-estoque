import { useState } from 'react';
import { Product } from '@/types/product';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { DialogHeader } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';

const EntradaSaidaModal = ({ product, onClose }: { product: Product, onClose: () => void }) => {
  const [entrada, setEntrada] = useState<string>('');
  const [saida, setSaida] = useState<string>('');

  const handleSubmitEntryandExit = async () => {
    try {
      let response;
      if (entrada !== '') {
        response = await fetch(`http://127.0.0.1:8080/api/entrada/novaEntrada/${product.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantidade: entrada }),
        });
      } else if (saida !== '') {
        response = await fetch(`http://127.0.0.1:8080/api/saida/novaSaida/${product.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantidade: Number(saida) }),
        });
      }

      if (response && !response.ok) {
        throw new Error('Erro ao processar a transação');
      }
      toast({
        title: entrada !== '' ? "Entrada realizada com sucesso." : "Saida realizada com sucesso.",
      });

      window.location.reload();
      onClose();
    } catch (error: any) {
      toast({
        title: error.message,
      });
    }
  };

  const handleEntradaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEntrada(value.replace(/\D/g, ''));
  };

  const handleSaidaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSaida(value.replace(/\D/g, ''));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 flex items-center justify-center bg-black/80">

        <div className="flex flex-col gap-4 bg-white px-20 py-10 rounded-lg">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
          </DialogHeader>
          <div className='text-center'>
            <strong>Quantidade Atual:</strong> {product.quantidade}
          </div>
          <Input
            type="text"
            placeholder="Quantidade de Entrada"
            value={entrada}
            onChange={handleEntradaChange}
            disabled={saida != ''}
          />
          <Input
            type="text"
            placeholder="Quantidade de Saída"
            value={saida}
            onChange={handleSaidaChange}
            disabled={entrada != ''}
          />
          <Button onClick={handleSubmitEntryandExit}>Confirmar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EntradaSaidaModal;