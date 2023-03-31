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

function UserSubscriptionRow({ item, index }) {
     

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
                 {item.courseID.name}
            </TableCell>
            <TableCell>
                    {renderDate(item.courseID.createdAt)}
            </TableCell>
            <TableCell>
                    {renderDate(item.courseID.updatedAt)}
            </TableCell>
            <TableCell>
                 
            </TableCell>
             
           
        </TableRow>
    )
}

export default UserSubscriptionRow
