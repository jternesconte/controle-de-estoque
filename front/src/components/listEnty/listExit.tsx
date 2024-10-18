import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Saida } from "@/types/entryAndExit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { useProducts } from "@/hooks/useProducts";

export const ListExit = () => {
  const [dialogOpenExit, setDialogOpenExit] = useState(false);
  const [exits, setExits] = useState<Saida[]>([]);
  const [loadingExit, setLoadingExit] = useState(true);
  const [errorExit, setErrorExit] = useState<string | null>(null);

  const { formatDate } = useProducts();

  const fetchExit = async () => {
    setLoadingExit(true);
    setErrorExit(null);
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/saida/getAllSaidas`);
      if (!response.ok) {
        throw new Error("Error fetching exits");
      }
      const data = await response.json();
      setExits(data);
    } catch (err: any) {
      setErrorExit(err.message);
    } finally {
      setLoadingExit(false);
    }
  };

  useEffect(() => {
    fetchExit();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastEntry = currentPage * itemsPerPage;
  const indexOfFirstEntry = indexOfLastEntry - itemsPerPage;
  const currentEntries = exits.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(exits.length / itemsPerPage);
  const maxVisiblePages = 5;

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Dialog open={dialogOpenExit} onOpenChange={setDialogOpenExit}>
      <DialogTrigger>
        <Button>Saídas</Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Lista de Saídas</DialogTitle>
        </DialogHeader>

        {loadingExit ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader">Loading...</div>
          </div>
        ) : errorExit ? (
          <div className="text-red-500 text-center">{errorExit}</div>
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
                {currentEntries.map((exit, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{exit.produtoId.nome}</TableCell>
                    <TableCell className="text-center min-w-40">{exit.quantidade}</TableCell>
                    <TableCell className="text-center w-52">{formatDate(exit.dataSaida)}</TableCell>
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