import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import TableLoader from "../../../components/TableLoader";
import { useMemo } from "react";
import { DeleteForever, Edit } from "@mui/icons-material";
import { Ward } from "../types";



const WardTable = ({ data, loading, search, onRename, onDelete }: {
    data: Ward[],
    search: string | undefined,
    loading: boolean
    onDelete: (v: Ward) => unknown
    onRename: (v: Ward) => unknown
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
                        loading ? <TableLoader columns={3} /> : rows.map(v => {
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
                                        <DeleteForever sx={{ fontSize: "1.2em" }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        })
                    }

                    {
                        !loading && rows.length == 0 ? <TableRow>
                            <TableCell colSpan={3}>No records found</TableCell>
                        </TableRow> : undefined
                    }

                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default WardTable;