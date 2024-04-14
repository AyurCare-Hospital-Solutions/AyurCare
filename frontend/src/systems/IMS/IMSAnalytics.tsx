
import { TotalCountBarChart, TotalCountPieChart } from './analyticsComponents/TotalCountAnalytics';
import { MedicineLotBarChart } from './analyticsComponents/MedicineLotAnalytics';
import { MedicineStockLevelBarChart, MedicineStockLevelPieChart } from './analyticsComponents/MedicineStockLevelAnalytics';
import { MaterialGroupBarChart, MaterialGroupsPieChart } from './analyticsComponents/MaterialGroupAnalytics';
import { Box, Typography } from '@mui/material';
import { MaterialStockLevelBarChart, MaterialStockLevelPieChart } from './analyticsComponents/MaterialStockLevelAnalytics';
import { AccessoryGroupBarChart, AccessoryGroupPieChart } from './analyticsComponents/AccessoryGroupAnalytics';
import { AccessoryStockLevelBarChart, AccessoryStockLevelPieChart } from './analyticsComponents/AccessoryStockLevelAnalytics';
import { MedicineRequestStatusBarChart, MedicineRequestStatusPieChart } from './analyticsComponents/MedicineRequestAnalyrtics';

function IMSAnalytics() {
  return (
    <div>
      <Box>
        <Typography variant='h3' color='primary' align="center">
          Inventory Analytics
        </Typography>
      </Box>
      <TotalCountPieChart />
      <TotalCountBarChart />
      <MedicineLotBarChart />
      <MedicineStockLevelPieChart />
      <MedicineStockLevelBarChart />
      <MaterialGroupsPieChart />
      <MaterialGroupBarChart />
      <MaterialStockLevelPieChart />
      <MaterialStockLevelBarChart />
      <AccessoryGroupPieChart />
      <AccessoryGroupBarChart />
      <AccessoryStockLevelPieChart />
      <AccessoryStockLevelBarChart />
      <MedicineRequestStatusPieChart />
      <MedicineRequestStatusBarChart />
    </div>
  )
}

export default IMSAnalytics;
