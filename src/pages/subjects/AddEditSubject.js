//page for all users listing!

import React, { useState, useEffect, forwardRef, useRef } from 'react'
import { InputGroup, FormControl, Table, Form } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useSelector } from 'react-redux'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import { updatePassword, changeName, uploadImage } from '../../api/Profile/Profile'
import Loader from "react-loader-spinner";


import { useParams } from 'react-router-dom'

import { BsSortDownAlt, BsFillTrashFill, BiBlock } from "react-icons/bs";

import MaterialTable from 'material-table'
import { fetchSubjects, editSubject, deleteSubject, getSubjectById } from "../../api/Subject/Subject"
import { createSubject } from '../../api/Subject/Subject'

import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Input, TextField } from '@mui/material'
import { Modal as BootstrapModal } from 'react-bootstrap'
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from 'src/config'

export default function AddEditSubject(props) {
    const { subjectId, subjectStatus } = useParams();

    const [mode, setMode] = useState(subjectId ? "edit" : "add")

    const [modalVisible, setModalVisible] = useState(false)
    const navigate = useNavigate()

    //sets and display the line in the success modal!
    const [modalLine1, setModalLine1] = useState('');
    const [modalLine2, setModalLine2] = useState('')

    //setting subjects data into a variable
    const [subjects, setSubjects] = useState({});

    //sets the loader for add subject button
    const [addLoader, setAddLoader] = useState(false)

    //sets the loader for edit subject button
    const [editLoader, setEditLoader] = useState(false)
    //sets the loader for edit subject button
    const [editFormLoader, setEditFormLoader] = useState(false)

    //sets the name of the subject user want to add
    const [subjectName, setSubjectName] = useState();

    const [subjectIcon, setSubjectIcon] = useState(null);

    //shows the error when users try to add subject without name
    const [errorMessage, setErrorMessage] = useState(false);
    const [error, showError] = useState(false);



    //updating mode state on change of subject id
    useEffect(() => {
        setMode(subjectId ? "edit" : "add")
    }, [subjectId])

    useEffect(() => {
        setMode(subjectId ? "edit" : "add")
        setEditFormLoader(true)
        getSubjectById(subjectId).then((res) => {
            console.log('res', res);
            if (res.status) {
                //setting the fetched subject by id into state variable
                setSubjects(res.course);
                setSubjectName(res.course.name)
            }
            setEditFormLoader(false)
        })
            .catch((err) => {
                console.error(err);
            });

    }, [subjectId])

    //edit the details basically the name of the existing subject
    function editSubjectDetails() {
        setModalVisible(false);
        setEditLoader(true);
        showError(false);
        if (subjectName != '') {
            console.log(subjectName)
            editSubject(subjectId, subjectName, subjectStatus,subjectIcon)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        setEditLoader(false);
                        setModalLine1('Subject details has been');
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
            setErrorMessage('Please fill the subject name');
        }

    }

    //adds new subject 
    function addNewSubject() {
        setModalVisible(false);
        setAddLoader(true);
        showError(false);
        if (subjectName != '') {
            createSubject(subjectName, 'active', subjectIcon)
                .then((res) => {
                    // console.log(res);
                    if (res.status) {
                        console.log(res)
                        setAddLoader(false);
                        setModalLine1('New Subject Added');
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
            setErrorMessage('Please fill the subject name');
        }
    }

    // function to reset 
    const reSetForm = () => {
        setSubjectName('')
    }


    return (
        <>


            {/* <div className="container" style={{overflowY: 'scroll'}}> */}
            <h5 className="mt-3 txt-5282F0 fw-bold">Subject Management</h5>
            <hr className="mt-4" />
            {editFormLoader ? (
                <div className='w-100 py-2 px-6 me-3' style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Loader
                        type="Puff"
                        color="blue"
                        height={30}
                        width={30}
                    /> */}
                    <CircularProgress size={20} />

                </div>
            ) : (
                <>
                    <div className=" align-items-center">
                        <Card className="w-100">
                            <CardContent className="pageHeaderCard">
                                <div className="row">
                                    {
                                        (error) ?
                                            <div class="row pt-2 " style={{ margin: 5 }}>
                                                <div className="col-md-5  col-sm-12 clr-danger-100">
                                                    <div className="   text-center">
                                                        {errorMessage}
                                                    </div>
                                                </div>

                                            </div>
                                            :
                                            <> </>
                                    }
                                    <div className="col-lg-6 col-sm-6 col-12">
                                        {/* <InputGroup className="mb-3" >

                                            <FormControl
                                                placeholder="Enter Subject Name"
                                                aria-label="Search"
                                                aria-describedby="basic-addon1"
                                                onChange={(e) => setSubjectName(e.target.value)}
                                                value={subjectName}
                                            />

                                        </InputGroup> */}
                                        <Form>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Subject Name</Form.Label>
                                                <Form.Control name='name' value={subjectName} type="text" placeholder="Enter Sub Topic Name" onChange={(e) => setSubjectName(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Choose Icon</Form.Label>
                                                <Form.Control name='image' type="file" placeholder="choose Sub Topic Exam Zip" onChange={(e) => setSubjectIcon(e.target.files[0])} />
                                            </Form.Group>
                                        </Form>
                                    </div>


                                </div>
                                <div className="row">
                                    {/* <form onSubmit={createSub}>
                                        <TextField
                                            sx={{ width: '50%' }}
                                            label="Enter Subject Name"
                                            variant="outlined"
                                            placeholder='Enter Subject Name'
                                            onChange={(e) => setSubjectName(e.target.value)} />
                                        <br />
                                        <Input
                                            sx={{ width: '50%' }}
                                            accept="image/*"
                                            type="file"
                                            onChange={(e) => setSubjectIcon(e.target.files[0])} />
                                        <br />
                                        <Button
                                            variant="contained"
                                            type='submit'
                                        >
                                            Upload
                                        </Button>
                                    </form> */}

                                </div>

                            </CardContent>
                        </Card>
                        <div className="row">

                            {mode == "edit" ? (
                                <>
                                    <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                        <Button variant="outlined" className=" py-2 px-6 me-3" onClick={() => navigate('/dashboard/subjects')}>Cancel</Button>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                        {editLoader ? (
                                            <Button variant="outlined" className=" py-2 px-6 me-3" >
                                                {/* <Loader
                                                    type="Puff"
                                                    color="white"
                                                    height={30}
                                                    width={30}
                                                /> */}
                                                <CircularProgress size={20} />
                                            </Button>
                                        ) : (
                                            <Button variant="contained" onClick={() => { editSubjectDetails() }}>Save Changes</Button>
                                        )}
                                    </div>
                                </>
                            ) : (

                                <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                    {addLoader ? (
                                        <Button variant="outlined"  >
                                            {/* <Loader
                                                type="Puff"
                                                color="white"
                                                height={30}
                                                width={30}
                                            /> */}
                                            <CircularProgress size={20} />
                                        </Button>
                                    ) : (
                                        <Button variant="contained"
                                            onClick={() => addNewSubject()}
                                        >Add Subject</Button>
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
                        <div className="text-center txt-5282F0 my-4" style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                            <img src={'/Assets/modalPhoto.png'} />
                            <h3>{modalLine1}</h3>
                            <h3 className="modalLowerText">{modalLine2}</h3>
                        </div>
                        <div className="text-center mt-4 pb-3">
                            <Button variant="outlined" style={{ marginRight: 10, marginTop: 10 }}
                                onClick={() => { mode == 'add' ? (<>{setModalVisible(false), reSetForm()}</>) : (navigate('/dashboard/subjects/addSubject')) }}
                            >Add New Subject</Button>
                            &emsp;
                            <Button variant="contained" style={{ marginRight: 10, marginTop: 10 }}
                                onClick={() => navigate('/dashboard/subjects')}
                            >Back To Subjects</Button>
                        </div>
                    </BootstrapModal.Body>
                </Box>
            </Modal>


            {/* </div> */}

        </>
    )
}
