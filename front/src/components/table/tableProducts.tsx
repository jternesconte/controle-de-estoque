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
import { useState } from "react";
import EntradaSaidaModal from "../entradaEsaida/entradaSaida";


export function TableProducts() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const { products, loadingProducts, errorProducts, handleEditProduct, openEditDialog, setOpenEditDialog, selectedProduct, setSelectedProduct, editProduct } = useProducts()

  if (loadingProducts) return <p>Carregando...</p>;
  if (errorProducts) return <p>Erro: ocorreu algum erro ao carregar os produtos. ({errorProducts})</p>;

  const handleSubmitProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct) {
      editProduct(selectedProduct);
      setOpenEditDialog(false);
    }
  };

  const toggleProductActiveStatus = async (product: Product) => {
    const updatedProduct = { ...product, flAtivo: !product.flAtivo }; // Inverte o estado de flAtivo

    try {
      await editProduct(updatedProduct); // Chama a função editProduct existente
    } catch (error) {
      console.error("Erro ao alternar o estado de flAtivo:", error);
    }
  };

  return (
    <>
      <Table className="overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Nome</TableHead>
            {/* <TableHead>Descrição</TableHead> */}
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">Quantidade</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-right">Entrada/Saida</TableHead>
            <TableHead className="text-right">Desativo/Ativo</TableHead>
            <TableHead className="text-right">Editar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.nome}</TableCell>
              {/* <TableCell>{product.descricao}</TableCell> */}
              <TableCell>{product.categoriaId.nome}</TableCell>

              <TableCell className="text-center translate-x-5">{product.quantidade}</TableCell>
              <TableCell className="text-right">R$ {product.preco}</TableCell>

              <TableCell className="text-center translate-x-7">
                <Switch checked={product.flAtivo} onCheckedChange={() => toggleProductActiveStatus(product)} />
              </TableCell>

              <TableCell className="text-right">
                <EntradaSaidaModal product={product} />
              </TableCell>

              <TableCell className="text-right">
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

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
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
                type="number"
                placeholder="quantidade"
                value={selectedProduct?.preco}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, preco: e.target.value })}
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
