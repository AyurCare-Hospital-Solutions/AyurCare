import { useEffect, useState } from "react";
import PatientInfo from "./components/PatientInfo";
import { NursingLog, NursingLogSchema, PatientRecord, PatientRecordSchema } from "./types";
import axios from "axios";
import CarePlanInfo from "./components/CarePlanInfo";
import NursingLogView from "./components/NursingLogView";
import { Box, Tabs, Tab, Typography, IconButton } from "@mui/material";
import NursingLogAdd from "./components/NursingLogAdd";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}



const PatientDetails = () => {
    let { patientId } = useParams();

    const [patientInfo, setPatientInfo] = useState<PatientRecord>();
    const [nursingLog, setNursingLog] = useState<NursingLog>();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/icms/careplan/${patientId}`).then(async (res) => {
            setPatientInfo(PatientRecordSchema.cast(res.data));
        }).catch((e: any) => {
            if (e?.response?.status == 404) {
                enqueueSnackbar("Patient is not admitted to the IPD", { variant: "error" });
            } else {
                enqueueSnackbar("Failed to get patient details", { variant: "error" });
            }

            console.log(e);
            navigate("/icms/patient")
        });
    }, [patientId]);

    useEffect(() => {
        if (patientInfo) {
            axios.get(`/api/icms/nursinglog/${patientInfo?.admission.id}`).then((res) => {
                let logs = NursingLogSchema.cast(res.data)
                setNursingLog([...logs]);
            })
        }
    }, [patientInfo]);

    const [page, setPage] = useState(0);

    const handleChange = (_: any, newPage: number) => {
        setPage(newPage);
    };

    const submitNLMessage = async (log: string) => {
        if (nursingLog === undefined) {
            setNursingLog([]);
            return;
        }

        try {
            let resp = await axios.post(`/api/icms/nursinglog/${patientInfo?.admission.id}`, { note: log });

            setNursingLog([...nursingLog, resp.data]);
            enqueueSnackbar("Added message to log", { variant: "success" });
        } catch (e) {
            enqueueSnackbar("Failed to add message to log", { variant: "error" });
            console.error(e);
        }
    }


    const [NLModalOpen, setNLModalOpen] = useState(false);



    return <>
        <Link to="/icms/patient">
            <IconButton color="primary" size="large">
                <ArrowBack />
            </IconButton>
        </Link>

        <Typography variant="h5" mx={1} mb={2} display="inline">Patient Details</Typography>

        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={page} onChange={handleChange}>
                    <Tab label="Details" />
                    <Tab label="Care Plan" />
                    <Tab label="Nursing Logs" />
                </Tabs>
            </Box>
            <TabPanel value={page} index={0}>
                <PatientInfo admission={patientInfo?.admission} />
            </TabPanel>
            <TabPanel value={page} index={1}>
                <CarePlanInfo data={patientInfo?.carePlan} />
            </TabPanel>
            <TabPanel value={page} index={2}>
                <NursingLogView data={nursingLog} onAdd={() => {
                    setNLModalOpen(true);
                }} />
            </TabPanel>
        </Box>

        <NursingLogAdd open={NLModalOpen} onClose={() => { setNLModalOpen(false) }} onSubmit={submitNLMessage}></NursingLogAdd>

    </>
}

export default PatientDetails;