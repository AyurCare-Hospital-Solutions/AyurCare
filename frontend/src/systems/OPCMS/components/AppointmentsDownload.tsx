import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

interface Appointment {
    id: number;
    Patient: {
        id: number;
        name: string;
    };
    created_at: string;
}

const AppointmentsDownload = ({search}:{search:string}) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const navigate = useNavigate(); // Get the history object from useHistory hook

    useEffect(() => {
        axios.get<Appointment[]>("/api/opcms/opdAppointments").then((res) => {
            console.log(res.data);
            setAppointments(res.data);
        }).catch((err) => console.error(err));
        }, []);

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
                        {appointments.filter((appointment: any) => {
                            if (search) {
                                return (appointment.Patient.name.startsWith(search));
                            }
                            else {
                                return appointment;
                            }
                        })
                        
                        .map((appointment) => (
                        <TableRow key={appointment.id}>
                            <TableCell>{appointment.Patient.name}</TableCell>
                            <TableCell>{appointment.id}</TableCell>
                            <TableCell>{appointment.created_at}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AppointmentsDownload;
