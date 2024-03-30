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
    const [query, setQuery] = useState("")


    useEffect(
        () => {
            axios.get("/api/pms/medicineall").then((res: any) => {
               setData(res.data)
            })
        },[]
    )

const setSearch = (query : string) => {
    setQuery(query)
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
        <MedicineTable query = {query} medicine = {data}/>
        <MedicineDialog open = {modalOpen} handleClose = {() => {setModalOpen(false)}} />
    </>
  )
}

export default Medicine