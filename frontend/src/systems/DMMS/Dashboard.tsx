import { Box, Button, Stack, Typography } from '@mui/material'
import { DateCard, LinkCard, WelcomeCard } from '../../components/DashboardCards'

function Dashboard() {
    return (
        <div>
            <Typography variant="h4" align="center" color="primary" >Drug Manufacturing Managment System</Typography>
            <Box
                m={5}
                sx={{ display: 'flex' }}
            >
                <Box mr={4} sx={{ flexGrow: 1 }}><WelcomeCard img="/assets/IMSimg.svg" /></Box>
                <Box>
                    <DateCard />
                </Box>
            </Box>
            <Box width="100%">
                <Stack direction="row" spacing={6} alignItems="center" justifyContent="center" >
                    <Box>
                        <LinkCard name={"New Orders"} desc={""} link={"./medicine"} />
                    </Box>
                    <Box>
                        <LinkCard name={"Production Table"} desc={""} link={"./material"} />
                    </Box>
                    <Box>
                        <LinkCard name={"Manufacturing Data"} desc={""} link={"./accessories"} />
                    </Box>
                    <Box>
                        <LinkCard name={"Reports"} desc={""} link={"./accessories"} />
                    </Box>
                </Stack>
            </Box>
        </div>
    )
}

export default Dashboard
