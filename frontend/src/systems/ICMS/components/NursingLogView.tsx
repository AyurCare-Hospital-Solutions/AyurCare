import { Divider, Fab, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { NursingLog } from "../types";
import dayjs from "dayjs";
import { Add } from "@mui/icons-material";

const NursingLogView = ({ data, onAdd }: { data: NursingLog | undefined, onAdd: () => any }) => {
    return <>
        <Typography variant="h5">Nursing Log</Typography>

        <Paper sx={{ position: "relative", maxWidth: "100%" }} variant="outlined">

            <List sx={{ height: "65vh", overflowY: "scroll", mt: 2 }}>
                {data?.sort((a, b) => b.id - a.id).map(v => <>
                    <ListItem key={v.id}>
                        <ListItemText primary={v.note} secondary={
                            `${v.Staff?.name ?? "Unknown"} at ${dayjs(v.createdAt).format('DD/MM/YYYY HH:mm:ss')}`
                        } primaryTypographyProps={{ sx: { mb: 1 }, component: "pre", whiteSpace: "pre-wrap" }}></ListItemText>

                    </ListItem>
                    <Divider />
                </>
                )}
                {data && data.length > 0 ? <></> : <ListItem>
                    <ListItemText primary="No Nursing Log Entries Found."></ListItemText>
                </ListItem>}
            </List>



            <Fab color="primary" aria-label="add" sx={{
                position: 'absolute',
                bottom: 32,
                right: 48,
            }} onClick={onAdd}>
                <Add />
            </Fab>
        </Paper>

    </>
}

export default NursingLogView;