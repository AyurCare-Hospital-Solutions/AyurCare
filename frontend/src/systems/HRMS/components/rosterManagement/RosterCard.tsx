import { Paper, Typography } from "@mui/material";

interface RosterCardProps {
  id: string;
  date: string;
  type: string;
  allocated: {
    doctor: number;
    nurse: number;
    others: number;
  };
  status: string;
}

const RosterCard: React.FC<RosterCardProps> = ({
  id,
  date,
  type,
  allocated,
  status,
}) => {
  const isIncomplete = status === "incomplete";

  return (
    <Paper
      style={{ backgroundColor: isIncomplete ? "yellow" : "white" }}
      sx={{ p: 2, my: 2, maxWidth: "250px" }}
    >
      <Typography variant="body2">ID: {id}</Typography>
      <Typography variant="body2">Date: {date}</Typography>
      <Typography variant="body2">Type: {type}</Typography>
      <Typography variant="body2">Allocated No of Employees:</Typography>
      <ul>
        <li>
          <Typography variant="body2">Doctor: {allocated.doctor}</Typography>
        </li>
        <li>
          <Typography variant="body2">Nurse: {allocated.nurse}</Typography>
        </li>
        <li>
          <Typography variant="body2">Others: {allocated.others}</Typography>
        </li>
      </ul>
      <Typography variant="body2">Status: {status}</Typography>
    </Paper>
  );
};

export default RosterCard;
