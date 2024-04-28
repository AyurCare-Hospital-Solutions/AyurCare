// import React, { useState } from "react";
// import axios from "axios";
// import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// interface Prescription {
//   id: number;
//   dispensed_date: string;
//   Patient: {
//     id: number;
//     name: string;
//   };
// }

// const SearchMedicalRecords: React.FC = () => {
//   const [name, setName] = useState<string>("");
//   const [startDate, setStartDate] = useState<string>("");
//   const [endDate, setEndDate] = useState<string>("");
//   const [medicalRecords, setMedicalRecords] = useState<string>("");

//   return (
//     <div>
//       <TextField
//         label="Patient Name"
//         variant="outlined"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <TextField
//         label="Start Date"
//         type="date"
//         variant="outlined"
//         value={startDate}
//         onChange={(e) => setStartDate(e.target.value)}
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//       <TextField
//         label="End Date"
//         type="date"
//         variant="outlined"
//         value={endDate}
//         onChange={(e) => setEndDate(e.target.value)}
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//       <Button variant="contained" onClick={searchMedicalRecords}>
//         Search
//       </Button>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Patient Name</TableCell>
//               <TableCell>Dispensed Date</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {medicalRecords.map((record) => (
//               <TableRow key={record.id}>
//                 <TableCell>{record.id}</TableCell>
//                 <TableCell>{record.Patient.name}</TableCell>
//                 <TableCell>{record.dispensed_date}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };
