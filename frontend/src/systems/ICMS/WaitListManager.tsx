import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Bed, WaitList, WaitListArraySchema, WaitListSchema, Ward, WardArraySchema } from "./types";
import WaitListTable from "./components/WaitListTable";
import WaitListDialog from "./components/WaitListDialog";
import { enqueueSnackbar } from "notistack";
import { Box, Button, Typography } from "@mui/material";
import SearchInput from "./components/SearchInput";
import ReportGenerator from "../../components/ReportGenerator";
import { Add } from "@mui/icons-material";
import WaitListAddDialog from "./components/WaitListAddDialog";

const WaitListManager = () => {
    const [waitListData, setWaitList] = useState<WaitList[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [loading, setLoading] = useState(true);
    const [modelOpen, setModalOpen] = useState(false);
    const [modelAddOpen, setAddModalOpen] = useState(false);
    const [selected, setSelected] = useState<WaitList>();

    const [search, setSearch] = useState<RegExp>();

    useEffect(() => {
        axios.get("/api/icms/waitlist").then((res) => {
            const data = WaitListArraySchema.cast(res.data);



            axios.get("/api/icms/ward").then(res => {
                const wardData = WardArraySchema.cast(res.data);

                setWards(wardData);
                setWaitList(data);
                setLoading(false);
            })
        })
    }, []);

    // sort wait list by date and priority.
    const waitList = useMemo(() => {
        return waitListData.sort((a, b) => {
            let aKey = a.createdAt.getTime();
            if (a.is_priority) aKey -= 2e10;

            let bKey = b.createdAt.getTime();
            if (b.is_priority) bKey -= 2e10;

            return aKey - bKey;
        });
    }, [waitListData]);

    const handleSelect = (v: WaitList) => {
        setSelected(v);
        setModalOpen(true);
    }

    const handleAdmit = (v: Bed) => {
        if (!selected) return;

        axios.post(`/api/icms/waitlist/admit/${selected.id}`, { bedId: v.id }).then(() => {
            let idx = waitList.indexOf(selected);
            waitList.splice(idx, 1);
            setWaitList([...waitList])

            enqueueSnackbar("Admitted patient successfully.", { variant: "success" });
        }).catch((e) => {
            console.error(e);
            enqueueSnackbar("Failed to admit patient.", { variant: "error" })
        })
    }

    const handleAddPatient = async (reason: string, patientId: number, isPriority: boolean) => {
        try {
            let resp = await axios.post("/api/icms/waitlist", { reason: reason, patient: patientId, priority: isPriority });
            setWaitList([...waitList, WaitListSchema.cast(resp.data)])
        } catch (e) {
            enqueueSnackbar("Failed to add patient to wait list", { variant: "error" });
            console.error(e);
            return;
        }

        enqueueSnackbar("Successfully added patient to wait list", { variant: "success" });

    }

    return <>
        <Typography variant="h5" mx={1} my={2}>Waiting List</Typography>
        <Box sx={{ display: "flex" }} my={4} mx={2}>
            <SearchInput onChange={(s) => setSearch(s)} />
            <Button variant="outlined" startIcon={<Add />} sx={{ ml: "auto" }} onClick={() => setAddModalOpen(true)}>
                Add to List
            </Button>
        </Box>
        <ReportGenerator title="Wait List" filename="WaitList.pdf">
            <WaitListTable data={waitList} loading={loading} onSelect={handleSelect} print search={search} />
        </ReportGenerator>
        <WaitListTable data={waitList} loading={loading} onSelect={handleSelect} search={search} />
        <WaitListDialog open={modelOpen} row={selected} wards={wards} onAdmit={handleAdmit} onClose={() => setModalOpen(false)} />

        <WaitListAddDialog open={modelAddOpen} onClose={() => { setAddModalOpen(false) }} onAdd={handleAddPatient} />
    </>
}

export default WaitListManager;