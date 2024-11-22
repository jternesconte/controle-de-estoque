import { CreateCategory } from "@/components/createCategory/createCategory"
import { TableCategory } from "@/components/table/tableCategory"
import { Toaster } from "@/components/ui/toaster"
import { Link } from "react-router-dom"

export const Category = () => {
  return (
    <main className="container-full">
      <div className="flex justify-between mb-5">
        <CreateCategory />
        <Link to="/products" className="underline font-medium">Produtos</Link>
      </div>
      <TableCategory />
      <Toaster />
    </main>
  )
}