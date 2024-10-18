import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "../ui/switch";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types/category";

export function TableCategory() {
  const { categories, loadingCategories, errorCategories, editCategory } = useCategories();

  if (loadingCategories) return <p>Carregando...</p>;
  if (errorCategories) return <p>Erro: ocorreu algum erro ao carregar as categorias.({errorCategories})</p>;


  const toggleCategoryActiveStatus = async (category: Category) => {
    const updatedProduct = { ...category, flAtivo: !category.flAtivo }; // Inverte o estado de flAtivo

    try {
      await editCategory(updatedProduct); // Chama a função editProduct existente
    } catch (error) {
      console.error("Erro ao alternar o estado de flAtivo:", error);
    }
  };

  return (
    <Table className="overflow-hidden">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[350px]">Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead className="text-right">Desativado/Ativo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.nome}</TableCell>
            <TableCell>{category.descricao}</TableCell>
            <TableCell className="text-right -translate-x-6">
              <Switch checked={category.flAtivo} onCheckedChange={() => toggleCategoryActiveStatus(category)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
      </TableFooter>
    </Table>
  )
}
