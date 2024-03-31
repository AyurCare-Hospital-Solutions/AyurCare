import { Box } from "@mui/material"
import LeaveTypeDialog from "./leaveManagement/LeaveTypeDialog"
import LeaveTypeTable from "./leaveManagement/LeaveTypeTable"
import axios from "axios"
const LeaveType = () => {

  const addLeaveType = (data:any) => {
    console.log(data)
    axios.post("/api/hrms/leaveType",{
      name : data.name,
      hours: data.duration,
    })
  }

  return (
    <div className="LeaveType">
      <Box sx={{display: "flex"}} my={2} mx={2}>
        {/* <LeaveTypeSearch /> */}
        <Box flexGrow={1} />
        <LeaveTypeDialog addLeaveType = {addLeaveType}/>
      </Box>
      <LeaveTypeTable/>
    </div>
  )
}

export default LeaveType