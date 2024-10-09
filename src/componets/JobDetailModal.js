import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions,  Box, Typography, Button } from '@mui/material';
import { AuthContext } from '../pages/AuthContext';

const JobDetailModal = ({ jobs }) => {
    
  const { jobId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("is this login:",user)
  const job = jobs.find((job) => job.id === jobId);
    console.log("job info display:" , job)
  if (!job) {
    return <Typography>No job found.</Typography>;
  }

  // If not logged in, redirect to login page
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Dialog
    open={true}
    onClose={() => navigate('/')}
    maxWidth="sm"
    fullWidth
  >
    <DialogTitle>{job.title}</DialogTitle>
    <DialogContent dividers>
      <Typography variant="body1" gutterBottom>
        {job.description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Skills: {job.skills.join(', ')}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => navigate('/')}
        variant="contained"
        color="primary"
      >
        Close
      </Button>
    </DialogActions>
  </Dialog>
  );
};

export default JobDetailModal;
