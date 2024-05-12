import { Grid } from "@mui/material";
import { ReportCard } from "../../components/DashboardCards";
import ReportGenerator from "../../components/ReportGenerator";
import AppointmentsDownload, {
  Appointment,
} from "./components/AppointmentsDownload";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const Reports = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const appoinmentBtnRef = useRef<HTMLElement>(null);

  useEffect(() => {
    axios
      .get<Appointment[]>("/api/opcms/opdAppointments")
      .then((res) => {
        console.log(res.data);
        setAppointments(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Grid container spacing={2} justifyContent="space-evenly">
        <Grid item xs={5} component="div" ref={appoinmentBtnRef as React.RefObject<HTMLDivElement>}>
          <ReportCard
            name="OPD Appointments"
            desc="Download OPD appointments list"
          />
        </Grid>
        <Grid item xs={5}>
          <ReportCard
            name="Analytics Report"
            desc="Download Analytics Report"
          />
        </Grid>
      </Grid>
      <ReportGenerator
        filename="OPD Appointments"
        title="OPD Appointments"
        buttonRef={appoinmentBtnRef}
      >
        <AppointmentsDownload appointments={appointments} />
      </ReportGenerator>
    </>
  );
};

export default Reports;
