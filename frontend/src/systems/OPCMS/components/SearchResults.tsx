import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";

interface Prescription {
  id: number;
  PatientId: string;
  Patient: { name: string }; // Interface for associated Patient object
  dispensed_date: Date;
  // ... other prescription details (diagnosis, note, etc.)
}

interface SearchResultsProps {
  results: Prescription[];
}

function SearchResults({ results }: SearchResultsProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient ID</TableCell>
            <TableCell>Prescription ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Dispensed Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((prescription) => (
            <TableRow key={prescription.id}>
              <TableCell>{prescription.PatientId}</TableCell>
              <TableCell>{prescription.id}</TableCell>
              <TableCell>{prescription.Patient.name}</TableCell>
              <TableCell>
                {prescription.dispensed_date?.toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button variant="contained" size="small" sx={{mr:1}}>
                  Show More
                </Button>
                <Button variant="contained" size="small">
                  Download
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SearchResults;
