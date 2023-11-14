import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button, Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function Carlist() {

    const [cars, setCars] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    const columns = [
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'year' },
        { field: 'price' },
        {
            cellRenderer: params => <Button
                size="small" color="error" onClick={() => deleteCar(params)}>
                Delete</Button>,
            width: 120
        },

    ]
    const REST_URL = 'https://carrestapi.herokuapp.com/cars';

    const deleteCar = (params) => {
        console.log("params:" + params.data._links.car.href);
        fetch(params.data._links.car.href, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setMsg('Car is deleted successfully!')
                    setOpen(true);
                    getCars();
                }
                else {
                    alert('Something went wrong!')
                }
            })
            .catch(error => console.error(error));
    }

    useEffect(() => getCars(), []);

    const getCars = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData" + responseData._embedded.cars)
                setCars(responseData._embedded.cars)
            })
            .catch(error => console.error(error));

    }

    const addCar = (car) => {

        fetch(REST_URL,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(car)
            })

            .then(response => {
                if (response.ok) {
                    getCars();
                }
                else {
                    alert('Something went wrong when adding a car');
                }
            })
            .catch(err => console.log(err))


    }

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }


    return (
        <>
            <AddCar addCar={addCar} />
            <div className="ag-theme-material"
                style={{ height: '600px', width: '95%', margin: 'auto' }} >
                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={8}

                >
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}
                ></Snackbar>

            </div>
        </>
    )
}