import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Entrada } from "@/types/entryAndExit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useProducts } from "@/hooks/useProducts";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

export const ListEntry = () => {
  const [dialogOpenEntry, setDialogOpenEntry] = useState(false);
  const [entrys, setEntrys] = useState<Entrada[]>([]);
  const [errorEntry, setErrorEntrys] = useState<string | null>(null);
  const [loadingEntrys, setLoadingEntrys] = useState(true);
  const { formatDate } = useProducts();

  const fetchEntrys = async () => {
    setLoadingEntrys(true)
    setErrorEntrys(null);
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/entrada/getAllEntradas`);
      if (!response.ok) {
        throw new Error("Error fetching products");
      }
      const data = await response.json();
      setEntrys(data);
    } catch (err: any) {
      setErrorEntrys(err.message);
    } finally {
      setLoadingEntrys(false);
    }
  };

  useEffect(() => {
    fetchEntrys();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastEntry = currentPage * itemsPerPage;
  const indexOfFirstEntry = indexOfLastEntry - itemsPerPage;
  const currentEntries = entrys.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(entrys.length / itemsPerPage);
  const maxVisiblePages = 5;

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Dialog open={dialogOpenEntry} onOpenChange={setDialogOpenEntry}>
      <DialogTrigger>
        <Button>Entradas</Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Lista de Entradas</DialogTitle>
        </DialogHeader>

        {loadingEntrys ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader">carregando...</div>
          </div>
        ) : errorEntry ? (
          <div className="text-red-500 text-center">{errorEntry}</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[600px]">Nome</TableHead>
                  <TableHead className="text-center">Saída</TableHead>
                  <TableHead className="text-center">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentEntries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{entry.produtoId.nome}</TableCell>
                    <TableCell className="text-center min-w-40">{entry.quantidade}</TableCell>
                    <TableCell className="text-center w-52">{formatDate(entry.dataEntrada)}</TableCell>
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
    // <Dialog open={dialogOpenEntry} onOpenChange={setDialogOpenEntry}>
    //   <DialogTrigger>
    //     <Button>Entradas</Button>
    //   </DialogTrigger>

    //   <DialogContent className="max-w-3xl">
    //     <DialogHeader>
    //       <DialogTitle>Lista de entradas</DialogTitle>
    //     </DialogHeader>

    //     <Table>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead className="w-[600px]">Nome</TableHead>
    //           <TableHead className="text-center">Entrada</TableHead>
    //           <TableHead className="text-center">data</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       {entrys.map((entry) => (
    //         <TableBody>
    //           <TableRow>
    //             <TableCell className="font-medium">{entry.produtoId.nome}</TableCell>
    //             <TableCell className="text-center min-w-40">{entry.quantidade}</TableCell>
    //             <TableCell className="text-center w-52">{formatDate(entry.dataEntrada)}</TableCell>
    //           </TableRow>
    //         </TableBody>
    //       ))}
    //     </Table>
    //   </DialogContent>
    // </Dialog>
  )
}