import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/use-product";
import { Input } from "../ui/input";

export const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  // const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const { addProduct, fetchCategories, category } = useProducts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Chamando a função do hook para adicionar o produto
    await addProduct(
      {
        nome: name,
        descricao: description,
        preco: price,
        quantidade: quantity,
        categoria_id: selectedCategoryId,
        fl_ativo: "S"
      },
      selectedCategoryId // Usando o id da categoria selecionada
    );

    // Resetando os campos do formulário
    setName('');
    setDescription('');
    setPrice(0);
    setQuantity(0);
    setSelectedCategoryId(0); // Resetando a categoria selecionada
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mb-5">Adicionar produto</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            inputMode="numeric"
            pattern="[0-9]*"
            required
          />
          <Input
            type="number"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            inputMode="numeric"
            required
          />

          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
            required
          >
            <option value="">Selecione uma categoria</option>
            {category.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nome}
              </option>
            ))}
          </select>

          <Button type="submit">Add Product</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}