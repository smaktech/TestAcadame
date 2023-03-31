//page for all users listing!

import React, { useState, useEffect, forwardRef, useRef } from 'react'
import {InputGroup, FormControl, Table, Form } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useSelector } from 'react-redux'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import { updatePassword, changeName, uploadImage } from '../../api/Profile/Profile'
import Loader from "react-loader-spinner";
import { createTopic, editTopic, getTopicById } from '../../api/Topic/Topic'
import { createResourse, editResourse, getResourseById } from '../../api/Resourses/Resourses'

import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material'
import { Modal as BootstrapModal} from 'react-bootstrap'
import Grid from '@mui/material/Grid'; 
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from 'src/config'
import {useParams} from 'react-router-dom'


export default function AddEditResourse(props) {
    // const resourseID = props.match.params.resourseId;
    // const resourseStatus = props.match.params.resourseStatus;
    const {resourseID,resourseStatus} = useParams()
    console.log(props)
    // const subjectStatus = props.match.params.subjectStatus;
    const [mode, setMode] = useState(resourseID ? "edit" : "add")

    //setting subjects data into a variable
    const [resourse, setResourse] = useState({});

    const [modalVisible, setModalVisible] = useState(false)
    const navigate =  useNavigate()

    //sets and display the line in the success modal!
    const [modalLine1, setModalLine1] = useState('');
    const [modalLine2, setModalLine2] = useState('')

    //sets the loader for add subject button
    const [addLoader, setAddLoader] = useState(false)

    //sets the loader for edit subject button
    const [editLoader, setEditLoader] = useState(false)

    //sets the loader for edit subject button
    const [editFormLoader, setEditFormLoader] = useState(false)

    //sets the name of the resourse user want to add
    const [resourseName, setResourseName] = useState();

    //sets resourse description user want to add
    const [resourseDescription, setResourseDescription] = useState()

    //sets link type user want to add
    const [linkType, setLinkType] = useState()

    //sets resourse link user want to add
    const [linkString, setLinkString] = useState()

    //sets resourseFile user want to add
    const [resourseFile, setResourseFile] = useState()
    //sets resourse file user want to add
    const [filePreview, setFilePreview] = useState(null);

    //referance variable for video file choose
    let chooseResourseFileRef = useRef()

    // sets varialbe for file status
    const [fileStatus, setFileStatus] = useState(false)
    //shows the error when users try to add resourse without name
    const [errorMessage, setErrorMessage] = useState(false);
    const [error, showError] = useState(false);

    //updating mode state on change of subject id
    // useEffect(() => {
    // }, [resourseID])

    useEffect(() => {
        setMode(resourseID ? "edit" : "add")
        setEditFormLoader(true)
        getResourseById(resourseID).then((res) => {
            console.log('res', res);
            if (res.status) {
                //setting the fetched Resourse by id into state variable
                setResourse(res.course);
                setResourseName(res.course.name)
                setResourseDescription(res.course.description)
                setLinkType(res.course.fileLink.linkType)
                setFileStatus(res.course.fileLink.linkType)
                setLinkString(res.course.fileLink.linkString)
            }
            setEditFormLoader(false)
        })
            .catch((err) => {
                console.error(err);
            });

    }, [resourseID])

    //edit the details  of the existing Resourse
    function editResourseDetails() {
        setModalVisible(false);
        setEditLoader(true);
        showError(false);
        if (resourseID != '') {
            editResourse(resourseID, resourseName, resourseDescription, linkType, linkString, resourseFile, resourseStatus)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        setEditLoader(false);
                        setModalLine1('Resourse details has been');
                        setModalLine2('updated successfully')
                        setModalVisible(true)
                    }
                    else {
                        setEditLoader(false);
                        showError(true);
                        setErrorMessage(res.error.message);
                    }

                })
                .catch((err) => {
                    console.error(err);
                    setEditLoader(false)
                    showError(true);
                    setErrorMessage(err.message);
                })
        }
        else {
            setAddLoader(false)
            showError(true);
            setErrorMessage('Please fill all the resourse details');
        }

    }

    //adds new Resourse 
    function addNewResourse() {
        setModalVisible(false);
        setAddLoader(true);
        showError(false);
        if (resourseName && resourseDescription && linkType && linkString != '') {
            createResourse(resourseName, resourseDescription, linkType, linkString, resourseFile, 'active')
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        setAddLoader(false);
                        setModalLine1('New Resourse Added');
                        setModalLine2('Successfully')
                        setModalVisible(true)
                    }
                    else {
                        setAddLoader(false);
                        showError(true);
                        setErrorMessage(res.error.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setAddLoader(false)
                    showError(true);
                    setErrorMessage(err.message);
                })
        }
        else {
            setAddLoader(false)
            showError(true);
            setErrorMessage('Please fill the Resourse details');
        }
    }

    // on change resourse handler
    const onChangeResourseHandler = (e) => {
        var url = URL.createObjectURL(e.target.files[0]);
        setFilePreview(url)
        setResourseFile(e.target.files[0])
    }

     // function to reset 
    const reSetForm = () => {
        setResourseName("")
        setResourseDescription("")
        setLinkType("")
        setLinkString("")
        setResourseFile("")
    }

    return (
        <>


            {/* <div className="container" style={{overflowY: 'scroll'}}> */}
            <h5 className="mt-3 txt-5282F0 fw-bold">Resourses Management</h5>
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

                                        <Form>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control value={resourseName} type="text" placeholder="Enter Resourse Name" onChange={(e) => setResourseName(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control value={resourseDescription} placeholder="Enter Resourse Description" as="textarea" rows={3} onChange={(e) => setResourseDescription(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Select Link Type</Form.Label>
                                                <Form.Select value={linkType} onChange={(e) => setLinkType(e.target.value)} aria-label="Default select example">
                                                    <option selected value={null}>Select</option>
                                                    <option value='upload'>Upload</option>
                                                    <option value='link'>Link</option>
                                                </Form.Select>
                                            </Form.Group>
                                            {linkType != 'upload' ? (
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Link</Form.Label>
                                                    <Form.Control value={linkString} required type="text" placeholder="Enter Resourse Link" onChange={(e) => setLinkString(e.target.value)} />
                                                </Form.Group>
                                            ) : (
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Resourse File</Form.Label>
                                                    {mode == 'edit' ? (
                                                        fileStatus == "upload" ? (
                                                            <div className="col-6 col-lg-6 d-flex">
                                                                <img src="/Assets/addresourse(1).png" className="btn w-50 h-100" />
                                                                <div>
                                                                    <button type='button' className='text-danger btn fs-1' onClick={() => setFileStatus(null)}>&times;</button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div className="col-6 col-lg-6">
                                                                    <img src={filePreview ? "/Assets/addresourse(1).png" : "/Assets/addresourse(2).png"} className="btn w-50 h-100" type='button' onClick={() => chooseResourseFileRef.click()} />
                                                                </div>
                                                                <Form.Control ref={ref => chooseResourseFileRef = ref} type="file" placeholder="choose Topic video" onChange={(e) => onChangeResourseHandler(e)} style={{ visibility: 'hidden' }} />
                                                            </>
                                                        )

                                                    ) : (

                                                        <>
                                                            <div className="col-6 col-lg-6">
                                                                <img src={filePreview ? "/Assets/addresourse(1).png" : "/Assets/addresourse(2).png"} className="btn w-50 h-100" type='button' onClick={() => chooseResourseFileRef.click()} />
                                                            </div>
                                                            <Form.Control ref={ref => chooseResourseFileRef = ref} type="file" placeholder="choose Topic video" onChange={(e) => onChangeResourseHandler(e)} style={{ visibility: 'hidden' }} />
                                                        </>
                                                    )}
                                                </Form.Group>
                                            )}
                                        </Form>


                                    </div>


                                </div>

                            </CardContent>
                        </Card>
                        <div className="row">

                            {mode == "edit" ? (
                                <>
                                    <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                        {/* <Button variant="outlined"  >Cancel</Button> */}
                                        <Button onClick={() => navigate('/dashboard/resources')} variant="outlined">Cancel</Button>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                        {editLoader ? (
                                            <Button  variant="outlined"  >
                                                {/* <Loader
                                                    type="Puff"
                                                    color="white"
                                                    height={30}
                                                    width={30}
                                                /> */}
                                                <CircularProgress size={20}/>
                                            </Button>
                                        ) : (
                                            <Button variant="contained"  onClick={() => { editResourseDetails() }}>Save Changes</Button>
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
                                            onClick={() => addNewResourse()}
                                        >Add Resourse</Button>
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
                onClose={()=>{setModalVisible(false)}}
            >
                <Box sx={modalStyle}>
                    <BootstrapModal.Body>
                        <div className="text-center txt-5282F0 my-4" style={{alignItems: 'center',display: 'flex',flexDirection: 'column'}}>
                            <img src={'/Assets/modalPhoto.png'} />
                            <h3>{modalLine1}</h3>
                            <h3 className="modalLowerText">{modalLine2}</h3>
                        </div>
                        <div className="text-center mt-4 pb-3">
                            <Button variant="outlined"  style={{ marginRight: 10,marginTop:10 }}
                                onClick={() => { mode == 'add' ? (<>{setModalVisible(false),reSetForm() }</>) : (<>{setModalVisible(false),reSetForm(),navigate('/dashboard/resources/addResource')}</>) }}
                            >Add New Resource</Button>
                            &emsp;
                            <Button  variant="outlined"  style={{ marginRight: 10,marginTop:10 }}
                                onClick={() => navigate('/dashboard/resources')}
                            >Back To Resources</Button>
                        </div>
                    </BootstrapModal.Body>
                </Box>
            </Modal>



            {/* </div> */}

        </>
    )
}
