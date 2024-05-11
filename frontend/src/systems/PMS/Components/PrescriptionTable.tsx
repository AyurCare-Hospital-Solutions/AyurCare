import axios from "axios";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  TextField,
  TableSortLabel,
} from "@mui/material";

interface Prescription {
  id: string;
  patientName: string;
  diagnosis: string;
  dispensedDate: string;
  note: string;
  status: string;
}

type Order = "asc" | "desc";
type KeyOfPrescription =
  | "id"
  | "patientName"
  | "diagnosis"
  | "dispensedDate"
  | "note"
  | "status";

function PrescriptionTable() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("any");
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<KeyOfPrescription>("id");

  useEffect(() => {
    axios.get("/api/pms/getAllPrescription").then((response) => {
      setPrescriptions(response.data);
    });
  }, []);

  const handleRequestSort = (property: KeyOfPrescription) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getComparator = (
    order: Order,
    orderBy: KeyOfPrescription
  ): ((a: Prescription, b: Prescription) => number) => {
    return order === "desc"
      ? (a, b) =>
          a[orderBy] > b[orderBy] ? -1 : a[orderBy] < b[orderBy] ? 1 : 0
      : (a, b) =>
          a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
  };

  const stableSort = (
    array: Prescription[],
    comparator: (a: Prescription, b: Prescription) => number
  ): Prescription[] => {
    const stabilizedThis = array.map(
      (el, index) => [el, index] as [Prescription, number]
    );
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const filteredAndSortedPrescriptions = stableSort(
    prescriptions.filter((prescription) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      if (searchType === "any") {
        return Object.values(prescription).some((value) =>
          String(value).toLowerCase().includes(lowerCaseQuery)
        );
      }
      return String(prescription[searchType as keyof Prescription])
        .toLowerCase()
        .includes(lowerCaseQuery);
    }),
    getComparator(order, orderBy)
  );

  return (
    <>
      <Typography variant="h5">Prescription Section</Typography>
      <FormControl component="fieldset" style={{ margin: "20px 0" }}>
        <FormLabel component="legend">Search By</FormLabel>
        <RadioGroup
          row
          aria-label="search by"
          name="searchBy"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <FormControlLabel
            value="any"
            control={<Radio />}
            label="Any"
            defaultChecked
          />
          <FormControlLabel
            value="patientName"
            control={<Radio />}
            label="Patient Name"
          />
          <FormControlLabel
            value="diagnosis"
            control={<Radio />}
            label="Diagnosis"
          />
          <FormControlLabel
            value="dispensedDate"
            control={<Radio />}
            label="Dispensed Date"
          />
        </RadioGroup>
      </FormControl>
      <TextField
        variant="outlined"
        label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: 20 }}
      />
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
                  No
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "patientName"}
                  direction={order}
                  onClick={() => handleRequestSort("patientName")}
                >
                  Patient Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Diagnosis</TableCell>
              <TableCell>Dispensed Date</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Update Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedPrescriptions.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.patientName}</TableCell>
                <TableCell>{row.diagnosis}</TableCell>
                <TableCell>
                  {new Date(row.dispensedDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{row.note}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Button
                    sx={{
                      backgroundColor: "#0d4838",
                      fontSize: 10,
                      color: "white",
                      mr: 2,
                      "&:hover": { backgroundColor: "#0d4838", opacity: 0.7 },
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "red",
                      fontSize: 10,
                      color: "white",
                      "&:hover": { backgroundColor: "red", opacity: 0.7 },
                    }}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default PrescriptionTable;
