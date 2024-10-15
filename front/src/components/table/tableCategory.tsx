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

export function TableCategory() {
  const { categories, loadingCategories, errorCategories } = useCategories();

  if (loadingCategories) return <p>Loading...</p>;
  if (errorCategories) return <p>Error: {errorCategories}</p>;

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
              <Switch checked={category.fl_ativo === "S"} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
      </TableFooter>
    </Table>
  )
}
