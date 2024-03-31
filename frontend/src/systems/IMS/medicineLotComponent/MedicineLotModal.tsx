import { Box, Button, Modal, Typography } from '@mui/material';
import MedicineLotTable from './MedicineLotTable';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function MedicineLotModal({ openLotModal, handleLotModalClose, lotModalData }: { openLotModal: boolean, handleLotModalClose: () => any, lotModalData: any }) {
  return (
    <div>
      <Modal
        open={openLotModal}
        onClose={handleLotModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant='h5' sx={{ fontSize: '1.4rem' }} id="modal-modal-title" component="h2" textAlign='center'>
            Medicine ID : {lotModalData.id}
          </Typography>
          <Typography variant='h6' sx={{ fontSize: '1rem' }}>Medicine Name : {lotModalData.Item.name}</Typography>
          <Typography variant='h6' sx={{ fontSize: '1rem' }}>Origin : {lotModalData.inHouse ? "In-House" : "Out-Source"}</Typography>
          <Typography variant='h6' sx={{ fontSize: '1rem' }}>Unit : {lotModalData.Item.unit}</Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          </Typography>
          <MedicineLotTable id={lotModalData.id} />
          <Box display={'flex'} alignContent='end'>
          <Button  onClick={handleLotModalClose} color='info' >Close</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default MedicineLotModal;
