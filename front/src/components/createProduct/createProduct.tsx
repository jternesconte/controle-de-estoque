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
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [price, setPrice] = useState("");
  // const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);


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
        quantidade: quantity,
        categoria_id,
        fl_ativo: "S"
      },
      Number(selectedCategoryId)
    );

    setDialogOpenProducts(false);
    setName('');
    setDescription('');
    setPrice('');
    setQuantity(0);
    setSelectedCategoryId("");
  };

  return (
    <Dialog open={dialogOpenProducts} onOpenChange={setDialogOpenProducts}>
      <DialogTrigger>
        <Button className="mb-5">Adicionar produto</Button>
      </DialogTrigger>

      <DialogContent>
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
            onChange={(e) => setPrice(e.target.value)}
            inputMode="numeric"
            pattern="[0-9]*"
            required
          />
          <label htmlFor="">quantidade</label>
          <Input
            type="number"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            inputMode="numeric"
            required
          />

          <label htmlFor="">categoria</label>
          {/* <Select

            required
          >
            <SelectTrigger >
              <SelectValue placeholder="Categoria" value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)} />
            </SelectTrigger>
            <SelectContent>
              {category.map((category) => (
                <SelectItem key={category.id} value={(category.id).toString()}>
                  {category.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId((e.target.value))}
            required
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