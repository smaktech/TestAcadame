import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Typography } from '@mui/material'
import { Modal as BootstrapModal } from 'react-bootstrap'
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from 'src/config'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';  
import CloseIcon from '@mui/icons-material/Close';
import UserCoursesRow  from './UserCoursesRow'
import { useSnackbar } from 'notistack';
import { cancelSubscription, getSubscriptionCourses } from 'src/api/Subscription/Subscription';
function CancelSubscription({modalVisible,setModalVisible,sessionId,userId,updateStatusInParent}) {
    const [message,setMessage] = useState()
    const [cancelLoader,setCancelLoader]  = useState(false)
    const [courses,setCourses] = useState([])
    const [loader,setLoader] = useState(true)
    const { enqueueSnackbar } = useSnackbar();
    useEffect(async()=>{

        setLoader(true)
        const response = await getSubscriptionCourses(userId,sessionId)
        if(response.status)
        {
            setCourses(response.courses)
        }
        setLoader(false)
    },[])

    const cancelSubscriptionHandler=async ()=>
    {
            if(message&&message!='')
            {
                if(!cancelLoader)
                {
                    setCancelLoader(true)
                    const response = await cancelSubscription(userId,sessionId,message)
                    if(response.status)
                    {
                        updateStatusInParent("canceled")
                        setModalVisible(false)
                        enqueueSnackbar('Success', { variant: 'success' });
                    }
                    setCancelLoader(false)
                }
                
            }else
            {
                enqueueSnackbar('Cancel reason is required', { variant: 'error' });
            }
    }
  return (
    <Modal
        open={modalVisible}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onClose={() => setModalVisible(false)}
    >
        <Box sx={modalStyle}>
            <BootstrapModal.Header className="clr-primary-400 py-2">
                    {/* <BootstrapModal.Title id="contained-modal-title-vcenter" className="text-center"> */}
                        {/* <h4 className="text-center   mb-0">
                            Update Profile Image
                        </h4> */}
                         <Grid container>
                              <Grid item xs={11} lg={11} md={11} sm={11}>
                                  <Typography variant="h6">
                                      Cancel Subscription
                                  </Typography>
                              </Grid>
                              <Grid item xs={1} lg={1} md={1}>
                                  <Button  onClick={() => setModalVisible(false)}  >
                                      <CloseIcon />
                                  </Button>
                              </Grid>
                          </Grid>
                         
                    {/* </BootstrapModal.Title> */}
                </BootstrapModal.Header>
            <BootstrapModal.Body> 
                    <Grid container>
                        <Grid item md={10} xl={10} xs={10}>
                            <label>Cancel Reason</label>
                            <textarea className="form-control w-100" onChange={(e) =>setMessage(e.target.value)}></textarea>
                        </Grid>
                    </Grid>
                    <Box sx={{mt:2}}>
                        {/* <label style={{marginBottom:10}}> Courses was purchased in this transaction</label> */}
                        <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableCell>S.No.</TableCell> 
                                        <TableCell >Title</TableCell>
                                        <TableCell >Joined On</TableCell>
                                        <TableCell >Status</TableCell> 
                                    </TableHead>
                                    <TableBody>

                                        {loader?(

                                                <Box sx={{alignItems: 'center',justifyContent: 'center',display: 'flex',width:"100%",height:"100%"}}>
                                                    <CircularProgress size={20} />
                                                </Box>

                                        ):(

                                        
                                        
                                        courses.map((item,index)=>(
                                            <UserCoursesRow 
                                                item={item}
                                                index={index}
                                            />
                                        ))
                                        )}

                                    </TableBody>
                                </Table>
                        </TableContainer>
                    </Box>
                   <Typography sx={{mt:2,mb:2}}>

                       Note: These Courses will be removed permanently from user account upon subcsription cancellation
                   </Typography>
                    <div className="text-center mt-4 pb-3">
                            <Grid container>
                                <Grid item xs={5} lg={5} md={5} sm={5}>
                                    {/* <Button variant="outlined" className=" px-5"
                                        // onClick={()=>resetFilterData()}
                                        onClick={() => {}}
                                    >Go Back </Button> */}
                                </Grid>
                                &emsp;
                                <Grid item xs={6} lg={6} md={6} sm={6}>
                                    {cancelLoader ? (
                                        <Button variant="outlined" className=" px-5" >

                                            <CircularProgress size={20} />
                                        </Button>
                                    ) : (
                                        <Button variant="contained" className=" px-5"
                                            onClick={() => {cancelSubscriptionHandler()  }}
                                        >Cancel Subscription</Button>
                                     )}  
                                </Grid>
                            </Grid>
                        </div>
            </BootstrapModal.Body>
        </Box>
    </Modal>
  )
}

export default CancelSubscription