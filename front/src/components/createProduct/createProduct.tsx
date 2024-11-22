import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Input } from "../ui/input";
import { useCategories } from "@/hooks/useCategories";

export const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const { addProduct, dialogOpenProducts, setDialogOpenProducts } = useProducts();
  const { categories } = useCategories();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoria_id = Number(selectedCategoryId)

    await addProduct(
      {
        nome: name,
        descricao: description,
        preco: Number(price),
        quantidade: Number(quantity),
        categoria_id
      },
      categoria_id
    );

    setDialogOpenProducts(false);
    setName('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setSelectedCategoryId('');
    window.location.reload();
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    setQuantity(numericValue);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    setPrice(numericValue);
  };

  return (
    <Dialog open={dialogOpenProducts} onOpenChange={setDialogOpenProducts}>
      <DialogTrigger>
        <Button>Adicionar produto</Button>
      </DialogTrigger>

      <DialogContent aria-description="modal de criar produto">
        <DialogHeader>
          <DialogTitle>Criar produto</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label htmlFor="">nome</label>
          <Input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="">descrição</label>
          <Input
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label htmlFor="">preço</label>
          <Input
            type="text"
            placeholder="Preço"
            value={price}
            onChange={handlePriceChange}
            inputMode="numeric"
            pattern="[0-9]*"
            required
          />
          <label htmlFor="">quantidade</label>
          <Input
            type="text"
            placeholder="Quantidade"
            value={quantity}
            onChange={handleQuantityChange}
            inputMode="numeric"
            required
          />

          <label htmlFor="">categoria</label>
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId((e.target.value))}
            required
            className="w-full p-[6px] border-[1.5px] border-[#e2e2e2f2] rounded-md"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nome}
              </option>
            ))}
          </select>

          <Button type="submit" className="mt-6">Adicionar Produto</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}