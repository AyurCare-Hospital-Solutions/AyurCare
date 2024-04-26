export interface LeaveTypeData {
  id: number;
  name: string;
  hours: number;
}

export interface MyLeaveRequestData {
  id: number;
  LeaveType: LeaveTypeData;
  reason: string;
  start_date: string;
  end_date: string;
  hours: string;
  status: string;
}
