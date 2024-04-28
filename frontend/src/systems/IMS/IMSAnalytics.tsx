
import { TotalCountBarChart, TotalCountPieChart } from './analyticsComponents/TotalCountAnalytics';
import { MedicineLotBarChart } from './analyticsComponents/MedicineLotAnalytics';
import { MedicineStockLevelBarChart, MedicineStockLevelPieChart } from './analyticsComponents/MedicineStockLevelAnalytics';
import { MaterialGroupBarChart, MaterialGroupsPieChart } from './analyticsComponents/MaterialGroupAnalytics';
import { Box, Stack, Typography } from '@mui/material';
import { MaterialStockLevelBarChart, MaterialStockLevelPieChart } from './analyticsComponents/MaterialStockLevelAnalytics';
import { AccessoryGroupBarChart, AccessoryGroupPieChart } from './analyticsComponents/AccessoryGroupAnalytics';
import { AccessoryStockLevelBarChart, AccessoryStockLevelPieChart } from './analyticsComponents/AccessoryStockLevelAnalytics';
import { MedicineRequestStatusBarChart, MedicineRequestStatusPieChart } from './analyticsComponents/MedicineRequestAnalyrtics';
import { MaterialRequestStatusBarChart, MaterialRequestStatusPieChart } from './analyticsComponents/MaterialRequestAnalytics';
import ReportGenerator from '../../components/ReportGenerator';
import dayjs from 'dayjs';

function IMSAnalytics() {
  const getDate = () => {
    const date = dayjs().format('YYYY-MM-DD');
    const time = dayjs().format('HH:mm');
    return { date, time };
  }
  return (
    <div>
      <ReportGenerator filename='Inventory Analytics' title='' visible titleHidden>
        <Box>
          <Typography variant='h3' color='primary' align="center">
            Inventory Analytics
          </Typography>
        </Box>

        <Box mt={10}>
          <Typography color='secondary' align="right">
            Generated Date : {getDate().date}
          </Typography>
          <Typography color='secondary' align="right">
            Generated Time : {getDate().time}
          </Typography>
        </Box>


        <Box mt={4}>
          <Typography variant='h5' color='primary' >
            Total stocks in each item category
          </Typography>
          <Stack direction="row" >
            <TotalCountPieChart />
            <TotalCountBarChart />
          </Stack>
        </Box>

        <Box mt={10}>
          <Typography variant='h5' color='primary'>
            Medicine lot count for each medicine
          </Typography>
          <MedicineLotBarChart />
        </Box>

        <Box mt={10} >
          <Typography variant='h5' color='primary'>
            Medicine lot status analytics
          </Typography>
          <Stack direction="row" >
            <MedicineStockLevelPieChart />
            <MedicineStockLevelBarChart />
          </Stack>
        </Box>
        <Box mt={10}>
          <Typography variant='h5' color='primary'>
            Material stock analytics (based on measurement unit)
          </Typography>
          <Stack direction='row' >
            <MaterialGroupsPieChart />
            <MaterialGroupBarChart />
          </Stack>
        </Box>
        <Box mt={10}>
          <Typography variant='h5' color='primary'>
            Material stock status analytics
          </Typography>
          <Stack direction='row' >
            <MaterialStockLevelPieChart />
            <MaterialStockLevelBarChart />
          </Stack>
        </Box>

        <Box mt={10} >
          <Typography variant='h5' color='primary'>
            Accessory stock analytics (based on measurement unit)
          </Typography>'
          <Stack direction='row' >
            <AccessoryGroupPieChart />
            <AccessoryGroupBarChart />
          </Stack>
        </Box>

        <Box mt={10}>
          <Typography variant='h5' color='primary'>
            Accessory stock status analytics
          </Typography>
          <Stack direction='row' >
            <AccessoryStockLevelPieChart />
            <AccessoryStockLevelBarChart />
          </Stack>
        </Box>

        <Box mt={10}>
          <Typography variant='h5' color='primary'>
            Medicine request status analytics
          </Typography>
          <Stack direction='row' >
            <MedicineRequestStatusPieChart />
            <MedicineRequestStatusBarChart />
          </Stack>
        </Box>

        <Box mt={10}>
          <Typography variant='h5' color='primary'>
            Material request status analytics
          </Typography>
          <Stack direction='row'>
            <MaterialRequestStatusPieChart />
            <MaterialRequestStatusBarChart />
          </Stack>
        </Box>
      </ReportGenerator>
    </div>
  )
}

export default IMSAnalytics;
