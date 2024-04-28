import { PieChart } from "@mui/x-charts";
import axios from "axios";
import { useEffect, useState } from "react"
import ReportGenerator from "../../../components/ReportGenerator";

const StaffCountByGroup = () => {

    const [staffCount, setStaffCount] = useState([]);

    useEffect(() => {
        generateReport()
    }, [])

    const generateReport = async() => {
        try{
            const res = await axios.get("/api/acs/reports");
            setStaffCount(res.data);
            console.log(res.data, { msg: "Inner" });
            
        } catch{
            console.log("Erros fetching report data");
            
        }
    }

    console.log(staffCount)
  return (
    <ReportGenerator title="Staff Count By Designation" filename = "StaffByDesignation" visible>
    <PieChart series = {[{
        data: staffCount,
    }]} width={500} height={500}/>
    </ReportGenerator>
  )
}

export default StaffCountByGroup