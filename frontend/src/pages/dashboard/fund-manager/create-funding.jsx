import { useGlobal } from "@/layouts";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Divider, Grid, IconButton, InputAdornment, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { createMutation } from "dataprovider";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateFundingOpportunity = () => {
  const { mutate: createFundingOpportunity } = createMutation({
    resource: "manager/create-funding-opportunities",
    invalidateKeys: ["funding-opportunities"],
    contentType: "empty",
  });
  const { showAlert } = useGlobal();
  const [image, setImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [additionalFields, setAdditionalFields] = useState([]);
  const [requiredFiles, setRequiredFiles] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, { name: "", description: "", data_type: "" }]);
  };

  const handleRemoveField = (index) => {
    const newFields = additionalFields.filter((_, i) => i !== index);
    setAdditionalFields(newFields);
  };

  const handleFieldChange = (index, field, value) => {
    const newFields = [...additionalFields];
    newFields[index][field] = value;
    setAdditionalFields(newFields);
  };

  const handleAddRequiredFile = () => {
    setRequiredFiles([...requiredFiles, { file_name: "", description: "" }]);
  };

  const handleRemoveRequiredFile = (index) => {
    const newFiles = requiredFiles.filter((_, i) => i !== index);
    setRequiredFiles(newFiles);
  };

  const handleRequiredFileChange = (index, field, value) => {
    const newFiles = [...requiredFiles];
    newFiles[index][field] = value;
    setRequiredFiles(newFiles);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    form.append("additional_fields", JSON.stringify(additionalFields));
    form.append("required_files", JSON.stringify(requiredFiles));
    const errors = validateForm(form);
    if (Object.keys(errors).length === 0) {
      createFundingOpportunity(form);
      event.target.reset();
      setImage(null);
      setAdditionalFields([]);
      setRequiredFiles([]);
      showAlert("Funding Opportunity created successfully", "success");
      setValidationErrors({});
    } else {
      setValidationErrors(errors);
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    const requiredFields = ["title", "description", "amount", "start_date", "end_date", "deadline"];
    requiredFields.forEach(field => {
      if (!formData.get(field)) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    // Validate image
    const image = formData.get("image");
    if (!image || !image.name) {
      errors["image"] = "Image is required";
    }
    return errors;
  };

  return (
    <>
      <Grid component={'article'} item xs={12} sm={8} md={6} lg={8} >
        <section
          className="breadcrum"
          style={{ padding: "2rem 4rem", paddingBottom: "0rem" }}
        >
          <a
            className="button breadcrum"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            {" "}
            {"<"} Go Back{"  "}
          </a>
        </section>
        <Paper component={'section'} elevation={0} style={{ padding: "2rem 4rem", backgroundColor: '#fffbef'}}>
          <Typography variant="h5" gutterBottom>
            Create Funding Opportunity
          </Typography>
          <small>Give clear details for the public to comprehend</small>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              label="Title"
              name="title"
              fullWidth
              margin="normal"
              error={!!validationErrors.title}
              helperText={validationErrors.title}
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              error={!!validationErrors.description}
              helperText={validationErrors.description}
            />
            <TextField
              label="Amount"
              name="amount"
              InputProps={{
                startAdornment: <InputAdornment position="start">R</InputAdornment>,
              }}
              fullWidth
              margin="normal"
              error={!!validationErrors.amount}
              helperText={validationErrors.amount}
            />
            <TextField
              label="Start Date"
              name="start_date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!validationErrors.start_date}
              helperText={validationErrors.start_date}
            />
            <TextField
              label="End Date"
              name="end_date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!validationErrors.end_date}
              helperText={validationErrors.end_date}
            />
            <TextField
              label="Deadline"
              name="deadline"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!validationErrors.deadline}
              helperText={validationErrors.deadline}
            />
            {/* Additional Fields Section */}
            <Divider style={{margin: '1rem 0'}}/>
            <Typography variant="h6" gutterBottom>
              Additional Fields
            </Typography>
            {additionalFields.map((field, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Name"
                    value={field.name}
                    onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Description"
                    value={field.description}
                    onChange={(e) => handleFieldChange(index, "description", e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Select
                    label="Data Type"
                    value={field.data_type}
                    onChange={(e) => handleFieldChange(index, "data_type", e.target.value)}
                    fullWidth
                    margin="normal"
                    displayEmpty
                  >
                    <MenuItem value="" disabled>Select Data Type</MenuItem>
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="number">Number</MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="boolean">Boolean</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={1} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <IconButton onClick={() => handleRemoveField(index)}>
                    <RemoveIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              variant="outlined"
              onClick={handleAddField}
              style={{ margin: '1rem 0' }}
              startIcon={<AddIcon />}
              fullWidth
            >
              Add Field
            </Button>
            {/* End of Additional Fields Section */}
            {/* Required Files Section */}
            <Divider style={{margin: '1rem 0'}}/>
            <Typography variant="h6" gutterBottom>
              Required Files
            </Typography>
            {requiredFiles.map((file, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12} sm={5}>
                  <TextField
                    label="File Name"
                    value={file.file_name}
                    onChange={(e) => handleRequiredFileChange(index, "file_name", e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Description"
                    value={file.description}
                    onChange={(e) => handleRequiredFileChange(index, "description", e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={1} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <IconButton onClick={() => handleRemoveRequiredFile(index)}>
                    <RemoveIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              variant="outlined"
              onClick={handleAddRequiredFile}
              style={{ margin: '1rem 0' }}
              startIcon={<AddIcon />}
              fullWidth
            >
              Add Required File
            </Button>
            {/* End of Required Files Section */}
            {/* File Attachment Section */}
            <input
              name="image"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="image"
            />
            <Divider style={{margin: '1rem 0'}}/>
            <Typography style={{textAlign: 'center'}} variant="body1">To Provide more information about your funding, attach an image with detailed description of what applicants need to know</Typography>
            <label htmlFor="image">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                style={{ marginTop: 20 }}
              >
                Attach Image
              </Button>
            </label>
            {image && (
              <Typography style={{textAlign: 'center'}} variant="body1">{image.name}</Typography>
            )}
            {/* End of File Attachment Section */}
            {/* Error message for image validation */}
            {validationErrors.image && (
              <Typography style={{textAlign: 'center'}} variant="body2" color="error">{validationErrors.image}</Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 20, padding: '1rem'}}
            >
              Create
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default CreateFundingOpportunity;
