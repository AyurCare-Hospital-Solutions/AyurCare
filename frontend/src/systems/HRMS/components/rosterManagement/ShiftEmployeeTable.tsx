import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { EmployeeData, ShiftTypeData } from "../../types";

const columns: GridColDef<EmployeeData>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Employee Name",
    width: 150,
    editable: false,
  },
];
export default function ShiftEmployeeTable({
  employees,
  selected,
  setSelected,
}: {
  employees: EmployeeData[];
  selected: GridRowId[];
  setSelected: (selected: GridRowId[]) => void;
}) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={employees}
        onRowSelectionModelChange={setSelected}
        rowSelectionModel={selected}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
