import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <main className="m-auto max-w-3xl h-screen flex flex-col gap-4 items-center justify-center -mb-52">
      <h1 className="font-semibold text-xl mb-4">Controle de Estoque</h1>
      <Link to={"/products"} >
        <Button className="w-44 h-12">Produtos</Button>
      </Link>
      <Link to={"/categories"} >
        <Button className="w-44 h-12 mb-40">Categorias</Button>
      </Link>
    </main>
  )
}