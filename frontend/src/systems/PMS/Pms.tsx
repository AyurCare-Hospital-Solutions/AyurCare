import React from 'react'
import DashboardPage from '../../components/DashboardPage'
import { Dashboard, House, Bed, HourglassTop, ReceiptLong, MonitorHeart, Assessment } from '@mui/icons-material'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

const Pms = () => {
  return (

    <DashboardPage>
            <Link to="/pms/dashboard">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/pms/medicines">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            < House />
                        </ListItemIcon>
                        <ListItemText primary="Medicines" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/pms/inventoryrequest">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Bed />
                        </ListItemIcon>
                        <ListItemText primary="Inventory Request" />
                    </ListItemButton>
                </ListItem>
            </Link>


            <Link to="/pms/prescriptionmanagement">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HourglassTop />
                        </ListItemIcon>
                        <ListItemText primary="Prescription Management" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/pms/reports">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Assessment />
                        </ListItemIcon>
                        <ListItemText primary="Reports" />
                    </ListItemButton>
                </ListItem>
            </Link>
        </DashboardPage>
  )
}

export default Pms