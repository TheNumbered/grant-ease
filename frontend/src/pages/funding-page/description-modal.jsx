import { Box, Button, Modal, Typography } from "@mui/material";

const DescriptionModal = ({ open, description, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component={"section"}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxHeight: '80vh', // Set a maximum height for the modal
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflow: 'auto', // Enable scrolling
          border: '1px solid #ffd661',
        }}
      >
        <Typography variant="h6" component="h2">
          Full Description
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Button onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default DescriptionModal;
