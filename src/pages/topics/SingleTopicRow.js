import React from 'react'

import TableRow from '@mui/material/TableRow';

import TableCell from '@mui/material/TableCell';
import { Avatar, Button } from '@mui/material';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import EditIcon from '@mui/icons-material/Edit';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import DeleteIcon from '@mui/icons-material/Delete';


import { Link, useNavigate, Redirect } from 'react-router-dom'
import { baseUrl } from 'src/config';

function SingleTopicRow({ row, index, openDeleteAlertModal, changeTopicStatus, courseID }) {
    console.log(row)

    const navigate = useNavigate()
    //returns the created date of the record of the table
    function renderDate(date) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const newDate = new Date(date);
        const returnDate = months[newDate.getMonth()] + ' ' + newDate.getDate() + ' ' + newDate.getFullYear();
        return returnDate;
    }



    return (
        <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell>
                {index + 1}
            </TableCell>
            <TableCell>
                <Avatar alt="Remy Sharp" src={`${baseUrl}/${row.image}`} />
            </TableCell>
            <TableCell>
                {row.name}
            </TableCell>
            <TableCell>{renderDate(row.createdAt)}</TableCell>
            <TableCell>{row.status == 'inactive' ? ('In Active') : ('Active')}</TableCell>
            <TableCell>
                <>
                    {row.status == 'inactive' ? (
                        <Button

                            onClick={() => changeTopicStatus(row, index, 'active')}
                            variant="text"
                            color="secondary"
                        >
                            <ToggleOffIcon />
                        </Button>
                    ) : (
                        <Button variant="text"
                            onClick={() => changeTopicStatus(row, index, 'inactive')}

                        >
                            <ToggleOnIcon />
                        </Button>
                    )}
                    &emsp;
                    <Button variant="text"
                        onClick={() => navigate('/dashboard/topics/editTopic/' + row._id + '/' + row.status + '/' + row.name + "/" + courseID)}>
                        <EditIcon />
                    </Button>
                    &emsp;
                    <Button variant="text" onClick={() => openDeleteAlertModal(row._id, index)}>
                        <DeleteIcon />
                    </Button>
                    &emsp;
                    <Button variant="contained" onClick={() => navigate("/dashboard/topics/subTopic/" + row._id)}>
                        Manage Sub Topic
                    </Button>
                </>
            </TableCell>
        </TableRow>
    )
}

export default SingleTopicRow
