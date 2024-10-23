import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useProducts } from "@/hooks/useProducts";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";


export function TableProducts() {
  const [entrada, setEntrada] = useState<string>('');
  const [saida, setSaida] = useState<string>('');
  const [openEditDialogStock, setOpenEditDialogStock] = useState(false);

  const { products, refreshProducts, loadingProducts, errorProducts, handleEditProduct, openEditDialog, setOpenEditDialog, selectedProduct, setSelectedProduct, editProduct } = useProducts()

  if (loadingProducts) return <p>Carregando...</p>;
  if (errorProducts) return <p>Erro: ocorreu algum erro ao carregar os produtos. ({errorProducts})</p>;

  const handleSubmitProductEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct) {
      await editProduct(selectedProduct);
      setOpenEditDialog(false);
    }
  };

  const toggleProductActiveStatus = async (product: Product) => {
    const updatedProduct = { ...product, flAtivo: !product.flAtivo };

    try {
      await editProduct(updatedProduct);
    } catch (error) {
      console.error("Erro ao alternar o estado de flAtivo:", error);
    }
  };

  // ENTRADA / SAIDA

  const handleSubmitEntryAndExit = async () => {
    if (selectedProduct) {
      try {
        let response;
        if (entrada !== '') {
          response = await fetch(`http://127.0.0.1:8080/api/entrada/novaEntrada/${selectedProduct.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantidade: entrada }),

          });

          setEntrada('')
        } else if (saida !== '') {
          response = await fetch(`http://127.0.0.1:8080/api/saida/novaSaida/${selectedProduct.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantidade: Number(saida) }),
          });
          setSaida('')
        }
        if (response && !response.ok) {
          throw new Error('Erro ao processar a transação');
        }

        toast({
          title: entrada !== '' ? "Entrada realizada com sucesso." : "Retirada realizada com sucesso.",
        });

        setOpenEditDialogStock(false)
      } catch (error: any) {
        console.error('Erro:', error.message);
        toast({
          title: error.message,
        });
      }
    }
    refreshProducts()
  };

  const handleEntradaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Retém apenas os dígitos
    setEntrada(value.replace(/\D/g, ''));
  };

  const handleSaidaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Retém apenas os dígitos
    setSaida(value.replace(/\D/g, ''));
  };

  const openStockModal = (product: Product) => {
    setSelectedProduct(product);
    setOpenEditDialogStock(true)
  };

  const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Retém apenas os dígitos e um único ponto decimal
    const numericValue = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    setSelectedProduct({ ...selectedProduct, preco: numericValue });
  };

  return (
    <>
      <Table className="overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Nome</TableHead>
            <TableHead className="">Categoria</TableHead>
            <TableHead className="text-center">Preço</TableHead>
            <TableHead className="text-center">Quantidade</TableHead>
            <TableHead className="text-center">Entrada/Saida</TableHead>
            <TableHead className="text-center">Desativo/Ativo</TableHead>
            <TableHead className="text-center">Editar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium w-[250px]">{product.nome}</TableCell>
              <TableCell>{product.categoriaId.nome}</TableCell>

              <TableCell className="text-center">R$ {product.preco}</TableCell>
              <TableCell className="text-center">{product.quantidade}</TableCell>

              <TableCell className="text-center">
                <button onClick={() => openStockModal(product)}>Entrada/Saída</button>
              </TableCell>

              <TableCell className="text-center ">
                <Switch checked={product.flAtivo} onCheckedChange={() => toggleProductActiveStatus(product)} />
              </TableCell>

              <TableCell className="text-center">
                <button onClick={() => handleEditProduct(product)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        </TableFooter>
      </Table>

      {/* MODAL ENTRA E SAIDA */}
      <Dialog open={openEditDialogStock} onOpenChange={setOpenEditDialogStock}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Entrada e Saida</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 bg-white px-20 py-10 rounded-lg">

            <div className='text-center'>
              <strong>Quantidade Atual:</strong> {selectedProduct?.quantidade}
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

            <Button onClick={handleSubmitEntryAndExit}>Confirmar</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL EDIT PRODUTC */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
          </DialogHeader>
          <form className="flex flex-col gap-4" onSubmit={handleSubmitProductEdit}>
            <div>
              <label htmlFor="">nome</label>
              <Input
                type="text"
                placeholder="nome"
                value={selectedProduct?.nome}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, nome: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="">descrição</label>
              <Input
                type="text"
                placeholder="descrição"
                value={selectedProduct?.descricao}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, descricao: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="">Preço</label>
              <Input
                type="text"
                placeholder="quantidade"
                value={selectedProduct?.preco}
                onChange={handlePrecoChange}
                required
              />
            </div>
            <Button type="submit">Salvar Alterações</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

