import React, { useState,useEffect } from 'react'

import TableRow from '@mui/material/TableRow';

import TableCell from '@mui/material/TableCell';
import { Avatar, Button } from '@mui/material';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import EditIcon from '@mui/icons-material/Edit';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import DeleteIcon from '@mui/icons-material/Delete';

import CircularProgress from '@mui/material/CircularProgress';

import { Link, useNavigate, Redirect } from 'react-router-dom'
import { baseUrl } from 'src/config';
import CancelSubscription from './CancelSubscription';
import { refundSubscription } from 'src/api/Subscription/Subscription';
import { useSnackbar } from 'notistack';
function UserPaymentRow({ item, index }) {
     
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    //returns the created date of the record of the table
    function renderDate(date) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const newDate = new Date(date);
        const returnDate = months[newDate.getMonth()] + ' ' + newDate.getDate() + ' ' + newDate.getFullYear();
        return returnDate;
    }

    const [cancellationStatus,setCancellationStatus] = useState(item.cancellationStatus)
    const [modalVisible, setModalVisible] = useState(false)
    const [refundLoader,setRefundLoader] = useState(false)



    const refundSubscriptionHandler=async ()=>
    {
            
                if(!refundLoader)
                {
                    setRefundLoader(true)
                    const response = await refundSubscription(item.userID._id,item.transactionID)
                    if(response.status)
                    {
                        setCancellationStatus("refunded")
                        setModalVisible(false)
                        enqueueSnackbar('Success', { variant: 'success' });
                    }
                    setRefundLoader(false)
                }
                
            
    }
    useEffect(() => {
        setCancellationStatus(item.cancellationStatus)
    },[item])
    console.log(item.cancellationMessage," item")
    return (
        <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell>
                {index + 1}
            </TableCell>
            <TableCell>
                 {item.transactionID}
            </TableCell>
            <TableCell>
                    {renderDate(item.transactionDate)}
            </TableCell>
            <TableCell>{item.status?('Completed') : ('Cancelled')}</TableCell>
            <TableCell>{item.amount}</TableCell> 
            <TableCell>
                 {cancellationStatus=="canceled"?("Cancelled"):cancellationStatus=="refunded"?("Refunded"):("N.A.")}
            </TableCell>
            <TableCell>
                {item.cancellationDate?renderDate(item.cancellationDate):("N.A.")}
            </TableCell> 
            <TableCell>
                {item.cancellationMessage}
            </TableCell> 
            <TableCell>
                {cancellationStatus=="canceled"?(
                     refundLoader ? (
                        <Button variant="outlined" className=" px-5" >

                            <CircularProgress size={20} />
                        </Button>
                    ) :(
                        <Button  variant="contained" onClick={()=>refundSubscriptionHandler()}> Mark Refunded </Button>
                    )
                ):(
                    cancellationStatus!="refunded"?(
                        <Button  variant="contained" onClick={()=>setModalVisible(true)}> Cancel </Button>  
                    ):(null)
                    
                )}
                
            </TableCell> 
             
                                
           {modalVisible&&<CancelSubscription
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                userId={item.userID._id}
                sessionId={item.transactionID}
                updateStatusInParent ={setCancellationStatus}
            />}
        </TableRow>
    )
}

export default UserPaymentRow
