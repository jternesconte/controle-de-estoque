import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { Input } from "../ui/input";

export const CreateCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dialogOpenCategories, setDialogOpenCategories] = useState(false);

  const { addCategory } = useCategories();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addCategory(
      {
        nome: name,
        descricao: description
      }
    );
    setName('');
    setDescription('');
    setDialogOpenCategories(false)
    window.location.reload();
  };

  return (
    <Dialog open={dialogOpenCategories} onOpenChange={setDialogOpenCategories}>
      <DialogTrigger>
        <Button>Adicionar categoria</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar categoria</DialogTitle>
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
          <Button type="submit">Adicionar Categoria</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}