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
import dayjs from "dayjs";

interface Prescription {
  id: number;
  PatientId: string;
  Patient: { name: string }; // Interface for associated Patient object
  dispensed_date: string;
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

  const [pId,setPId] = useState<number>()

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
                  {prescription.dispensed_date && dayjs(prescription.dispensed_date).format('YYYY-MM-DD')}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    size="small" 
                    sx={{mr:1}}
                    onClick={()=>{
                      handleMoreOpen();
                      setPId(prescription.id);
                    }}
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
      <PatientDataSeeMore open={moreOpen} handleClose={handleMoreClose} initialData={pId}  /> 
    </div>
  );
}

export default SearchResults;
