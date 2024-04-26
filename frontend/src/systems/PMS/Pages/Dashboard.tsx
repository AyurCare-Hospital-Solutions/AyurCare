import { useEffect, useState } from "react";
import Header from "../Components/Dashboard/DashboardHeader";
import ReportBox from "../Components/Dashboard/ReportBox";
import axios from "axios";

const Dashboard = () => {
  const [medicinesCount, setMedicinesCount] = useState();
  const [prescriptionsCount, setPrescriptionsCount] = useState();
  const [externalPrescriptionsCount, setExternalPrescriptionsCount] =
    useState();

  //get the medicines count
  const getMedicinesCount = () => {
    axios.get("/api/pms/getTotalMedicinesCount").then((res: any) => {
      setMedicinesCount(res.data.count);
    });
  };

  useEffect(() => {
    getMedicinesCount();
  }, []);

  //get the prescriptions count
  const getPrescriptionsCount = () => {
    axios.get("/api/pms/getTotalPrescriptionsCount").then((res: any) => {
      setPrescriptionsCount(res.data.count);
    });
  };

  useEffect(() => {
    getPrescriptionsCount();
  }, []);

  //get the external prescriptions count
  const getExternalPrescriptionsCount = () => {
    axios
      .get("/api/pms/getTotalExternalPrescriptionsCount")
      .then((res: any) => {
        console.log(res.data.count);
        setExternalPrescriptionsCount(res.data.count);
      });
  };

  useEffect(() => {
    getExternalPrescriptionsCount();
  }, []);

  return (
    <>
      <Header />
      <ReportBox
        medicinesCount={medicinesCount}
        prescriptionsCount={prescriptionsCount}
        externalPrescriptionsCount={externalPrescriptionsCount}
      />
    </>
  );
};

export default Dashboard;
