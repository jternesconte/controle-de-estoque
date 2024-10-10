import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CreateProduct } from "../createProduct/createProduct"
import { useProducts } from "@/hooks/use-product";

export function TableProducts() {
  const { products, loading, error, deleteProduct } = useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="max-w-6xl m-auto py-10">
      <div className="flex justify-between">
        <CreateProduct />
        <a href="/categories" className="underline font-medium">Categorias</a>
      </div>
      <Table className="overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Quantidade</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Actions</TableHead> {/* Adicionando coluna de ações */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.nome}</TableCell>
              <TableCell>{product.descricao}</TableCell>
              <TableCell>{product.categoria}</TableCell>
              <TableCell className="text-center">{product.quantidade}</TableCell>
              <TableCell className="text-right">R$ {product.preco}</TableCell>
              <TableCell className="text-right">
                <button onClick={() => deleteProduct(product.id)}>Delete</button> {/* Botão de deletar */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {/* <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">${products.reduce((acc, product) => acc + product.price, 0).toFixed(2)}</TableCell>
          </TableRow> */}
        </TableFooter>
      </Table>
    </section>
  )
}
