import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

function MedicineLotUpdateModal({ updateLot, updateLotOpen, handleUpdateClose, updateMedicineLlot, deleteMedidcineLot }: { updateLot:any, updateLotOpen: boolean, handleUpdateClose: () => void, updateMedicineLlot: (id:number,remove:number) => void, deleteMedidcineLot: (id:number) => void }) {

  const [remove,setRemove] = React.useState<number>(0);

  return (
    <div>
      <Modal
        open={updateLotOpen}
        onClose={handleUpdateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} alignContent="center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modify Medicine lot {updateLot.id}
          </Typography>
          
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 3, width: '25ch' },
              }}
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                updateMedicineLlot(updateLot.id,remove);
                handleUpdateClose();
              }}
            >
              <Box>
                <TextField required type="number" id="outlined-basic2" label="Remove" variant="outlined" name="amount" onChange={(e) => {
                  setRemove(Number(e.target.value));
                }} />
              </Box>
              <Stack direction="row" spacing={4}>
                <Button variant="outlined" color="error" onClick={()=>{
                    deleteMedidcineLot(Number(updateLot.id));
                    handleUpdateClose();
                }}>Detete</Button>
                <Button variant="outlined" color="success" type='submit'>Update</Button>
                <Button variant="outlined" color="info" onClick={handleUpdateClose} >Cancel</Button>
              </Stack>
            </Box>
          </Box>

        </Box>
      </Modal>
    </div>
  )
}

export default MedicineLotUpdateModal;
