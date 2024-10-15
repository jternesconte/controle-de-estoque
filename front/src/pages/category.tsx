import { CreateCategory } from "@/components/createCategory/createCategory"
import { TableCategory } from "@/components/table/tableCategory"
import { Toaster } from "@/components/ui/toaster"
import { Link } from "react-router-dom"

export const Category = () => {
  return (
    <main className="max-w-7xl m-auto py-10">
      <div className="flex justify-between mb-4">
        <CreateCategory />
        <Link to="/products" className="underline font-medium">Produtos</Link>
      </div>
      <TableCategory />
      <Toaster />
    </main>
  )
}