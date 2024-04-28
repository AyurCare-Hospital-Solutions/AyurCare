// import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
// import React from 'react'

// function AddManufactureRequest({ handleClose, open, addManufactureRequest,
//     medicineNames, setReqMedicine, selectOption, setReqAmout, reqAmount, priority, setPriority }
//     : {
//         handleClose: () => any, open: boolean, addManufactureRequest: () => void, medicineNames: any,
//         setReqMedicine: (p1: any) => void, selectOption: any, setReqAmout: (p1: any) => void,
//         reqAmount: any, priority: any, setPriority: (p1: any) => void
//     }) {

//     return (
//         <div>
//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 fullWidth
//             >

//                 <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
//                     <Box>
//                         <Typography color='primary' align="center" variant="h5">
//                             Add Manufacture Request
//                         </Typography>
//                     </Box>

//                     <Box
//                         display="flex"
//                         flexDirection="column"
//                         component="form"
//                         sx={{
//                             '& > :not(style)': { m: 1, width: '25ch' },
//                         }}
//                         noValidate
//                         autoComplete="on"
//                         onSubmit={(e) => {
//                             e.preventDefault();
//                             addManufactureRequest();
//                         }}
//                     >
//                         <Box>
//                             <Autocomplete
//                                 disablePortal
//                                 id="combo-box-demo"
//                                 options={medicineNames}
//                                 sx={{ width: 300 }}
//                                 onChange={(_e, v: any) => setReqMedicine(v.medicine.id)}
//                                 renderInput={(params) => <TextField {...params} label="Medicine" />}
//                                 value={selectOption}
//                             />
//                         </Box>
//                         <Box>
//                             <TextField type="number" id="outlined-basic" label="Amount"
//                                 variant="outlined" onChange={(e) => {
//                                     setReqAmout(Number(e.target.value));
//                                 }}
//                                 value={reqAmount}
//                             />
//                         </Box>

//                         <Box>
//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">Priority</InputLabel>
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     value={priority}
//                                     label="Priority"
//                                     onChange={(event) => {
//                                         setPriority(event.target.value)
//                                     }}
//                                 >
//                                     <MenuItem value={1}>Is priority</MenuItem>
//                                     <MenuItem value={0}>Not Priority</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Box>


//                         <Button variant="contained" color="primary" type='submit'>Add Request</Button>
//                     </Box>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     )
// }

// export default AddManufactureRequest
