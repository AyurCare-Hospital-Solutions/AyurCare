import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import TableLoader from "../../../components/TableLoader";

interface format {
    id: number,
    name: string,
}


export default ({ data }: { data: format[] | undefined }) => {



    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data ? data.map(v => {
                            return <TableRow key={v.id}>
                                <TableCell >{v.id.toString()}</TableCell>
                                <TableCell>{v.name}</TableCell>
                            </TableRow>
                        }) : <TableLoader columns={2} />
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}