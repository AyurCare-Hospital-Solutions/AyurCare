import axios from "axios";
import { useEffect, useState } from "react";
import GeneratePDF from "./GeneratePDF";

const GeneratePDFAbstraction = () => {
  //Fetching medicine related data
  // 1. medicine count
  const [medicineCount, setMedicineCount] = useState();

  const getMedicinesCount = () =>
    axios.get("/api/pms/getTotalMedicinesCount").then((res: any) => {
      const count = res.data.count;
      console.log(res.data.count);
      setMedicineCount(count);
    });

  useEffect(() => {
    getMedicinesCount();
  }, []);

  // 2. medicine stock is ZERO
  const [medicineStockZero, setmedicineStockZero] = useState();

  const getZeroMedicineCount = () => {
    axios.get("").then((res: any) => {
      const count = res.data.count;
      console.log(count);
      setmedicineStockZero(count);
    });
  };

  useEffect(() => {
    getZeroMedicineCount();
  }, []);

  // 3. get stock level less than 10
  const [medicineStockLessThan10, setmedicineStockLessThan10] = useState();

  const getMedicineLevel10 = () => {
    axios.get("").then((res: any) => {
      const count = res.data.count;
      console.log(count);
      setmedicineStockLessThan10(count);
    });
  };

  return <div></div>;
};

export default GeneratePDFAbstraction;
