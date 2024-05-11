import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export interface Appointment {
    id: number;
    Patient: {
        id: number;
        name: string;
    };
    created_at: string;
}

const AppointmentsDownload = ({
    appointments,
}: {
    appointments: Appointment[];
}) => {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableCell>Patient Name</TableCell>
                        <TableCell>Patient ID</TableCell>
                        <TableCell>Created At</TableCell>
                    </TableHead>
                <TableBody>
                    {appointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                            <TableCell>{appointment.Patient.name}</TableCell>
                            <TableCell>{appointment.id}</TableCell>
                            <TableCell>{new Date(appointment.created_at)?.toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AppointmentsDownload;
