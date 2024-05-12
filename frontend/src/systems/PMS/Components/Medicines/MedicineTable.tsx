import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";

interface MedicineItem {
  name: string;
}

interface Medicine {
  id: string;
  Medicine: {
    Item: MedicineItem;
  };
  expire_date: string;
  stockLevel: number;
}

interface MedicineTableProps {
  medicine: Medicine[];
  query: string;
}

type Order = "asc" | "desc";
type KeyOfMedicine = "id" | "Medicine.Item.name" | "expire_date" | "stockLevel";

const getComparator = <Key extends KeyOfMedicine>(
  order: Order,
  orderBy: Key
): ((a: Medicine, b: Medicine) => number) => {
  return (a, b) => {
    let valueA: string | number = a[orderBy as keyof Medicine] as
      | string
      | number;
    let valueB: string | number = b[orderBy as keyof Medicine] as
      | string
      | number;

    if (orderBy === "Medicine.Item.name") {
      valueA = a.Medicine.Item.name;
      valueB = b.Medicine.Item.name;
    }

    if (order === "desc") {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    } else {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    }
  };
};

const stableSort = (
  array: Medicine[],
  comparator: (a: Medicine, b: Medicine) => number
): Medicine[] => {
  const stabilizedThis = array.map(
    (el, index) => [el, index] as [Medicine, number]
  );
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export default function MedicineTable({ medicine, query }: MedicineTableProps) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<KeyOfMedicine>("id");

  const handleRequestSort = (property: KeyOfMedicine) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredAndSortedMedicine = stableSort(
    medicine.filter((m) =>
      m.Medicine.Item.name.toLowerCase().includes(query.toLowerCase())
    ),
    getComparator(order, orderBy)
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={order}
                  onClick={() => handleRequestSort("id")}
                >
                  Medicine No
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "Medicine.Item.name"}
                  direction={order}
                  onClick={() => handleRequestSort("Medicine.Item.name")}
                >
                  Medicine Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "stockLevel"}
                  direction={order}
                  onClick={() => handleRequestSort("stockLevel")}
                >
                  Stock Level
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedMedicine.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.Medicine.Item.name}</TableCell>
                <TableCell>{row.expire_date}</TableCell>
                <TableCell>{row.stockLevel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
