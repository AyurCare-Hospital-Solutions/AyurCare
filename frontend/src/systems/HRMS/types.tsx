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

export interface LeaveRequestData {
  id: number;
  Staff: {
    id: number;
    name: string;
  };
  LeaveType: LeaveTypeData;
  registration: string;
  start_date: string;
  end_date: string;
  hours: string;
  status: string;
  reason: string;
}

export interface ShiftTypeData {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
}

export interface EmployeeData {
  id: number;
  name: string;
}
