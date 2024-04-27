import { useState, useEffect } from 'react';
import axios from 'axios';
import { Admission, AdmissionListSchema } from './types';
import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import SearchInput from './components/SearchInput';
import PatientTable from './components/PatientTable';
import ReportGenerator from '../../components/ReportGenerator';





const PatientList = () => {

    const [data, setData] = useState<Admission[]>([]);
    const [search, setSearch] = useState<RegExp>();
    const [admittedOnly, setAdmittedOnly] = useState(true);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        axios.get(`/api/icms/patients?admitted=${admittedOnly}`).then((res) => {
            setData(AdmissionListSchema.cast(res.data));
            setLoading(false);
        })
    }, [admittedOnly])



    return <>
        <Typography variant="h5" mx={1} my={2}>Patient Management</Typography>

        <Box sx={{ display: "flex" }} my={4} mx={2}>
            <SearchInput onChange={(s) => setSearch(s)} ></SearchInput>
            <FormControlLabel sx={{ my: "auto", ml: "auto" }} control={
                <Switch value={admittedOnly} onChange={(_, v) => setAdmittedOnly(!v)} />
            } label="Show Discharged patients" labelPlacement="end" />
        </Box>
        <ReportGenerator title="Patient List" filename='PatientList.pdf'>
            <PatientTable loading={loading} data={data} search={search} print={true} />
        </ReportGenerator>
        <PatientTable loading={loading} data={data} search={search} />
    </>

}



export default PatientList;