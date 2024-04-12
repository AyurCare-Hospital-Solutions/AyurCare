
import { TotalCountPieChart } from './analyticsComponents/TotalCountAnalytics';
import { MedicineLotBarChart } from './analyticsComponents/MedicineLotAnalytics';
import { MedicineStockLevelBarChart, MedicineStockLevelPieChart } from './analyticsComponents/MedicineStockLevelAnalytics';

function IMSAnalytics() {
  return (
    <div>
      <TotalCountPieChart />
      <MedicineLotBarChart />
      <MedicineStockLevelPieChart />
      <MedicineStockLevelBarChart />
    </div>
  )
}

export default IMSAnalytics;
