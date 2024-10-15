import { CreateProduct } from "@/components/createProduct/createProduct"
import { TableProducts } from "@/components/table/tableProducts"
import { Toaster } from "@/components/ui/toaster"
import { Link } from "react-router-dom"

export const Product = () => {

  return (
    <main className="max-w-7xl m-auto py-10">
      <div className="flex justify-between">
        <div>
          <CreateProduct />
        </div>
        <Link to="/categories" className="underline font-medium">Categorias</Link>
      </div>
      <TableProducts />
      <Toaster />
    </main>
  )
}