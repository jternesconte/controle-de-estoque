import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";

export const ListLowQuantity = () => {
  const [dialogOpenlowQuantity, setDialogOpenlowQuantity] = useState(false);
  const [lowQuantitys, setlowQuantitys] = useState<Product[]>([]);
  const [loadinglowQuantity, setLoadinglowQuantity] = useState(true);
  const [errorlowQuantity, setErrorlowQuantity] = useState<string | null>(null);

  const { formatDate } = useProducts();

  const fetchLowQuantityProducts = async () => {
    setLoadinglowQuantity(true);
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/produto/getAllProdutos`);
      if (!response.ok) {
        throw new Error("Error fetching products");
      }
      const data: Product[] = await response.json();
      // Filtra os produtos com quantidade menor que 10
      const lowQuantityProducts = data.filter(product => product.quantidade < 10);
      // Ordena os produtos filtrados por um campo específico, como id
      const sortedLowQuantityProducts = lowQuantityProducts.sort((a, b) => a.id - b.id);
      setlowQuantitys(sortedLowQuantityProducts);
    } catch (err: any) {
      setErrorlowQuantity(err.message);
      toast({
        title: "Erro ao carregar produtos",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoadinglowQuantity(false);
    }
  };

  useEffect(() => {
    fetchLowQuantityProducts();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastEntry = currentPage * itemsPerPage;
  const indexOfFirstEntry = indexOfLastEntry - itemsPerPage;
  const currentEntries = lowQuantitys.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(lowQuantitys.length / itemsPerPage);
  const maxVisiblePages = 5;

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Dialog open={dialogOpenlowQuantity} onOpenChange={setDialogOpenlowQuantity}>
      <DialogTrigger>
        <Button>Baixo estoque</Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl min-h-72">
        <DialogHeader>
          <DialogTitle>Lista de produtos com baixo estoque</DialogTitle>
        </DialogHeader>

        {loadinglowQuantity ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader">Loading...</div>
          </div>
        ) : errorlowQuantity ? (
          <div className="text-red-500 text-center">Ocorreu algum erro ({errorlowQuantity})</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Nome</TableHead>
                  <TableHead className="w-[200px] text-center">Categoria</TableHead>
                  <TableHead className="text-center">Quantidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEntries.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{product.nome}</TableCell>
                    <TableCell className="text-center">{product.categoriaId?.nome}</TableCell>
                    <TableCell className="text-center">{product.quantidade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) {
                        handlePageChange(currentPage - 1);
                      }
                    }}
                    className={currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : ''}
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(maxVisiblePages, totalPages) }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(index + 1);
                      }}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                    className={currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};