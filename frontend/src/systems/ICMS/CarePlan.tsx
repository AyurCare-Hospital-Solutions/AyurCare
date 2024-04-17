import { useEffect, useState } from "react";
import PatientInfo from "./components/PatientInfo";
import { PatientRecord, PatientRecordSchema } from "./types";
import axios from "axios";
import CarePlanInfo from "./components/CarePlanInfo";
import NursingLogView from "./components/NursingLogView";



const CarePlan = () => {
    const [patientInfo, setPatientInfo] = useState<PatientRecord>();
    const [nursingLog, setNursingLog] = useState<any>();

    useEffect(() => {
        axios.get("/api/icms/careplan/2").then(async (res) => {
            setTimeout(() => setPatientInfo(PatientRecordSchema.cast(res.data)), 1000);
        })
    }, []);

    useEffect(() => {
        if (patientInfo) {
            axios.get(`/api/icms/nursinglog/${patientInfo?.admission.id}`).then((res) => {
                console.log(res.data)
            })
        }
    }, [patientInfo]);


    return <>
        <PatientInfo admission={patientInfo?.admission} />
        <CarePlanInfo data={patientInfo?.carePlan} />
        <NursingLogView />
    </>
}

export default CarePlan;