//page for all users listing!

import React, { useState, useEffect, forwardRef, useRef } from 'react'
import { InputGroup, FormControl, Table, Form, Row, Col } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useSelector } from 'react-redux'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import { updatePassword, changeName, uploadImage } from '../../api/Profile/Profile'
import Loader from "react-loader-spinner";
import { createTopic, editTopic, getTopicById } from '../../api/Topic/Topic'
import { createCourse, editCourse, getCourseById } from '../../api/Courses/Courses'
import { getAllBoard } from '../../api/Boards/Boards'
import { getAllClasses } from '../../api/Classes/Classes'
import { getAllSubjects } from '../../api/Subject/Subject'
import { getAllTopics, getTopicByFilter } from '../../api/Topic/Topic'
import { imageBaseUrl } from '../..'
// import Button from '@restart/ui/esm/Button'
import TopicSelector from './TopicSelector'
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
import { getAllSubBoard } from 'src/api/SubBoard/SubBoard'

var className = '';
var boardName = '';
var subBoardName = '';
var subjectName = '';

export default function AddEditCourse(props) {

    // const courseID = props.match.params.courseId;
    // const courseStatus = props.match.params.courseStatus;
    const { courseID, courseStatus } = useParams()
    // console.log(props)
    // const subjectStatus = props.match.params.subjectStatus;
    const [mode, setMode] = useState(courseID ? "edit" : "add")

    //setting subjects data into a variable
    const [course, setCourse] = useState({});
    //setting course data into a variable
    const [boardData, setBoardData] = useState([]);

    //setting course data into a variable
    const [classesData, setClassesData] = useState([]);

    //setting course data into a variable
    const [subjectData, setSubjectData] = useState([]);

    //setting course data into a variable
    const topicData = useRef([]);

    const [modalVisible, setModalVisible] = useState(false)
    const navigate = useNavigate()

    //sets and display the line in the success modal!
    const [modalLine1, setModalLine1] = useState('');
    const [modalLine2, setModalLine2] = useState('')

    //sets the loader for add course button
    const [addLoader, setAddLoader] = useState(false)

    //sets the loader for edit subject button
    const [editLoader, setEditLoader] = useState(false)

    //sets the loader for edit subject button
    const [editFormLoader, setEditFormLoader] = useState(false)

    //sets the name of the course name user want to add
    const [name, setName] = useState();

    //sets topic description user want to add
    const [description, setDescription] = useState()

    //sets board user want to add
    const [board, setBoard] = useState()

    //sets classes user want to add
    const [classes, setClasses] = useState()

    //sets subject user want to add
    const [subject, setSubject] = useState()

    //sets topic  user want to add
    const [topic, setTopic] = useState([])
    const [chooseTopic, setChooseTopic] = useState([])
    const [newTopic, setNewTopic] = useState(1)
    // console.log(chooseTopic)
    const [subBoardsData, setSubBoardsData] = useState([])
    console.log(subBoardsData)
    const [selectedSubBoard, setSelectedSubBoard] = useState()
    //sets course picture user want to add

    const [coursePicture, setCoursePicture] = useState()
    //sets course picture preview user want to add
    const [picturePreview, setPicturePreview] = useState(null);

    //referance variable for video file choose
    let chooseCoursePictureRef = useRef()
    let chooseTopicRef = useRef()

    // sets varialbe for video status
    const [videoStatus, setVideoStatus] = useState(false)

    //shows the error when users try to add subject without name
    const [errorMessage, setErrorMessage] = useState(false);
    const [error, showError] = useState(false);

    const [page, setPage] = useState(1);

    const [limit, setLimit] = useState(100);
    const [classState, setClassState] = useState('')
    const [boardState, setBoardState] = useState('')
    const [subBoardState, setSubBoardState] = useState('')
    const [subjectState, setSubjectState] = useState('')

    const [courseImage, setCourseImage] = useState(null);
    useEffect(async () => {
        if (board) {
            const response = await getAllSubBoard(board, 1, 1000)
            if (response.status) {
                setSubBoardsData(response.results.data);
            }
        }
    }, [board])

    useEffect(() => {
        setMode(courseID ? "edit" : "add")
        setEditFormLoader(true)
        getCourseById(courseID).then((res) => {
            console.log('res', res);
            if (res.status) {
                //setting the fetched Course by id into state variable
                setCourse(res.course);
                setName(res.course.name)
                setDescription(res.course.description)
                setBoard(res?.course?.boardID?._id)
                setSelectedSubBoard(res?.course?.subBoardID?._id)
                setClasses(res.course.classesID._id)
                setSubject(res.course.subjectID._id)
                setTopic(res.course.topicIDs)
                setCoursePicture(res.course.coursePicture)
            }
            setEditFormLoader(false)
        })
            .catch((err) => {
                console.error(err);
            });

    }, [courseID])


    useEffect(() => {
        // fetching all boards
        getAllBoard(page, limit).then((res) => {
            console.log('Boards', res);
            if (res.status) {
                //setting the fetched board into state variable
                setBoardData(res.results.data);
            }
        })
            .catch((err) => {
                console.error(err);
            });

        // fetching all topics
        getAllTopics(page, limit).then((res) => {
            console.log('Topics', res);
            if (res.status) {
                //setting the fetched topic into state variable
                topicData.current = res.results.data;

                chooseTopicHandler()
            }
        })
            .catch((err) => {
                console.error(err);
            });


        // fetching all classes
        getAllClasses(page, limit).then((res) => {
            console.log('Classes', res);
            if (res.status) {
                //setting the fetched classes into state variable
                setClassesData(res.results.data);
            }
        })
            .catch((err) => {
                console.error(err);
            });


        // fetching all subjects
        getAllSubjects(page, limit).then((res) => {
            console.log('Subjects', res);
            if (res.status) {
                //setting the fetched Subject into state variable
                setSubjectData(res.results.data);
            }
        })
            .catch((err) => {
                console.error(err);
            });

    }, [])








    //edit the details  of the existing Course
    function editCourseDetails() {
        setModalVisible(false);
        setEditLoader(true);
        showError(false);
        if (courseID != '') {

            editCourse(courseID, name, board, selectedSubBoard, classes, subject, description, courseStatus,courseImage)
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
            setErrorMessage('Please fill all the Course details');
        }

    }

    //adds new Course 
    function addNewCourse() {
        className = '';
        boardName = '';
        subBoardName = '';
        subjectName = '';
        setModalVisible(false);
        setAddLoader(true);
        showError(false);
        // console.log(name, board, classes, subject, topic, description)
        console.log(name, " ", board, " ", classes, " ", subject, " ", description, "", courseImage)
        if (name && board && classes && subject && description && courseImage != '') {
            createCourse(name, board, selectedSubBoard, classes, subject, description, 'active', courseImage)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        setAddLoader(false);
                        setModalLine1('New Course Added');
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
            setErrorMessage('Please fill the Course details');
        }
    }

    // // on change Picture handler
    // const onChangePictureHandler = (e) => {
    //     var url = URL.createObjectURL(e.target.files[0]);
    //     console.log(e.target.files[0])
    //     setPicturePreview(url)
    //     setCoursePicture(e.target.files[0])
    // }

    // function to reset 
    const reSetForm = () => {
        setName(null)
        setDescription(null)
        setBoard(null)
        setClasses(null)
        setSubject(null)
        setTopic(null)
        setSelectedSubBoard(null)
        setCoursePicture(null)
    }

    // function for choose topic
    const actionForChooseTopic = (e, index) => {
        // setTopic(e.target.value)
        let newDAta = e.target.value
        let all = [...topic];
        all[index] = newDAta
        setTopic(all)
        console.log(all)
    }

    // function to add new topic
    const chooseTopicHandler = () => {

        let all = [...topic];
        all.push("-1")
        setTopic(all)
    }

    //function to delete the selected topic from state array
    function deleteTopic(index) {
        //removing selected topic from state array 
        const updatedTopic = [...topic]
        updatedTopic.splice(index, 1)
        setTopic(updatedTopic);
        console.log("working")

    }


    console.log(className)
    const classSeparator = (e) => {
        setClassState(e.target.value)
        const classId = e.target.value.split('*')[0]
        setClasses(classId)
        className = e.target.value.split('*')[1];
        setName(className + ' ' + boardName + ' ' + subjectName)
    }
    const boardSeparator = (e) => {
        setBoardState(e.target.value)
        const boardId = e.target.value.split('*')[0]
        setBoard(boardId);
        boardName = e.target.value.split('*')[1];
        setName(className + ' ' + boardName + ' ' + subjectName)
    }
    const subBoardSeparator = (e) => {
        setSubBoardState(e.target.value)
        const subBoardId = e.target.value.split('*')[0]
        setSelectedSubBoard(subBoardId);
        subBoardName = e.target.value.split('*')[1];
        setName(className + ' ' + boardName + ' ' + subBoardName)
    }
    const subjectSeparator = (e) => {
        setSubjectState(e.target.value)
        const subjectId = e.target.value.split('*')[0]
        setSubject(subjectId);
        subjectName = e.target.value.split('*')[1];
        setName(className + ' ' + boardName + ' ' + subBoardName + ' ' + subjectName)
    }



    return (
        <>
            {/* <div className="container" style={{overflowY: 'scroll'}}> */}
            <h5 className="mt-3 txt-5282F0 fw-bold">Courses Management</h5>
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
                                    <Form>
                                        <div className="col-lg-6 col-sm-6 col-12">
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Course Name</Form.Label>
                                                <Form.Control required value={name} type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter Course Name" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Select Qualification</Form.Label>
                                                <Form.Select value={classState} onChange={classSeparator} aria-label="Default select example">
                                                    <option>Select</option>
                                                    {classesData.map((item, index) => (
                                                        <option key={index} value={`${item._id}*${item.name}`}>{item.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Select Board</Form.Label>
                                                <Form.Select value={boardState} onChange={boardSeparator} aria-label="Default select example">
                                                    <option>Select</option>
                                                    {boardData.map((item, index) => (
                                                        <option key={index} value={`${item._id}*${item.name}`}>{item.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            {subBoardsData.length ? (
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Select Sub Board</Form.Label>
                                                    <Form.Select value={subBoardState} onChange={subBoardSeparator} aria-label="Default select example">
                                                        <option>Select</option>
                                                        {subBoardsData.map((item, index) => (
                                                            <option key={index} value={`${item._id}*${item.name}`}>{item.name}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            ) : (null)}


                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Select Subject</Form.Label>
                                                <Form.Select value={subjectState} onChange={subjectSeparator} aria-label="Default select example">
                                                    <option>Select</option>
                                                    {subjectData.map((item, index) => (
                                                        <option key={index} value={`${item._id}*${item.name}`}>{item.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control value={description} placeholder="Enter Course Description" type="text" onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Choose Icon</Form.Label>
                                                <Form.Control type="file" placeholder="choose Sub Topic Exam Zip" onChange={(e) => setCourseImage(e.target.files[0])} />
                                            </Form.Group>

                                        </div>
                                    </Form>

                                    {/* <div className="col-lg-12 col-sm-6 col-12">
                                        <Row>
                                            <Col>
                                                {topicData.current && topic&&topic.map((item, index) => (
                                                    <>
                                                        <TopicSelector topicData={topicData.current} topic={item} index={index} actionForChooseTopic={actionForChooseTopic} />
                                                        {index > 0 ? (
                                                            <div className='d-flex justify-content-end'>
                                                                <Button  variant="outlined" color="error" onClick={()=>deleteTopic(index)} className="mb-4 float-right" ><i class="fas fa-plus-circle"></i> Remove</Button>
                                                            </div>
                                                        ) : ('')}
                                                    </>
                                                ))}  
                                            </Col>
                                            <Col>
                                                <Button variant="outlined" className='mt-4' onClick={() => chooseTopicHandler()}><i class="fas fa-plus-circle"></i> Add New Topic</Button>
                                            </Col>
                                        </Row>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control value={description} placeholder="Enter Course Description" type="text" onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} />
                                        </Form.Group>

                                    </div> */}


                                </div>

                            </CardContent>
                        </Card>
                        <div className="row">

                            {mode == "edit" ? (
                                <>
                                    <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                        {/* <Button variant="outlined" className="py-2 px-6 me-3" >Cancel</Button> */}
                                        <Button onClick={() => navigate('/dashboard/courses')} variant="outlined">Cancel</Button>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                        {editLoader ? (
                                            <Button variant="outlined" className="py-2 px-6 me-3" >
                                                <CircularProgress size={20} />
                                            </Button>
                                        ) : (
                                            <Button variant="contained" className="py-2 px-6 me-3" onClick={() => { editCourseDetails() }}>Save Changes</Button>
                                        )}
                                    </div>
                                </>
                            ) : (

                                <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                    {addLoader ? (
                                        <Button variant="outlined" className="py-2 px-6 me-3" >
                                            <CircularProgress size={20} />
                                        </Button>
                                    ) : (
                                        <Button variant="outlined" className="py-2 px-6 me-3"
                                            onClick={() => addNewCourse()}
                                        >Add Course</Button>
                                    )}

                                </div>
                            )}

                        </div>
                    </div>

                </>
            )
            }
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
                                onClick={() => { mode == 'add' ? (<>{setModalVisible(false), reSetForm()}</>) : (<>{setModalVisible(false), reSetForm(), navigate('/dashboard/courses/addCourse')}</>) }}
                            >Add New Course</Button>
                            &emsp;
                            <Button variant="outlined" style={{ marginRight: 10, marginTop: 10 }}
                                onClick={() => navigate('/dashboard/courses')}
                            >Back To Courses</Button>
                        </div>
                    </BootstrapModal.Body>
                </Box>
            </Modal>


            {/* </div> */}

        </>
    )
}
