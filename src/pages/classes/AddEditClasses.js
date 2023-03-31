//page for all users listing!

import React, { useState, useEffect, forwardRef, useRef } from 'react'
import {  InputGroup, FormControl, Table } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useSelector } from 'react-redux'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import { updatePassword, changeName, uploadImage } from '../../api/Profile/Profile'
import Loader from "react-loader-spinner";
  
 import {useParams} from'react-router-dom'
 
import { BsSortDownAlt, BsFillTrashFill, BiBlock } from "react-icons/bs";

import MaterialTable from 'material-table'
import { editClass, createClass, getClassById } from "../../api/Classes/Classes"


import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material'
import { Modal as BootstrapModal} from 'react-bootstrap'
import Grid from '@mui/material/Grid'; 
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from 'src/config'

export default function AddEditClasses(props) {
    console.log(props)
    // const classId = props.match.params.classId;
    // const classStatus = props.match.params.classStatus;
    const {classId, classStatus} = useParams()
    const [mode, setMode] = useState(classId ? "edit" : "add")

    const [modalVisible, setModalVisible] = useState(false)
    const navigate =  useNavigate()

    //sets and display the line in the success modal!
    const [modalLine1, setModalLine1] = useState('');
    const [modalLine2, setModalLine2] = useState('')

    //sets the loader for add class button
    const [addLoader, setAddLoader] = useState(false)

    //sets the loader for edit class button
    const [editLoader, setEditLoader] = useState(false)

    //sets the loader for edit subject button
    const [editFormLoader, setEditFormLoader] = useState(false)

    //sets the name of the class user want to add
    const [className, setclassName] = useState();

    //shows the error when users try to add class without name
    const [errorMessage, setErrorMessage] = useState(false);
    const [error, showError] = useState(false);

    //updating mode state on change of class id
    useEffect(() => {
        setMode(classId ? "edit" : "add")
        setEditFormLoader(true)
        getClassById(classId).then((res) => {
            console.log('res', res);
            if (res.status) {
                //setting the fetched class by id into state variable
                setclassName(res.course.name)
            }
            setEditFormLoader(false)
        })
            .catch((err) => {
                console.error(err);
            });
    }, [classId])

    //edit the details basically the name of the existing class
    function editclassDetails() {
        setModalVisible(false);
        setEditLoader(true);
        showError(false);
        if (className != '') {
            editClass(classId, className, classStatus)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        setEditLoader(false);
                        setModalLine1('Qualification details has been');
                        setModalLine2('updated successfully')
                        setModalVisible(true)
                    }
                    else {
                        setEditLoader(false);
                        showError(true);
                        setErrorMessage('Error occured');
                    }

                })
                .catch((err) => {
                    console.error(err);
                    setEditLoader(false)
                    showError(true);
                    setErrorMessage('Error occured');
                })
        }
        else {
            setAddLoader(false)
            showError(true);
            setErrorMessage('Please fill the class name');
        }

    }

    //adds new class 
    function addNewclass() {
        setModalVisible(false);
        setAddLoader(true);
        showError(false);
        if (className != '') {
            createClass(className, 'active')
                .then((res) => {
                    // console.log(res);
                    if (res.status) {
                        setAddLoader(false);
                        setModalLine1('New Qualification Added');
                        setModalLine2('Successfully')
                        setModalVisible(true)
                    }
                    else {
                        setAddLoader(false);
                        showError(true);
                        setErrorMessage('Error occured');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setAddLoader(false)
                    showError(true);
                    setErrorMessage('Error occured');
                })
        }
        else {
            setAddLoader(false)
            showError(true);
            setErrorMessage('Please fill the class name');
        }
    }


    // function to reset
    const reSetForm = () => {
        setclassName('')
    }

    return (
        <>


            {/* <div className="container" style={{overflowY: 'scroll'}}> */}
            <h5 className="mt-3 txt-5282F0 fw-bold">Qualification Management</h5>
            <hr className="mt-4" />
            {editFormLoader ? (
                <div className='w-100 py-2 px-6 me-3' style={{ display: 'flex', height:'100vh',justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress size={20}/>
                </div>
            ) : (
                <>
                    <div className=" align-items-center">
                        <Card className="w-100">
                            <CardContent className="pageHeaderCard">
                                <div className="row">
                                    <label>Class Name</label>
                                    {
                                        (error) ?
                                            <div class="row pt-2 " style={{ margin: 5 }}>
                                                <div class="col-md-5  col-sm-12 clr-danger-100">
                                                    <div class="   text-center">
                                                        {errorMessage}
                                                    </div>
                                                </div> 
                                            </div>
                                            :
                                            <> </>
                                    }
                                    <div className="col-lg-6 col-sm-6 col-12">
                                        <InputGroup className="mb-3" >

                                            {mode == 'edit' ? (
                                                <FormControl
                                                    placeholder="Enter class Name"
                                                    aria-label="Search"
                                                    aria-describedby="basic-addon1"
                                                    onChange={(e) => setclassName(e.target.value)}
                                                    value={className}
                                                />
                                            ) : (
                                                <FormControl
                                                    placeholder="Enter class Name"
                                                    aria-label="Search"
                                                    aria-describedby="basic-addon1"
                                                    onChange={(e) => setclassName(e.target.value)}
                                                />
                                            )}

                                        </InputGroup>
                                    </div>


                                </div>

                            </CardContent>
                        </Card>
                        <div className="row">

                            {mode == "edit" ? (
                                <>
                                    <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                        <Button  variant="outlined"  onClick={() => navigate('/dashboard/classes')} >Cancel</Button>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                        {editLoader ? ( 
                                            <Button variant="outlined"  >
                                               <CircularProgress size={20}/>
                                            </Button>
                                        ) : (
                                            <Button variant="contained"  onClick={() => { editclassDetails() }}>Save Changes</Button>
                                        )}
                                    </div>
                                </>
                            ) : (

                                <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                    {addLoader ? (
                                        <Button variant="outlined"  >
                                            <CircularProgress size={20}/>
                                        </Button>
                                    ) : (
                                        <Button variant="contained" 
                                            onClick={() => addNewclass()}
                                        >Add Qualification</Button>
                                    )}

                                </div>
                            )}

                        </div>
                    </div>

                </>
            )}
            <Modal
                open={modalVisible}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onClose={() => setModalVisible(false)}
            >
                <Box sx={modalStyle}>
                    <BootstrapModal.Body>
                        <div className="text-center txt-5282F0 my-4" style={{alignItems: 'center',display: 'flex',flexDirection: 'column'}}>
                            <img src={'/Assets/modalPhoto.png'} />
                            <h3>{modalLine1}</h3>
                            <h3 className="modalLowerText">{modalLine2}</h3>
                        </div>
                        <div className="text-center mt-4 pb-3">
                            <Button variant="outlined"  style={{ marginRight: 10 ,marginTop: 10 }}
                                onClick={() => { mode == 'add' ? (<>{setModalVisible(false),reSetForm() }</>) : (<>{setModalVisible(false),reSetForm(),navigate('/dashboard/classes/addClass')}</>) }}
                            >Add New Qualification</Button>
                            &emsp;
                            <Button variant="contained"  style={{ marginRight: 10 ,marginTop: 10 }}
                                onClick={() => navigate('/dashboard/classes')}
                            >Back To Qualification</Button>
                        </div>
                    </BootstrapModal.Body>
                </Box>
            </Modal>



            {/* </div> */}

        </>
    )
}
