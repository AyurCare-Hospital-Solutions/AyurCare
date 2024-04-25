import axios from "axios";
import { useEffect, useState } from "react";
import { Bed, WaitList, WaitListArraySchema, Ward, WardArraySchema } from "./types";
import WaitListTable from "./components/WaitListTable";
import WaitListDialog from "./components/WaitListDialog";
import { enqueueSnackbar } from "notistack";
import { Typography } from "@mui/material";


const WaitListManager = () => {
    const [waitList, setWaitList] = useState<WaitList[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [loading, setLoading] = useState(true);
    const [modelOpen, setModalOpen] = useState(false);
    const [selected, setSelected] = useState<WaitList>();

    useEffect(() => {
        axios.get("/api/icms/waitlist").then((res) => {
            const data = WaitListArraySchema.cast(res.data);

            // sort wait list by date and priority.
            data.sort((a, b) => {
                let aKey = a.createdAt.getTime();
                if (a.is_priority) aKey -= 2e10;

                let bKey = b.createdAt.getTime();
                if (b.is_priority) bKey -= 2e10;

                return aKey - bKey;
            });

            axios.get("/api/icms/ward").then(res => {
                const wardData = WardArraySchema.cast(res.data);

                setWards(wardData);
                setWaitList(data);
                setLoading(false);
            })
        })
    }, []);

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

    return <>
        <Typography variant="h5" mx={1} my={2}>Waiting List</Typography>
        <WaitListTable data={waitList} loading={loading} onSelect={handleSelect} />
        <WaitListDialog open={modelOpen} row={selected} wards={wards} onAdmit={handleAdmit} onClose={() => setModalOpen(false)} />
    </>
}

export default WaitListManager;