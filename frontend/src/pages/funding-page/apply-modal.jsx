import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { createMutation } from "dataprovider";

const ApplyModal = ({ open, fund, onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const [additionalFieldsData, setAdditionalFieldsData] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const { mutate: notify } = createMutation({ resource: "notify" });

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];
    const fileExtension = file.name.split(".").pop();
    setSelectedFiles((prev) => ({
      ...prev,
      [name]: { file, fileExtension },
    }));
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setAdditionalFieldsData((prev) => {
      const fieldIndex = prev.findIndex((field) => field.label === name);
      if (fieldIndex > -1) {
        const updatedFields = [...prev];
        updatedFields[fieldIndex].value = value;
        return updatedFields;
      } else {
        return [...prev, { label: name, value }];
      }
    });
  };

  useEffect(() => {
    const requiredFiles = fund.required_files
      ? JSON.parse(fund.required_files)
      : [];
    const additionalFields = fund.additional_fields
      ? JSON.parse(fund.additional_fields)
      : [];

    const allFieldsFilled = additionalFields.every((field) =>
      additionalFieldsData.some((data) => data.label === field.name && data.value)
    );

    const allFilesSelected = requiredFiles.every((file) => selectedFiles[file.file_name]);

    setIsFormValid(allFieldsFilled && allFilesSelected);
  }, [additionalFieldsData, selectedFiles, fund]);

  const { mutate: applyForFunding, isLoading: uploading } = createMutation({
    resource: "user/applications",
    invalidateKeys: ["funding-opportunities"],
    contentType: "empty",
  });

  const handleConfirm = async () => {
    const formData = new FormData();
    Object.entries(selectedFiles).forEach(
      ([fieldName, { file, fileExtension }]) => {
        formData.append("attachments", file, `${fieldName}.${fileExtension}`);
      }
    );
    formData.append("fund_id", fund.id);
    formData.append("additional_fields", JSON.stringify(additionalFieldsData));
    notify({ "type": "new applicant", "fund_id": fund.id });
    applyForFunding(formData);
    onClose();
  };

  const requiredFiles = fund.required_files
    ? JSON.parse(fund.required_files)
    : [];
  const additional_fields = fund.additional_fields
    ? JSON.parse(fund.additional_fields)
    : [];

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Apply to {fund.title}</DialogTitle>
      <DialogContent>
        {additional_fields.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Additional Fields</Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {additional_fields.map((field) => (
                <Grid item xs={12} key={field.name}>
                  <TextField
                    fullWidth
                    label={field.name}
                    type={field.data_type}
                    name={field.name}
                    required
                    placeholder={field.description}
                    onChange={handleFieldChange}
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {requiredFiles.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Required Documents</Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {requiredFiles.map((file) => (
                <Grid item xs={12} key={file.file_name}>
                  <label>{file.file_name}</label>
                  <input
                    type="file"
                    name={file.file_name}
                    onChange={handleFileChange}
                    required
                    style={{
                      display: "block",
                      marginTop: "8px",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      width: "100%",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        {uploading && <CircularProgress />}
        <Button onClick={handleConfirm} disabled={uploading || !isFormValid}>
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
