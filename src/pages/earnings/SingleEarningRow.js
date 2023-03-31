import React from 'react'

import TableRow from '@mui/material/TableRow';

import TableCell from '@mui/material/TableCell';
import { Button } from '@mui/material';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import EditIcon from '@mui/icons-material/Edit';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import DeleteIcon from '@mui/icons-material/Delete';
import {  imageBaseUrl } from '../../config';
import BlockIcon from '@mui/icons-material/Block';
import { Link, useNavigate, Redirect } from 'react-router-dom'

function SingleUserRow({row,index,openDeleteAlertModal,openBlockAlertModal}) {


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
                {index+1}
            </TableCell>
            <TableCell>
                
                <img src={row.profileImage ? (imageBaseUrl + row.profileImage) : ('/Assets/userProfile.png')} height={30} style={{ borderRadius: '50%' }} />
                {row.userID.name}
            </TableCell>
            <TableCell>{row.transactionID}</TableCell>
            <TableCell>{renderDate(row.transactionDate)}</TableCell>
            <TableCell>{row.status == true ? ('Completed') : ('Cancelled')}</TableCell>
            <TableCell>{row.amount}</TableCell> 
         
        </TableRow>
    )
}

export default SingleUserRow
