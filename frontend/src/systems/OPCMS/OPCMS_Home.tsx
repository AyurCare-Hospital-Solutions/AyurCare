import { Box, Stack } from '@mui/material'
import { DateCard, LinkCard, WelcomeCard } from '../../components/DashboardCards'

function OPCMS_Home() {
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
                <LinkCard name={"Meidcine"} desc={""} link={"./medicine"} />
            </Box>
            <Box>
                <LinkCard name={"Material"} desc={""} link={"./material"} />
            </Box>
            <Box>
                <LinkCard name={"Accessory"} desc={""} link={"./accessories"} />
            </Box>
            </Stack>
        </Box>
        </div>
    )
}

export default OPCMS_Home