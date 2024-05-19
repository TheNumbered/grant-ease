import { Button, Divider, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMutation } from "../../../dataprovider";
import { useGlobal } from "../../../layouts";

const CreateFundingOpportunity = () => {
  const { mutate: createFundingOpportunity } = createMutation({
    resource: "manager/create-funding-opportunities",
    invalidateKeys: ["funding-opportunities"],
    contentType: "empty",
  });
  const { showAlert } = useGlobal();
  const [image, setImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const errors = validateForm(form);
    if (Object.keys(errors).length === 0) {
      createFundingOpportunity(form);
      
      event.target.reset();
      setImage(null);
      showAlert("Funding Opportunity created successfully", "success");
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
      <Grid component={'article'} item xs={12} sm={8} md={6} lg={8}>
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
