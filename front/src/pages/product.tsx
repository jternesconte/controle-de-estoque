import { CreateProduct } from "@/components/createProduct/createProduct"
import { ListEntry } from "@/components/listEnty/listEntry"
import { ListExit } from "@/components/listEnty/listExit"
import { ListLowQuantity } from "@/components/listLowQuantity/listLowQuantity"
import { TableProducts } from "@/components/table/tableProducts"
import { Toaster } from "@/components/ui/toaster"
import { Link } from "react-router-dom"

export const Product = () => {

  return (
    <main className="container-full">
      <div className="flex justify-between mb-10">
        <div className="flex gap-6">
          <CreateProduct />
          <ListEntry />
          <ListExit />
          <ListLowQuantity />
        </div>
        <Link to="/categories" className="underline font-medium">Categorias</Link>
      </div>
      <TableProducts />
      <Toaster />
    </main>
  )
}