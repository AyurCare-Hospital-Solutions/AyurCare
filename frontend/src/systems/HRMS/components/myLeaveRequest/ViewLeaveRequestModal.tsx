import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function ViewLeaveRequestModal({
  leaveDetails,
  onClose,
}: {
  leaveDetails: {
    reason: string;
    status: string;
    rejectionReason?: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    leaveId: string;
  };
  onClose: () => void;
}) {
  const {
    reason,
    status,
    rejectionReason,
    leaveType,
    startDate,
    endDate,
    leaveId,
  } = leaveDetails;

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Leave Request Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <strong>Leave Type:</strong> {leaveType}
        </DialogContentText>
        <DialogContentText>
          <strong>Reason:</strong> {reason}
        </DialogContentText>
        <DialogContentText>
          <strong>Start Date:</strong> {startDate}
        </DialogContentText>
        <DialogContentText>
          <strong>End Date:</strong> {endDate}
        </DialogContentText>
        <DialogContentText>
          <strong>Leave ID:</strong> {leaveId}
        </DialogContentText>
        <DialogContentText>
          <strong>Status:</strong> {status}
        </DialogContentText>
        {status === "Rejected" && (
          <DialogContentText>
            <strong>Rejection Reason:</strong> {rejectionReason}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
