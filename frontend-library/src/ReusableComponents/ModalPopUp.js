import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/joy";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalPopUp = ({
    open,
  handleClose,
  modalTitle,
  modalContent
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalTitle}
          </Typography>
          
          <IconButton
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
          }}
          onClick={handleClose}
        >
          <CloseIcon/>
        </IconButton>
          {modalContent}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalPopUp;
