import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";


export default function AddCar(props) {

    const [car, setCar] = useState({ brand: '', model: '' });
    const [open, setOpen] = useState(false); //is dialog open?

    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    const handleInputChanged = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        props.addCar(car);
        setOpen(false);
    }

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="container">New Car</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>

                <DialogContent>
                    <TextField
                        label='Brand'
                        value={car.brand}
                        name="brand"
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        label='Model'
                        name="model"
                        value={car.model}
                        onChange={handleInputChanged}
                    >
                    </TextField>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}