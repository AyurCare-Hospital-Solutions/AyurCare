import React, { useEffect, useState } from 'react'
//@ts-ignore
import MedicineTable from "./component/MedicineTable"
import axios from 'axios';

function Medicine() {
  const [medicineData, setMedicineData] = useState({});

  const getMedicineData = async () => {
    await axios.get('/api/ims/medicine').then((res) => {
      setTimeout(() => setMedicineData(res.data), 1000);
      setTimeout(() => console.log(medicineData), 2000);
    })
  }

  useEffect(() => {
    getMedicineData();
  }, [])

  return (
    <div>
      <MedicineTable data={medicineData} />
    </div>
  )
}

export default Medicine

