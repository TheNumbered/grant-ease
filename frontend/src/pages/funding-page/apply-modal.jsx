import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { createMutation } from "../../dataprovider";

const ApplyModal = ({open, fund, onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const { mutate: applyForFunding , isLoading: uploading } = createMutation({
    resource: "user/applications",
    invalidateKeys: ["funding-opportunities"],
    contentType: "empty"
  });

  const handleConfirm = async () => {  
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("attachments", file);
      });
      formData.append("fund_id", fund.id);
      applyForFunding(formData);
      onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Documents for {fund.title}</DialogTitle>
      <DialogContent>
        <input type="file" multiple onChange={handleFileChange} />
      </DialogContent>
      <DialogActions>
        {uploading && <CircularProgress />}
        <Button onClick={handleConfirm} disabled={uploading || selectedFiles.length === 0}>
          Confirm
        </Button>
        <Button onClick={onClose} disabled={uploading}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplyModal;
