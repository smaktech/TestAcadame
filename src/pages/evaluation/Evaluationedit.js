import { dynamic, InputGroup, FormControl, Table, Form, Row, Col } from 'react-bootstrap'
// import { createCourse, editCourse, getCourseById } from '../../api/Courses/Courses'
// import { createEvaluation } from '../../api/Evaluation/Evaluation'
import TablePagination from '@mui/material/TablePagination';
import { apiUrl } from '../../config';
import { createAnswer, getSingleAnswer, editAnswer, getAnswerapi } from '../../api/Answer/Answer'
import { getQuestion } from '../../api/Question/Question'
// import { createStudentevalans } from '../../api/StudentEvalAns/studentevalans'
// import { createStudenteval } from '../../api/StudentEval/studenteval'
import { getAllEvaluation, deleteCourse, getEvaluationByFilter, getEvaluationById, getAllUserEvaluations } from '../../api/Evaluation/Evaluation';
import { Box, CardContent, CardMedia, Divider, Fade, Grid, Grow, TableRow, Typography } from '@mui/material';
// import { getAllTopics, getTopicByFilter } from '../../api/Topic/Topic'
// import { getAllBoard } from '../../api/Boards/Boards'
// import { getAllSubjects } from '../../api/Subject/Subject'
import test2 from './image/geogebra-export.png';
import { getAllCourses } from '../../api/Courses/Courses';
// import { getAllSubBoard } from 'src/api/SubBoard/SubBoard'
// import { getAllClasses } from '../../api/Classes/Classes';

import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import "./app.css"
import ReactPaginate from "react-paginate";
import TableContainer from '@mui/material/TableContainer';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Container from '@material-ui/core/Container';
// import Addmoreinput from './dynamic';
// import Dynfield from './dynfield';
// import RemoveIcon from '@material-ui/icons/Remove';
// import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';






// import App from './test'

import SaveIcon from '@mui/icons-material/Save';
// import * as serviceWorker from './serviceWorker';

// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import { Button, TextField } from '@mui/material'

import { Modal as BootstrapModal } from 'react-bootstrap'
// import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';


import React, { useState, useEffect, forwardRef, useRef } from 'react'
// import { Modal,  InputGroup, FormControl, Nav, Row, Col, Sonnet } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useSelector } from 'react-redux'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import { updatePassword, changeName, uploadImage } from '../../api/Profile/Profile'
import Loader from "react-loader-spinner";



import { BsSortDownAlt, BsFillTrashFill, BiBlock } from "react-icons/bs";
// import { getUserById, changeStatus, deleteUser } from "../../api/Users/Users"
// import { imageBaseUrl } from '../../config';
// import Tabs from 'react-bootstrap/Tabs'
// import { materialTableIcons } from './config';
// import MaterialTable from 'material-table'
// import { getAllUserCourses } from '../../api/Courses/Courses'
// import { CategoryScale, PointElement, LinearScale, BarElement, Title, Tooltip, Legend, Chart } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';


// import CardContent from '@mui/material/CardContent';

// import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import { Button } from '@mui/material';

// import Grid from '@mui/material/Grid';
// import CircularProgress from '@mui/material/CircularProgress';
// import Modal from '@mui/material/Modal';
// import UserCoursesRow  from './UserCoursesRow'
import { useParams } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import { baseUrl, dataLimit } from '../../config';
// import test2 from './test2';
// import { update } from 'lodash';
// import { dataLimit } from '../../config';
const perpage = 1;

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    button: {
        margin: theme.spacing(1),
    }
}))

// import UserSubscriptionRow from './UserSubscriptionRow'
// import { getEarningsByUserId } from 'src/api/Earnings/Earnings'
// import UserPaymentRow from './UserPaymentRow'

var className = '';
var boardName = '';
var subBoardName = '';
var subjectName = '';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function User(props) {
    // const courseID = props.match.params.courseId;
    // const courseStatus = props.match.params.courseStatus;
    const { courseID, courseStatus } = useParams()
    // console.log(props)
    // const subjectStatus = props.match.params.subjectStatus;
    const [mode, setMode] = useState(courseID ? "edit" : "add")

    //setting subjects data into a variable
    const [course2, setCourse2] = useState({});
    const [subject3, setSubject3] = useState({});

    //setting course data into a variable
    const [boardData, setBoardData] = useState([]);

    //setting course data into a variable
    const [classesData, setClassesData] = useState([]);
    const [coursesData, setCoursesData] = useState([]);
    const [single, setSingle] = useState([]);
    const [multipleansnext, setMultipleansnext] = useState([]);
    const [answertable, setAnswertable] = useState([]);
    const [allanswer, setAllanswer] = useState([]);
    const [multipleanswer, setMultipleanswer] = useState([]);
    const [rowLimit, setRowLimit] = useState(dataLimit)
    //setting course data into a variable
    const [subjectData, setSubjectData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [noCourses, setNoCourses] = useState(false);
    //setting course data into a variable
    const topicData = useRef([]);
    const { upid, boardStatus } = useParams()
    console.log('Check Update id', upid)

    const [modalVisible, setModalVisible] = useState(false)
    const navigate = useNavigate()

    //sets and display the line in the success mo
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
    const [description1, setDescription1] = useState()

    //sets board user want to add
    const [board, setBoard] = useState();

    const [board2, setBoard2] = useState();

    //sets classes user want to add
    // const [classes, setClasses] = useState()
    const [classes1, setClasses1] = useState()
    const [totalPages, setTotalPages] = useState();
    //sets subject user want to add
    // const [subject, setSubject] = useState()
    const [subject2, setSubject2] = useState()
    const [currentPage, setCurrentPage] = useState(0);

    //sets topic  user want to add
    const [topic, setTopic] = useState([])
    const [chooseTopic, setChooseTopic] = useState([])
    const [newTopic, setNewTopic] = useState(1)
    // console.log(chooseTopic)
    const [subBoardsData, setSubBoardsData] = useState([])
    // console.log(subBoardsData)
    const [selectedSubBoard, setSelectedSubBoard] = useState()
    //sets course picture user want to add
    const [coursePicture, setCoursePicture] = useState()
    const [course, setCourse] = useState([]);
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
    const [test, setTest] = useState();

    const [limit, setLimit] = useState(100);
    const [classState, setClassState] = useState('')
    const [boardState, setBoardState] = useState('')
    const [subBoardState, setSubBoardState] = useState('')
    const [subjectState, setSubjectState] = useState('')
    const [courseState, setCourseState] = useState('')
    const [foodState, setFoodState] = useState();
    const [formula, setFormula] = useState();
    const [question, setQuestion] = useState('')

    const [media, setMedia] = useState('');
    // const courseID ='';
    // const [editFormLoader, setEditFormLoader] = useState(false)
    // const [mode, setMode] = useState(courseID ? "edit" : "add");
    const [hint, setHint] = useState('');
    const [type, setType] = useState('');
    const [marks, setMarks] = useState('');
    const [ansid, setAnsID] = useState('');
    console.log('Answer ID', ansid)
    const [stuevalid, setStuevalid] = useState()
    const [evalansid, setEvalansid] = useState()
    const [questionid, setquestionid] = useState()
    const [qmark, setQmark] = useState()
    // const [stuevalid, setstuevalid] = useState()
    const [evalid, setevalid] = useState()
    const [studentname, setStudentname] = useState()
    const [examdatetaken, setExamdatetaken] = useState()
    // const [subject, setSubject] = useState()
    // const [course, setCourse] = useState()
    const [answerstud, setAnswerstud] = useState()
    const [studevalid, setStudevalid] = useState(0)
    const [questionindex, setQuestionindex] = useState(0)
    const [answer, setAnswer] = useState('')
    const [showhide, setShowhide] = useState('');
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const { id } = useParams();
    console.log('only id', id)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //constant for storing the details of the particular user
    const [userDetailsById, setUserDetailsById] = useState([]);
    const [userProfileImg, setUserProfileImg] = useState('')

    //sets the all courses of user
    const [userCourses, setUserCourses] = useState([])
    // console.log('userCourses', userCourses)

    //loader in the alert table on confirm button
    const [actionLodaer, setActionLoader] = useState(false);

    const [filterModal, setFilterModal] = useState(false);



    //sets the loader of apply changes in filter modal
    const [filterLoader, setFilterLoader] = useState(false);
    const [completedCouresNum, setCompletedCouresNum] = useState(0);

    //variable to configure whether the user of that particular id is available or not
    const [noUserFound, setNoUserFound] = useState(false)
    // example


    //table data loading indicator
    const [tableDataLoading, setTableDataLoading] = useState(false)
    const [tab, setTab] = React.useState(0);
    const [userPayments, setUserPayments] = useState([])
    const [totalPaymentAmount, setTotalPaymentAmount] = useState(0)
    const handleChange = (event, newValue) => {
        setTab(newValue);

    };
    const onPageChange = (event, newPage) => {
        // setRowLimit(parseInt(event.target.value), 4);
        setPage(newPage + 1);
        console.log(newPage + 1)
    };
    const onRowPerChange = (event) => {
        setRowLimit(event.target.value)
        console.log(event.target.value)
        setPage(1)
    }


    // var answerindex = 0
    // console.log('request params', id)

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
    const gotonext = async () => {
        let newQuestionIndex = questionindex + 1;
        if(newQuestionIndex === single.length)
        return
       
        setQuestionindex(newQuestionIndex, nextdata(newQuestionIndex));
        // alert(questionindex)
        return true

    }
    const gotoprev = async () => {
        let newQuestionIndex = questionindex - 1;
        console.log(newQuestionIndex, "questionIndexxxxx");
        if(newQuestionIndex <0)
        return
        setQuestionindex(newQuestionIndex, prevdata(newQuestionIndex));

        return true

    }
    // Get the img object using its Id
    const img = document.getElementById("img1");
    // Function to increase image size
    function enlargeImg() {
        // Set image size to 1.5 times original
        img.style.transform = "scale(1.5)";
        //   img.style.transform = "scaleX(1.5)";
        img.style.width = "60%";
        // Animation effect
        img.style.transition = "transform 0.45s ease";
    }
    function resetImg() {
        // Set image size to original
        img.style.transform = "scale(1)";
        img.style.transition = "transform 0.25s ease";
    }
    const handleshowhide = (event) => {
        const getuser = event.target.value;
        setShowhide(getuser);

    }
    const handleSubmit = (e) => {
        //e.preventDefault();
        alert('Answer Submitted');
        setAnswer('');
    }

    const addNewEvaluation = async () => {
        //    const nextLabel={"next"};
        // gotonext();
        setAnswerstud('');
        alert(" Answer submitted")

        console.log('This is get all evaluation data', setCourse2);
        const handleNext = () => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };
        //         if (studevalid==0){
        //         var studevalid1 = await createStudenteval(course2, subject3, evalid, studentname, examdatetaken, status)
        //         setStudevalid(studevalid1)
        //         console.log('WORKING STUDEVALIDVAR', studevalid)
        //         createStudentevalans(studevalid1, answerstud, question, hint, marks, type, stuevalid, evalansid, questionid, qmark)
        //         console.log('studentevalans', createStudentevalans)
        //     }
        //     else if(studevalid!=0){

        //         var studevalid115 = createStudentevalans(studevalid, answerstud, question, hint, marks, type, stuevalid, evalansid, questionid, qmark)
        //         console.log('studentevalans', createStudentevalans)

        // }

        editAnswer(hint, type, marks, answer, ansid)
        // console.log('edit answer client', hint)       
    }

    const [courseImage, setCourseImage] = useState(null);
    useEffect(async () => {
        if (board) {
            const response = await getAllSubBoard(board, 1, 1000)
            if (response.status) {
                setSubBoardsData(response.results.data);
            }
        }
    }, [board])
    const nextdata = async (qindex) => {
        // await  sleep(2000) 
        const parsValue = JSON.parse(allanswer[qindex].inputfields);
            setQuestion(single[qindex].question);
            setMedia(single[qindex].media);
             
            setMultipleanswer(multipleansnext[qindex].mcqFields);
            setHint(parsValue[0].hint);
            setType(parsValue[0].type);
            setMarks(parsValue[0].marks);
            setAnswer(parsValue[0].answer);

            return true
       
    }
    const prevdata = async (qindex) => {
        // await  sleep(2000) 
        const parsValue = JSON.parse(allanswer[questionindex].inputfields);
            setQuestion(single[qindex].question);
            setMedia(single[qindex].media);
            setMultipleanswer(multipleansnext[qindex].mcqFields);
            setHint(parsValue[0].hint);
                    setType(parsValue[0].type);
                    setMarks(parsValue[0].marks);;
                    setAnswer(parsValue[0].answer);

            return true
        
    }


    // useEffect(() => {
    //     setMode(courseID ? "edit" : "add")
    //     setEditFormLoader(true)
    //     getCourseById(courseID).then((res) => {
    //         console.log('res', res);
    //         if (res.status) {
    //             //setting the fetched Course by id into state variable
    //             setCourse(res.course);
    //             setName(res.course.name)
    //             // setDescription(res.course.description)
    //             //setBoard(res?.course?.board?._id)
    //             setSelectedSubBoard(res?.course?.subBoardID?._id)
    //             // setClasses(res.course.classesID._id)
    //             // setSubject(res.course.subjectID._id)
    //             setTopic(res.course.topicIDs)
    //             setCoursePicture(res.course.coursePicture)
    //         }
    //         setEditFormLoader(false)
    //     })
    //         .catch((err) => {
    //             console.error(err);
    //         });

    // }, [courseID])


    // useEffect(() => {
    //     // fetching all boards
    //     getAllBoard(page, limit).then((res) => {
    //         console.log('Boards', res);
    //         if (res.status) {
    //             //setting the fetched board into state variable
    //             setBoardData(res.results.data);
    //         }
    //     })
    //         .catch((err) => {
    //             console.error(err);
    //         });

    //     // fetching all topics
    //     getAllTopics(page, limit).then((res) => {
    //         console.log('Topics', res);
    //         if (res.status) {
    //             //setting the fetched topic into state variable
    //             topicData.current = res.results.data;

    //             chooseTopicHandler()
    //         }
    //     })
    //         .catch((err) => {
    //             console.error(err);
    //         });


    //     // fetching all classes
    //     getAllClasses(page, limit).then((res) => {
    //         console.log('Classes', res);
    //         if (res.status) {
    //             //setting the fetched classes into state variable
    //             setClassesData(res.results.data);
    //         }
    //     })
    //         .catch((err) => {
    //             console.error(err);
    //         });

    //     // fetching all courses 
    // getAllCourses(page, limit).then((res) => {
    //     console.log('course', res);
    //     if (res.status) {
    //         //setting the fetched classes into state variable
    //         setCoursesData(res.results.id);
    //     }
    // })
    //     .catch((err) => {
    //         console.error(err);
    //     });



    //     // fetching all subjects
    //     getAllSubjects(page, limit).then((res) => {
    //         console.log('Subjects', res);
    //         if (res.status) {
    //             //setting the fetched Subject into state variable
    //             setSubjectData(res.results.data);
    //         }
    //     })
    //         .catch((err) => {
    //             console.error(err);
    //         });

    // }, [])


    // const classes = useStyles()
    // const [inputFields, setInputFields] = useState([
    //     { type: '', hint: '', answer: '', marks: '' },
    // ]);





    // //edit the details  of the existing Course
    // function editCourseDetails() {
    //     setModalVisible(false);
    //     setEditLoader(true);
    //     showError(false);
    //     if (courseID != '') {

    //         editCourse(courseID, name, board, selectedSubBoard, classes, subject, description, courseStatus, courseImage)
    //             .then((res) => {
    //                 console.log(res);
    //                 if (res.status) {
    //                     setEditLoader(false);
    //                     setModalLine1('Subject details has been');
    //                     setModalLine2('updated successfully')
    //                     setModalVisible(true)
    //                 }
    //                 else {
    //                     setEditLoader(false);
    //                     showError(true);
    //                     setErrorMessage('Error occured');
    //                 }

    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //                 setEditLoader(false)
    //                 showError(true);
    //                 setErrorMessage('Error occured');
    //             })
    //     }
    //     else {
    //         setAddLoader(false)
    //         showError(true);
    //         setErrorMessage('Please fill all the Course details');
    //     }

    // }
    // const names1 = multipleanswer;
    // var i =1;
    // while(i< names1.length)  {
    //     console.log('this is from while loop',names1[i]);
    //     // i++;
       
    // }
    useEffect(() => {
        // setDataLoading(true);
        // setNoCourses(false);
        //  // fetching All answer and questions
        if (allanswer.length == 0) {

            getSingleAnswer(id).then((res,row) => {
                console.log('getSingleAnswer data state',JSON.parse(res.results[questionindex].inputfields));
                console.log('answer next data', res.results);
                if (res.status) {
                    //  //setting the fetched Topics into state variable
                    // setAnswertable(res.results)

                    // setMarks(res.results.marks);
                    // setType(res.results.type);
                    if (allanswer.length == 0)
                    
                    setMultipleansnext(res.results);
                    setAllanswer(res.results);
                    const parsValue = JSON.parse(res.results[questionindex].inputfields);
                    console.log('getSingleAnswer data state', res.results);
                    console.log('JSON parse data state', parsValue);
                    setMultipleanswer(JSON.parse(res.results[questionindex].mcqFields));
                    setHint(parsValue[0].hint);
                    setType(parsValue[0].type);
                    setMarks(parsValue[0].marks);
                    setAnswer(parsValue[0].answer);
                    setAnsID(res.results[questionindex]._id)





                    // setTotalPages(res.results.totalPages);

                } else {
                    //  //setting no Topic found variable true
                    setNoCourses(true);
                }

                setDataLoading(false);
            })

                .catch((err) => {
                    // console.error(err);
                });
        }
    }, []);

    useEffect(() => {
        // setDataLoading(true);
        // setNoCourses(false);
        //  // fetching All answer and questions
        getQuestion(id, rowLimit).then((res) => {

            // console.log('QuestionData', res);
            if (res.status) {
                //  //setting the fetched Topics into state variable
                if (single.length == 0)
                    setSingle(res.results);
                setQuestion(res.results[questionindex].question);
                setMedia(res.results[questionindex].media);
                // setQuestion(res.results.question);

                console.log('Take Test Answer Data students portal', res.results);
                setTotalPages(res.results.totalPages);

            } else {
                //  //setting no Topic found variable true
                setNoCourses(true);

            }

            setDataLoading(false);
        })
            .catch((err) => {
                // console.error(err);
            });
    }, [page, rowLimit])


    return (
        <>
            <div className="container" >
                {/* <p className="mt-3 txt-5282F0">Users {'>'} Details</p> */}
                {/* <h5 className="mt-3 txt-5282F0 fw-bold">Evaluation Management</h5> */}


                <hr className="mt-4" />
                <div className="d-flex align-items-center">
                    <div className="container pageHeaderCard">
                        <div className="row">
                            {/* {console.log(userDetailsById)} */}

                            <div className="col-lg-8 col-12">
                                {/* <Tab.Container id="left-tabs-example" defaultActiveKey="courses" style={{ backgroundColor: 'yellow' }}> */}
                                <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example" variant={"scrollable"}
                                    scrollButtons={"on"}>
                                    {/* <Tab label="Your Question Is Here" {...a11yProps(0)} /> */}
                                    <Tab label="Edit Part" {...a11yProps(0)} />

                                    {/* <div className='si'><Button>Save </Button></div> */}
                                    {/* <Tab label="Payment" {...a11yProps(2)} />
                                        <Tab label="Subscription" {...a11yProps(3)} /> */}
                                    {/* <Tab label="Progress" {...a11yProps(4)} /> */}
                                </Tabs>
                            </div>

                            <Col sm={12}>
                                <TabPanel value={tab} index={0}>
                                    <Table>
                                        {/* <TableHead>
                                            <TableCell>S.No.</TableCell>
                                            <TableCell >Course</TableCell>
                                            <TableCell >No of Question</TableCell>
                                            <TableCell >Students taken</TableCell>
                                            <TableCell >Status</TableCell>
                                            <TableCell >Action</TableCell>
                                        </TableHead> */}
                                        <TableBody>
                                            <div className="singlequesedit col-lg-4 col-sm-6  col-12">
                                                <div className='newedit' style={{ backgroundColor: "cadetblue", padding: "30px", height: "265px", width: "300%" }}>
                                                    <Row>
                                                        <div className='viet col-6'>
                                                            <Form.Group controlId="exampleForm.ControlTextarea1" ></Form.Group>
                                                            <Form.Label><h5>Question</h5></Form.Label>

                                                            <Form.Control type="text" value={question} onChange={(e) => setQuestion(e.target.value)} as="textarea" rows={5}   ></Form.Control>
                                                            {/* <Form.Control type="text" readOnly={true} value={((allanswer.length>0)?allanswer[index].hint:'')} onChange={(e) => setQuestion(e.target.value)} as="textarea" rows={5}   ></Form.Control> */}
                                                            {/* <Form.Control type="text" readOnly={true} value={row._id} onChange={(e) => setQuestion(e.target.value)} as="textarea" rows={5}   ></Form.Control> */}
                                                            <Form.Control type="hidden" value={id} onChange={(e) => setID(e.target.value)}   ></Form.Control>
                                                            <Form.Control type="hidden" value={questionindex} onChange={(e) => setID(e.target.value)}   ></Form.Control>
                                                        </div>
                                                    </Row>
                                                    <div className="vlviewedit"></div>
                                                    <Row>
                                                        <div className='editmedia col-6'  >
                                                            <Form.Label><h5>Media</h5></Form.Label>
                                                            <Card style={{ backgroundColor: "#5f9ea0", width: "90%", height: "63%" }} sx={{ border: '1px solid yellow' }} className='imght' onClick={() => enlargeImg()} id="img1">
                                                                {/* <Form.Control  onChange1={(e) => setMedia(e.target.value)} /> */}
                                                                {/* <iframe  img src={test2} width='100%' height="300%" > </iframe> */}
                                                                {/* <img src={`http://localhost:4000/${media}`} height="100%" width='172%' /></Card> */}

                                                                <img src={`https://academeserverapp.herokuapp.com/${media}`} width='100%' /></Card>
                                                            <br /><br /><br />

                                                        </div>
                                                        {/* <div>
                    <Button className=" btn btn-warning" size='small'  variant="contained" onClick={()=>resetImg()}>Reset Image</Button>
                    </div> */}

                                                    </Row>
                                                </div>
                                                <div>
                                                   
                                                        <div>
                                                            <div  >
                                                                <div className="events" style={{ marginTop: '-64%' }}>
                                                                    <div className='editev' >
                                                                        <div >
                                                                            <Form.Group className="mb-6 mt-3 " controlId="exampleForm.ControlInput1" ></Form.Group>
                                                                            <Form.Label><h5>Answer in Part</h5></Form.Label>
                                                                        </div>
                                                                        <div className='editpart'>
                                                                            <div >
                                                                                <Form.Label><h5>Hint</h5></Form.Label>
                                                                                <Form.Control type="text" value={hint}  onChange={(e) => setHint(e.target.value)}    ></Form.Control>
                                                                            </div>
                                                                            <div className='edittype'>
                                                                                <Form.Group controlId="exampleForm.ControlInput1" >
                                                                                    <Form.Label><h5>Type</h5></Form.Label>
                                                                                    <Form.Control type="text" value={type} onChange={(e) => setType(e.target.value)}    ></Form.Control>
                                                                                    {/* <Form.Control type="text" name='optionA' value={inputField.optionA}
onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control> */}
                                                                                </Form.Group>
                                                                            </div>
                                                                            <div className='editmarks'>
                                                                                <Form.Group controlId="exampleForm.ControlInput1">
                                                                                    <Form.Label><h5>Marks</h5></Form.Label>
                                                                                    {/* <Form.Select  aria-label="Default select example"> */}

                                                                                    {/* </Form.Select> */}
                                                                                    {/* <Form.Control type="text" name='marks' value={inputField.answer}
onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control> */}
                                                                                    <Form.Control type="text" value={marks} onChange={(e) => setMarks(e.target.value)}  ></Form.Control>

                                                                                </Form.Group>
                                                                            </div>

                                                                        </div>
                                                                        {multipleanswer.map((row, index, ) =>
                                                    

                                                                        <div >
                                                                            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                                                <Form.Label><h5>Answer</h5></Form.Label>
                                                                                <Form className="custom-select"
                                                                                    value={foodState}
                                                                                    onChange={(e) => {
                                                                                        const selectedFood = e.target.value;
                                                                                        setFoodState(selectedFood);
                                                                                    }}>

                                                                                </Form>
                                                                                <Form.Control type="text" name='Answer' value={row.optiona} onChange={(e) => setAnswer(e.target.value)} placeholder='Answers' as="textarea" rows={5} ></Form.Control>
                                                                            </Form.Group>

                                                                        </div>
                                                                        )
                                                                                }
}
                                                                    </div>
                                                                    <div className='editdiv'>
                                                                        <input type="hidden" readOnly={true} value={subject3} onChange={(e) => setSubject3(e.target.value)} />
                                                                        <input type="hidden" readOnly={true} value={course2} onChange={(e) => setCourse2(e.target.value)} />
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                </div>

                                            </div>




                                            {single.map((row, index) =>
                                                <div>
                                                    <div key={row.question}>
                                                        {/* <div>
                                                            <input type="hidden" readOnly={true} value={subject3} onChange={(e) => setSubject3(e.target.value)} />
                                                            <input type="hidden" readOnly={true} value={course2} onChange={(e) => setCourse2(e.target.value)} />
                                                        </div> */}
                                                        <div className="singleques col-lg-6 col-sm-6 col-12">
                                                            <Row>  <Form.Group className="mb-6 " controlId="exampleForm.ControlTextarea1" ></Form.Group>
                                                                {/* <Form.Label>Question</Form.Label> */}

                                                                {/* <Form.Control type={"text"} readOnly={true} value={row.question} onChange={(e) => setQuestion(e.target.value)} as="textarea" rows={5}   ></Form.Control> */}
                                                                {/* <Form.Control type="hidden" value={id} onChange={(e) => setID(e.target.value)}   ></Form.Control> */}
                                                            </Row>
                                                            <Row>
                                                                {/* <div className='singleIV ' >
                                                                    <h1 class="ig">Media</h1>
                                                                    <Card style={{ backgroundColor: "gray" }} sx={{ border: '1px solid yellow' }} className='imght'>
                                                                        <Form.Control type="file" onChange1={(e) => setMedia(e.target.value)} />
                                                                        {selectedFile && <img src={preview} width='80%' />}</Card>

                                                                </div> */}

                                                            </Row>


                                                        </div>
                                                    </div>

                                                    {/* { allanswer.map((rows, index) => */}

                                                    <div  >
                                                        <div className="events">
                                                            <div className="answerpart">
                                                                <Form.Group className="mb-6 mt-3 " controlId="exampleForm.ControlInput1" ></Form.Group>
                                                                {/* <Form.Label>Answer in Part</Form.Label> */}
                                                            </div>
                                                            <div className=' col-lg-2 col-sm-6 col-12 mt-3'>
                                                                {/* <Form.Label>Hint</Form.Label> */}
                                                                {/* <Form.Control readOnly={true} type="text" value={((allanswer.length > 0) ? allanswer[index].hint : '')} name="hint" onChange={(e) => setHint(e.target.value)}  ></Form.Control> */}


                                                            </div>
                                                            <div className="  col-lg-2 col-sm-6 col-12  ">
                                                                {/* <Form.Label>Type</Form.Label> */}
                                                                <Form.Group controlId="exampleForm.ControlInput1" >

                                                                    {/* <Form.Control readOnly={true} type="text" name='type'  onChange={(e) => setType(e.target.value)}></Form.Control> */}



                                                                    {/* <Form.Control type="text" name='optionA' value={((allanswer.length > 0) ? allanswer[index].type : '')}
                                                                        onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control> */}
                                                                </Form.Group>
                                                            </div>
                                                            <div className="col-lg-2 col-sm-6 col-12 ">
                                                                <Form.Group controlId="exampleForm.ControlInput1">
                                                                    {/* <Form.Label>Marks</Form.Label> */}
                                                                    {/* <Form.Select  aria-label="Default select example"> */}

                                                                    {/* </Form.Select> */}
                                                                    {/* <Form.Control type="text" name='marks' value={inputField.answer}
    onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control> */}
                                                                    {/* <Form.Control readOnly={true} type="text" name='Answer' value={((allanswer.length > 0) ? allanswer[index].marks : '')} placeholder='Marks' onChange={(e) => setMarks(e.target.value)}></Form.Control> */}
                                                                </Form.Group>
                                                            </div>



                                                            <div className="singleansrev col-lg-6 col-sm-6 col-12">
                                                                <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                                    {/* <Form.Label>Answer</Form.Label> */}
                                                                    <Form className="custom-select"
                                                                        value={foodState}
                                                                        onChange={(e) => {
                                                                            const selectedFood = e.target.value;
                                                                            setFoodState(selectedFood);
                                                                        }}>

                                                                    </Form>
                                                                    {/* <Form.Control type="text" name='Answer' onChange={(e) => setAnswer(e.target.value)} placeholder='Answer' as="textarea" rows={5} ></Form.Control> */}
                                                                </Form.Group>

                                                            </div>


                                                        </div>
                                                    </div>


                                                    {/* )} */}
                                                </div>

                                            )}



                                        </TableBody>





                                        {/* <ReactPaginate className='pagination'
                                                previousLabel={"Previous"}
                                                nextLabel={"next"}
                                                pageCount={pageCount}
                                                onPageChange={handlePageClick}
                                                containerClassName={"pagination"}
                                                previousLinkClassName={"pagination_link"}
                                                nextLinkClassName={"paginatiom_link"}
                                                disabledClassName={"pagination_link--disabled"}
                                                activeClassName={"pagination_link--active"}
                                            /> */}

                                    </Table>
                                </TabPanel>
                            </Col>

                        </div>
                    </div>
                </div>



            </div>
          
            {/* <Grid item xs={12} lg={12} md={12} sm={12} className="px-3 mt-3 w-100 d-flex justify-content-end">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TablePagination

                        rowsPerPageOptions={[1, 2, 5, 10, 25]}
                        colSpan={3}
                        count={totalPages * rowLimit}
                        rowsPerPage={rowLimit}
                        page={page - 1}
                        SelectProps={{
                            inputProps: {
                                'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onRowPerChange}
                    // ActionsComponent={TablePaginationActions}
                    />
                </div>
            </Grid> */}
              
              <div class="Update">

<div className='predit'>
    <Button class="btn btn-warning" onClick={() => gotoprev()} size='small' variant="contained">Previous</Button>
</div>
<div className='nextedit'>
   {/*} <Button class="btn btn-warning" onClick={() => gotonext()} size='small' variant="contained">Next</Button>*/}
    <Button class="btn btn-warning" onClick={() => gotonext()} size='small' variant="contained">Next</Button>
</div>
</div>
<div className='updtbtn'>
<Button class="btn btn-info" size='small' onClick={() => addNewEvaluation()} variant="contained">Update</Button>
</div>
        </>
    
    )
    
}











