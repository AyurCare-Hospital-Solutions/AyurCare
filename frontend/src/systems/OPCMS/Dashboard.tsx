import { Box, Stack } from '@mui/material'
import { DateCard, LinkCard, WelcomeCard } from '../../components/DashboardCards'

function Dashboard() {
    return (
        <div>
        <Box
            m={5}
            sx={{ 
                display: 'flex',
                borderRadius: 15,
            }}
        >
            <Box mr={4} sx={{ flexGrow: 1 }}><WelcomeCard img="/assets/IMSimg.svg" /></Box>
            <Box>
            <DateCard />
            </Box>
        </Box>
        <Box width="100%">
            <Stack direction="row" spacing={6} alignItems="center" justifyContent="center" >
            <Box>
                <LinkCard name={"Medical Records"} desc={"Find Medical Record details"} link={"/opcms/records"} />
            </Box>
            <Box>
                <LinkCard name={"Reports"} desc={"Generate reports"} link={"opcms/reports"} />
            </Box>
            <Box>
                <LinkCard name={"Analysis"} desc={""} link={"opcms/analysis"} />
            </Box>
            </Stack>
        </Box>
        </div>
    )
}

export default Dashboard;