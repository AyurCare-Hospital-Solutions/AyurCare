export interface LeaveTypeData {
  id: number;
  name: string;
  hours: number;
}

export interface MyLeaveRequestData {
  id: number;
  leaveType: LeaveTypeData;
  leaveReason: string;
  startDate: string;
  endDate: string;
  hours: string;
  status: string;
}
