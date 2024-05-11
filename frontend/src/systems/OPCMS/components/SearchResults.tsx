import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import PatientDataSeeMore from "./PatientDataSeeMore";
import { useState } from "react";

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
  const [moreOpen, setOpen] = useState(false);
  const handleMoreOpen = () => {
    setOpen(true);
  };
  const handleMoreClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
                  <Button 
                    variant="contained" 
                    size="small" 
                    sx={{mr:1}}
                    onClick={handleMoreOpen}
                  >
                    Show More
                  </Button>
                  <Button>
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PatientDataSeeMore open={moreOpen} handleClose={handleMoreClose} initialData={results[0]} getPatientPrescription={() => {}} /> 
    </div>
  );
}

export default SearchResults;
