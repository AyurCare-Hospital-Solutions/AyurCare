import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import TableLoader from "../../../components/TableLoader";
import { useMemo } from "react";
import { Delete, Edit } from "@mui/icons-material";

interface format {
    id: number,
    name: string,
}


const WardTable = ({ data, search, onRename, onDelete }: {
    data: format[] | undefined,
    search: string | undefined,
    onDelete: (v: format) => unknown
    onRename: (v: format) => unknown
}) => {
    const rows = useMemo(() => {
        if (search) {
            let filter = RegExp(search);
            return data?.filter((v) => {
                return v.name.search(filter) !== -1;
            })
        }
        return data;

    }, [data, search]);


    return (
        <TableContainer component={Paper}>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell size="small">ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell size="small"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows ? rows.map(v => {
                            return <TableRow key={v.id}>
                                <TableCell >{v.id.toString()}</TableCell>
                                <TableCell>{v.name}</TableCell>
                                <TableCell sx={{ display: "flex" }}>
                                    <IconButton
                                        sx={{ ml: "auto", my: 0, py: 0 }}
                                        color="primary" size="small"
                                        onClick={() => { onRename(v) }}>
                                        <Edit sx={{ fontSize: "1.2em" }} />
                                    </IconButton>
                                    <IconButton
                                        sx={{ py: 0, my: 0 }}
                                        color="secondary" size="small"
                                        onClick={() => { onDelete(v) }}>
                                        <Delete sx={{ fontSize: "1.2em" }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        }) : <TableLoader columns={3} />
                    }

                    {
                        rows && rows.length == 0 ? <TableRow>
                            <TableCell colSpan={3}>No records found</TableCell>
                        </TableRow> : undefined
                    }

                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default WardTable;