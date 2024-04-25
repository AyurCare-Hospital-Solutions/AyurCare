import axios from "axios";
import React, { useEffect, useState } from "react";


const Assessment = () => {
  const[assesmentData,setAssesmentData] = useState();
  
  // get assesment details
const getAssessmentDetails = () => {
  axios
    .get("api/opcms/patientAssessment")
    .then((res) => {
      console.log(res.data);
      setAssesmentData(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
};

useEffect(() => {
  getAssessmentDetails();
},[]);

  return <div>Fgrvgerags</div>;
};

export default Assessment;
