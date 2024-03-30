import React, { useEffect, useState } from 'react'
import MedicineTable from './Components/MedicineTable'
import axios from 'axios'
import { Add, Flag } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import SearchInput from './Components/SearchBar'
import MedicineDialog from './Components/MedicineDialog'
import { enqueueSnackbar } from 'notistack'




const Medicine = () => {
    
    const [data, setData] = useState()
    const [modalOpen, setModalOpen] = useState(false)


    useEffect(
        () => {
            axios.get("/api/pms/medicineall").then((res: any) => {
               setData(res.data)
            })
        },[]
    )

    


const setSearch = (query : String) => {
enqueueSnackbar('I am an exception', {
  variant:"success"
})
}

    
    return (
    <>
         <Box sx={{ display: "flex" }} mt={4} mx={2}>
            <SearchInput onChange={(s) => setSearch(s)}/>
            <Box flexGrow={1}></Box>
            <Button variant="outlined" startIcon={<Add />} onClick={() => setModalOpen(true)}>
                Add Medicine
            </Button>
        </Box>
        <MedicineTable medicine = {data}/>
        <MedicineDialog open = {modalOpen} handleClose = {() => {setModalOpen(false)}} />
    </>
  )
}

export default Medicine