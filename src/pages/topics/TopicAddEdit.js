//page for all users listing!

import React, { useState, useEffect, forwardRef, useRef } from 'react'
import { InputGroup, FormControl, Table, Form } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useSelector } from 'react-redux'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import { updatePassword, changeName, uploadImage } from '../../api/Profile/Profile'
import Loader from "react-loader-spinner";
import { createTopic, editTopic, getTopicById } from '../../api/Topic/Topic'


import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material'
import { Modal as BootstrapModal } from 'react-bootstrap'
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from 'src/config'
import { useParams } from 'react-router-dom'
export default function AddEditTopic(props) {
    // const topicID = props.match.params.topicId;
    // const topicStatus = props.match.params.topicStatus;
    const { topicID, topicStatus, courseID } = useParams()
    // console.log(props)
    // const subjectStatus = props.match.params.subjectStatus;
    const [mode, setMode] = useState(topicID ? "edit" : "add")

    //setting subjects data into a variable
    const [topic, setTopic] = useState({});

    const [modalVisible, setModalVisible] = useState(false)
    const navigate = useNavigate()

    //sets and display the line in the success modal!
    const [modalLine1, setModalLine1] = useState('');
    const [modalLine2, setModalLine2] = useState('')

    //sets the loader for add subject Button
    const [addLoader, setAddLoader] = useState(false)

    //sets the loader for edit subject Button
    const [editLoader, setEditLoader] = useState(false)

    //sets the loader for edit subject Button
    const [editFormLoader, setEditFormLoader] = useState(false)

    //sets the name of the topic user want to add
    const [topicName, setTopicName] = useState();

    //sets topic description user want to add
    const [topicDescription, setTopicDescription] = useState()

    //sets mock test link user want to add
    const [mockTestLink, setMockTestLink] = useState()

    //sets exma test link user want to add
    const [examTestLink, setExamTestLink] = useState()

    //sets link type user want to add
    const [linkType, setLinkType] = useState()

    //sets vide link user want to add
    const [linkString, setLinkString] = useState()

    //sets topic video user want to add
    const [topicVideo, setTopicVideo] = useState()
    //sets topic video user want to add
    const [videoPreview, setVideoPreview] = useState(null);

    //referance variable for video file choose
    let chooseTopicVideoRef = useRef()

    // sets varialbe for video status
    const [videoStatus, setVideoStatus] = useState(false)
    //shows the error when users try to add subject without name
    const [errorMessage, setErrorMessage] = useState(false);
    const [error, showError] = useState(false);

    const [topicIcon, setTopicIcon] = useState(null);

    //updating mode state on change of subject id
    // useEffect(() => {
    // }, [topicID])

    useEffect(() => {
        setMode(topicID ? "edit" : "add")
        setEditFormLoader(true)
        getTopicById(topicID).then((res) => {
            console.log('res', res);
            if (res.status) {
                //setting the fetched Topics by id into state variable
                setTopic(res.topic);
                setTopicName(res.topic.name)
                setTopicDescription(res.topic.description)
                // setMockTestLink(res.topic.mockTestLink)
                // setExamTestLink(res.topic.examTestLink)
                // setLinkType(res.topic.videoLink.linkType)
                // setVideoStatus(res.topic.videoLink.linkType)
                // setLinkString(res.topic.videoLink.linkString)
            }
            setEditFormLoader(false)
        })
            .catch((err) => {
                console.error(err);
            });

    }, [topicID])

    //edit the details  of the existing topic
    function editTopicDetails() {
        setModalVisible(false);
        setEditLoader(true);
        showError(false);
        if (topicID != '') {
            editTopic(topicID, topicName, topicDescription, topicStatus,topicIcon)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        setEditLoader(false);
                        setModalLine1('Topic details has been');
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
            setErrorMessage('Please fill all the topic details');
        }

    }

    //adds new topic 
    function addNewTopic() {
        setModalVisible(false);
        setAddLoader(true);
        showError(false);
        if (topicName && topicDescription) {
            createTopic(topicName, topicDescription, 'active', courseID, topicIcon)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        setAddLoader(false);
                        setModalLine1('New Topic Added');
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
            setErrorMessage('Please fill the Topic details');
        }
    }

    // on change video handler
    const onChangeVideoHandler = (e) => {
        var url = URL.createObjectURL(e.target.files[0]);
        setVideoPreview(url)
        setTopicVideo(e.target.files[0])
    }

    // function to reset
    const reSetForm = () => {
        setTopicName("")
        setTopicDescription("")
        setMockTestLink("")
        setExamTestLink("")
        setLinkType("")
        setTopicVideo("")
    }

    return (
        <>


            {/* <div className="container" style={{overflowY: 'scroll'}}> */}
            <h5 className="mt-3 txt-5282F0 fw-bold">Topics Management</h5>
            <hr className="mt-4" />
            {editFormLoader ? (
                <div className='w-100 py-2 px-6 me-3' style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
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
                                                <Form.Label>Topic Name</Form.Label>
                                                <Form.Control value={topicName} type="text" placeholder="Enter Topic Name" onChange={(e) => setTopicName(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Topic Description</Form.Label>
                                                <Form.Control value={topicDescription} placeholder="Enter Topic Description" as="textarea" rows={3} onChange={(e) => setTopicDescription(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Choose Icon</Form.Label>
                                                <Form.Control type="file" placeholder="choose Sub Topic Exam Zip" onChange={(e) => setTopicIcon(e.target.files[0])} />
                                            </Form.Group>
                                            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Mock Test Link </Form.Label>
                                                <Form.Control value={mockTestLink} type="text" placeholder="Enter Mock Test Link" onChange={(e) => setMockTestLink(e.target.value)} />
                                            </Form.Group> */}
                                            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Exam Test Link</Form.Label>
                                                <Form.Control value={examTestLink} type="text" placeholder="Enter Exam Test Link" onChange={(e) => setExamTestLink(e.target.value)} />
                                            </Form.Group> */}
                                            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Select Link Type</Form.Label>
                                                <Form.Select value={linkType} onChange={(e) => setLinkType(e.target.value)} aria-label="Default select example">
                                                    <option>Select</option>
                                                    <option value='upload'>Upload</option>
                                                    <option value='link'>Link</option>
                                                    <option value='iframe'>iFrame</option>
                                                </Form.Select>
                                            </Form.Group> */}
                                            {/* {linkType != 'upload' ? (
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Topic Video Link </Form.Label>
                                                    <Form.Control value={linkString} required type="text" placeholder="Enter Topic Video Link" onChange={(e) => setLinkString(e.target.value)} />
                                                </Form.Group>
                                            ) : (
                                                <>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Topic Video</Form.Label>
                                                        {mode == 'edit' ? (
                                                            videoStatus == "upload" ? (
                                                                <div className="col-6 col-lg-6 d-flex">
                                                                    <img src="/Assets/vector.jpg" className="btn w-50 h-100" />
                                                                    <div>
                                                                        <Button   variant="text" type='Button' className='text-danger btn fs-1' onClick={() => setVideoStatus(null)}>&times;</Button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <div className="col-6 col-lg-6">
                                                                        <img src={videoPreview ? "/Assets/vector.jpg" : "/Assets/vector (1).jpg"} className="btn w-50 h-100" type='Button' onClick={() => chooseTopicVideoRef.click()} />
                                                                    </div>
                                                                    <Form.Control ref={ref => chooseTopicVideoRef = ref} type="file" placeholder="choose Topic video" onChange={(e) => onChangeVideoHandler(e)} style={{ visibility: 'hidden' }} />
                                                                </>
                                                            )

                                                        ) : (

                                                            <>
                                                                <div className="col-6 col-lg-6">
                                                                    <img src={videoPreview ? "/Assets/vector.jpg" : "/Assets/vector (1).jpg"} className="btn w-50 h-100" type='Button' onClick={() => chooseTopicVideoRef.click()} />
                                                                </div>
                                                                <Form.Control ref={ref => chooseTopicVideoRef = ref} type="file" placeholder="choose Topic video" onChange={(e) => onChangeVideoHandler(e)} style={{ visibility: 'hidden' }} />
                                                            </>
                                                        )}
                                                    </Form.Group>
                                                </>
                                            )} */}
                                        </Form>


                                    </div>


                                </div>

                            </CardContent>
                        </Card>
                        <div className="row">

                            {mode == "edit" ? (
                                <>
                                    <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                        {/* <Button variant="outlined"  onClick={() => history.goBack()}>Cancel</Button> */}
                                        <Button onClick={() => navigate('/dashboard/topics')} variant="outlined">Cancel</Button>
                                    </div>
                                    <div className="col-lg-2 col-md-3 col-12 mt-3 ">
                                        {editLoader ? (
                                            <Button variant="outlined"  >
                                                <CircularProgress size={20} />
                                            </Button>
                                        ) : (
                                            <Button variant="contained" onClick={() => { editTopicDetails() }}>Save Changes</Button>
                                        )}
                                    </div>
                                </>
                            ) : (

                                <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                    {addLoader ? (
                                        <Button variant="outlined"  >
                                            <CircularProgress size={20} />
                                        </Button>
                                    ) : (
                                        <Button variant="contained"
                                            onClick={() => addNewTopic()}
                                        >Add Topic</Button>
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
                onClose={() => { setModalVisible(false) }}
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
                                onClick={() => { mode == 'add' ? (<>{setModalVisible(false), reSetForm()}</>) : (<>{setModalVisible(false), reSetForm(), navigate('/dashboard/topics/addTopic/' + courseID)}</>) }}
                            >Add New Topic</Button>

                            <Button variant="outlined" style={{ marginRight: 10, marginTop: 10 }}
                                onClick={() => navigate('/dashboard/topics/' + courseID)}
                            >Back To Topics</Button>
                        </div>
                    </BootstrapModal.Body>
                </Box>
            </Modal>


            {/* </div> */}

        </>
    )
}
