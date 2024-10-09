import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState ,useEffect} from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import LoginForm from './LoginForm';
export default function LoginPage() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (!open) {
          navigate('/'); 
        }
      }, [open, navigate]);
    const handleClose = ()=>{
        setOpen(false);
        navigate("/")
    }
  return (
    <Dialog open={open} onClose={handleClose}
    BackdropProps={{
        style: { backgroundColor: 'rgba(0, 0, 0, 1)' },
      }}>
    <LoginForm/>
  </Dialog>
  )
}
