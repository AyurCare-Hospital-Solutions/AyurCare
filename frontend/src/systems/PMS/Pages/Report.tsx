import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import BackButton from "../Components/Common/BackButton";
import MedicineSummary from "../Components/Report/SummarySections/MedicineSummary";
import InventorySummary from "../Components/Report/SummarySections/InventorySummary";
import PrescriptionSummary from "../Components/Report/SummarySections/InternalPrescriptionSummary";
import ExternalPrescriptionSummary from "../Components/Report/SummarySections/ExternalPrescriptionSummary";
import SingleComponent from "../Components/Report/SummarySections/SingleComponet";
import { BlobProvider } from "@react-pdf/renderer";
import GeneratePDF from "../Components/Report/GeneratePDF";
import axios from "axios";

const Report = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const [medicineData, setMedicineData] = useState({
    total: 0,
    countZero: 0,
    countLessThan10: 0,
  });

  const [internalPrescriptionData, setInternalPrescriptionData] = useState({
    name: "Internal Prescription Insights",
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });

  const [externalPrescriptionData, setExternalPrescriptionData] = useState({
    name: "External Prescription Insights",
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });

  const [userConcern, setUserConcern] = useState({
    total: 0,
    responsed: 0,
    notResponsed: 0,
  });

  //Fetching medicine related data
  // 1. medicine data -----------------------------------------------------------------------------------------------------------------------
  // total count
  const getMedicinesCount = () =>
    axios.get("/api/pms/getTotalMedicinesCount").then((res: any) => {
      const count = res.data.count;
      setMedicineData((prevState) => ({
        ...prevState,
        total: count,
      }));
    });

  useEffect(() => {
    getMedicinesCount();
  }, []);

  // medicine stock is ZERO
  const getZeroMedicineCount = () => {
    axios.get("/api/pms/getZeroMedicineCount").then((res: any) => {
      const zero = res.data.count;
      setMedicineData((prevState) => ({
        ...prevState,
        countZero: zero,
      }));
    });
  };

  useEffect(() => {
    getZeroMedicineCount();
  }, []);

  // get stock level less than 10
  const getMedicineLevel10 = () => {
    axios.get("/api/pms/getMedicineStockLessThan10").then((res: any) => {
      const count = res.data.lowStockCount;
      setMedicineData((prevState) => ({
        ...prevState,
        countLessThan10: count,
      }));
    });
  };

  useEffect(() => {
    getMedicineLevel10();
  }, []);

  // internal prescription data ---------------------------------------------------------------------------------------------------------------------

  // 1. total internal prescription
  const getInternalPrescriptionCount = () => {
    // TODO: assign the api route
    axios.get("/api/pms/getTotalPrescriptionsCount").then((res: any) => {
      const count = res.data.count;
      setInternalPrescriptionData((prevState) => ({
        ...prevState,
        total: count,
      }));
    });
  };

  useEffect(() => {
    getInternalPrescriptionCount();
  }, []);

  // 2. approved internal prescription
  const getTotalPrescriptionsCount = () => {
    // TODO: assign the api route
    axios.get("/api/pms/getTotalPrescriptionsCount").then((res: any) => {
      const count = res.data.count;
      setInternalPrescriptionData((prevState) => ({
        ...prevState,
        approved: count,
      }));
    });
  };

  useEffect(() => {
    getTotalPrescriptionsCount();
  }, []);

  // 3. approved internal prescription
  const getRejectedPrescriptionsCount = () => {
    // TODO: assign the api route
    axios.get("/api/pms/getRejectedPrescriptionsCount").then((res: any) => {
      const count = res.data.count;
      setInternalPrescriptionData((prevState) => ({
        ...prevState,
        rejected: count,
      }));
    });
  };

  useEffect(() => {
    getRejectedPrescriptionsCount();
  }, []);

  // 3. pending internal prescription
  const getPendingPrescriptionsCount = () => {
    // TODO: assign the api route
    axios.get("/api/pms/getPendingPrescriptionsCount").then((res: any) => {
      const count = res.data.count;
      setInternalPrescriptionData((prevState) => ({
        ...prevState,
        pending: count,
      }));
    });
  };

  useEffect(() => {
    getPendingPrescriptionsCount();
  }, []);

  // external prescription data ---------------------------------------------------------------------------------------------------------------------

  // 1. total external prescription
  const getTotalExternalPrescriptionsCount = () => {
    // TODO: assign the api route
    axios
      .get("/api/pms/getTotalExternalPrescriptionsCount")
      .then((res: any) => {
        const count = res.data.count;
        setExternalPrescriptionData((prevState) => ({
          ...prevState,
          total: count,
        }));
      });
  };

  useEffect(() => {
    getTotalExternalPrescriptionsCount();
  }, []);

  // 2. approved external prescription
  const getApprovedExternalPrescriptionsCount = () => {
    // TODO: assign the api route
    axios
      .get("/api/pms/getApprovedExternalPrescriptionsCount")
      .then((res: any) => {
        const count = res.data.count;
        setExternalPrescriptionData((prevState) => ({
          ...prevState,
          approved: count,
        }));
      });
  };

  useEffect(() => {
    getApprovedExternalPrescriptionsCount();
  }, []);

  // 3. approved external prescription
  const getRejectedExternalPrescriptionsCount = () => {
    // TODO: assign the api route
    axios
      .get("/api/pms/getRejectedExternalPrescriptionsCount")
      .then((res: any) => {
        const count = res.data.count;
        setExternalPrescriptionData((prevState) => ({
          ...prevState,
          rejected: count,
        }));
      });
  };

  useEffect(() => {
    getRejectedExternalPrescriptionsCount();
  }, []);

  // 3. pending external prescription
  const getPendingExternalPrescriptionsCount = () => {
    // TODO: assign the api route
    axios
      .get("/api/pms/getPendingExternalPrescriptionsCount")
      .then((res: any) => {
        const count = res.data.count;
        setExternalPrescriptionData((prevState) => ({
          ...prevState,
          pending: count,
        }));
      });
  };

  useEffect(() => {
    getPendingExternalPrescriptionsCount();
  }, []);
  // user concerns data ---------------------------------------------------------------------------------------------------------------------

  // 1. total internal prescription
  const getTotalUserConcerns = () => {
    // TODO: assign the api route
    axios.get("/api/pms/getTotalUserConcerns").then((res: any) => {
      const count = res.data.count;
      setUserConcern((prevState) => ({
        ...prevState,
        total: count,
      }));
    });
  };

  useEffect(() => {
    getTotalUserConcerns();
  }, []);

  return (
    <div>
      {/* report generation */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          mb: "20px",
        }}
      >
        <BackButton />
        <Typography sx={{ mb: 3, flexGrow: 1 }} variant="h5">
          Operations Report
        </Typography>
        <BlobProvider
          document={
            <GeneratePDF
              medicineData={medicineData}
              internalPrescriptionData={internalPrescriptionData}
              externalPrescriptionData={externalPrescriptionData}
              userConcern={userConcern}
            />
          }
        >
          {({ blob, url, loading, error }) => {
            if (url && !pdfUrl) {
              setPdfUrl(url);
              setLoading(false);
            }
            return (
              <Button
                onClick={() => {
                  if (url) window.open(url, "_blank");
                }}
                disabled={loading}
                sx={{
                  backgroundColor: "#0d4838",
                  "&:hover": {
                    backgroundColor: "#0c6c52",
                  },
                  p: "6px",
                }}
              >
                <Typography
                  sx={{
                    p: "4px",
                    fontSize: "14px",
                    color: "white",
                    textSizeAdjust: "none",
                  }}
                >
                  Preview Report
                </Typography>
              </Button>
            );
          }}
        </BlobProvider>
      </Box>

      <Grid container spacing={7}>
        <Grid item xs={12}>
          <SingleComponent PrescriptionData={externalPrescriptionData} />
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <SingleComponent PrescriptionData={internalPrescriptionData} />
          </Grid>
          <PrescriptionSummary PrescriptionData={internalPrescriptionData} />
        </Grid>
        <Grid item xs={6}>
          <ExternalPrescriptionSummary
            PrescriptionData={externalPrescriptionData}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Report;
