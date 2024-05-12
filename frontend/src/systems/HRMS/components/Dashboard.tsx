import { Box, Grid } from "@mui/material";
import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import { DateCard, WelcomeCard } from "../../../components/DashboardCards";
import { LinkCard } from "./dashboard/DashboardCards";

dayjs.extend(AdvancedFormat);

const Dashboard = () => {
  return (
    <>
      <Grid container spacing={2} justifyContent="space-evenly">
        <Grid item xs={6}>
          <WelcomeCard img="/assets/hrms.png" />
        </Grid>
        <Grid item xs={4}>
          <DateCard />
        </Grid>
        <Grid item xs={4}>
          <LinkCard
            name="Leaves Requests Management"
            desc="Use this to approve or reject leave requests "
            link="/hrms/leaveRequests"
          />
          <LinkCard
            name="Leaves Type Management"
            desc="Use this to manage leave types"
            link="/hrms/leaveRequests"
          />

          <LinkCard
            name="Shift Type Management"
            desc="Use this to approve or reject leave requests "
            link="/hrms/shiftTypes"
          />
          <LinkCard
            name="Roster Management"
            desc="Use this to manage leave types"
            link="/hrms/rosterManagement"
          />
        </Grid>
        <Grid item xs={6}>
          <Box flexGrow="3" display="flex" flexDirection="column">
            <LinkCard
              name="Reports"
              desc="Generate reports"
              link="/hrms/reports"
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
