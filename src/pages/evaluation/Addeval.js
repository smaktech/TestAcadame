import { dynamic, InputGroup, FormControl, Table, Form, Row, Col } from 'react-bootstrap'
import { createCourse, editCourse, getCourseById } from '../../api/Courses/Courses'
import { createEvaluation } from '../../api/Evaluation/Evaluation'
import { createQuestion } from '../../api/Question/Question'

import { createAnswer } from '../../api/Answer/Answer'
import { getAllTopics, getTopicByFilter } from '../../api/Topic/Topic'
import { getAllBoard } from '../../api/Boards/Boards'
import { getAllSubjects } from '../../api/Subject/Subject'
import { getAllCourse } from '../../api/Courses/Courses'
import { getAllSubBoard } from 'src/api/SubBoard/SubBoard'
import { getAllClasses } from '../../api/Classes/Classes'
import test from './image/geogebra-export.png';
import CircularProgress from '@mui/material/CircularProgress';
import "./app.css"
import Container from '@material-ui/core/Container';
import Addmoreinput from './dynamic';
import Dynfield from './dynfield';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { getEvaluationID } from '../../api/Evaluation/Evaluation';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import { v4 as uuidv4 } from 'uuid';


// import App from './test'
import CardMedia from '@mui/material/CardMedia';
import SaveIcon from '@mui/icons-material/Save';
import * as serviceWorker from './serviceWorker';

// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import { Button, TextField, FormControlLabel, } from '@mui/material'

import { Modal as BootstrapModal } from 'react-bootstrap'
import Grid from '@mui/material/Grid';
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
import { getUserById, changeStatus, deleteUser } from "../../api/Users/Users"
import { imageBaseUrl } from '../../config';
// import Tabs from 'react-bootstrap/Tabs'
import { materialTableIcons } from '../../config';
import MaterialTable from 'material-table'
import { getAllUserCourses } from '../../api/Courses/Courses'
// import { CategoryScale, PointElement, LinearScale, BarElement, Title, Tooltip, Legend, Chart } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import { Button } from '@mui/material';

// import Grid from '@mui/material/Grid';
// import CircularProgress from '@mui/material/CircularProgress';
// import Modal from '@mui/material/Modal';
// import UserCoursesRow  from './UserCoursesRow'
import { useParams } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';


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
    const [courses, setCourses] = useState({});

    //setting course data into a variable
    const [boardData, setBoardData] = useState([]);

    //setting course data into a variable
    const [classesData, setClassesData] = useState([]);
    const [coursesData, setCoursesData] = useState([]);

    //setting course data into a variable
    const [subjectData, setSubjectData] = useState([]);

    //setting course data into a variable
    const topicData = useRef([]);

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

    //sets subject user want to add
    const [subject, setSubject] = useState()
    const [subject2, setSubject2] = useState()
    const [text, setText] = useState("");
    const addToText = (val) => {
        setText((text) => [...text, val + " "]);
    };

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

    const [limit, setLimit] = useState(100);
    const [classState, setClassState] = useState('')
    const [boardState, setBoardState] = useState('')
    const [subBoardState, setSubBoardState] = useState('')
    const [subjectState, setSubjectState] = useState('')
    const [courseState, setCourseState] = useState('')
    const [foodState, setFoodState] = useState();
    const [formula, setFormula] = useState('');
    const [question, setQuestion] = useState()
    const [typestate, setTypeState] = useState();
    const [type, setType] = useState();
    const [boardIcon, setBoardIcon] = useState("");

    const [media, setMedia] = useState("");
    // const courseID ='';
    // const [editFormLoader, setEditFormLoader] = useState(false)
    // const [mode, setMode] = useState(courseID ? "edit" : "add");
    const [evalid, setEvalid] = useState();
    const [hint, setHint] = useState();
    // const [createevaluation, setCreateevaluation] = useState()

    const [id, setID] = useState();

    const [marks, setMarks] = useState()
    const [answer, setAnswer] = useState()
    const [showhide, setShowhide] = useState('');
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

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
            // setMedia(e.target.files[0])
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    const handleshowhide = (event) => {

        const getuser = event.target.value;

        setType(event.target.value)
        setShowhide(getuser);

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

    useEffect(() => {
        setMode(courseID ? "edit" : "add")
        setEditFormLoader(true)
        getCourseById(courseID).then((res) => {
            console.log('res', res);
            if (res.status) {
                //setting the fetched Course by id into state variable
                setCourse(res.course);
                setName(res.course.name)
                // setDescription(res.course.description)
                //setBoard(res?.course?.board?._id)
                setSelectedSubBoard(res?.course?.subBoardID?._id)
                // setClasses(res.course.classesID._id)
                // setSubject(res.course.subjectID._id)
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

        // fetching all courses 
        getAllCourse(page, limit).then((res) => {
            console.log('course', res);
            if (res.status) {
                //setting the fetched classes into state variable
                setCoursesData(res.results.data);
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



    const mctypes = useStyles()
    const classes = useStyles()
    const mcqs = useStyles()
    const [inputFields, setInputFields] = useState([
        { id: uuidv4(), type: '', hint: '', answer: '', marks: '' },
    ]);

    // const [mcqFields, setMcqFields] = useState([
    //     { id: uuidv4(), optiona: '', optionb: '', optionc: '', optiond: '' },
    // ]);
    const [mcqFields, setMcqFields] = useState([
        { id: uuidv4(), optiona: '' },
    ]);
    const [mcqtypeFields, setMcqTypeFields] = useState([
        { id: uuidv4(), hint: '', type: '', marks: '' },
    ]);
    const handlemctypesSubmit = (e) => {
        e.preventDefault();
        console.log("mctypesfiled", mctypes);
    };
    // setInputFields= useState(0);

    const handleMctypesChangeInput = (id, event) => {
        const newmctypesFields = mcqtypeFields.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setMcqTypeFields(newmctypesFields);
    }

    //edit the details  of the existing Course
    function editCourseDetails() {
        setModalVisible(false);
        setEditLoader(true);
        showError(false);
        if (courseID != '') {

            editCourse(courseID, name, board, selectedSubBoard, classes, subject, description, courseStatus, courseImage)
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

    ////////
    const addevaluation = async () => {
        var createevaluation = await createEvaluation(boardName, className, subjectName, description1, name);
        setTab(1)
        setID(createevaluation);
        console.log("This is from create evaluation", createevaluation)
    }


    //adds new Course 
    const addNewEvaluation = async () => {



        setQuestion(' ');
        setHint(' ');
        setMarks(' ');
        setAnswer(' ');
        // setMedia(' ');






        alert("Question and answer submitted")

        const handleNext = () => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };




        // className = '';
        // boardName = '';
        // subBoardName = '';
        // subjectName = '';
        // setModalVisible(false);
        // setAddLoader(true);
        // showError(false);
        // console.log(boardName);
        //  console.log( boardData);
        var boardName = board2;
        className = classes1;
        subjectName = subject2;

        // if (name && board && classes && subject && description && courseImage != '') {



        var Questiontableid = await createQuestion(id, question, media);
        console.log('This is question table id', Questiontableid)

        var ABC = createAnswer(id, Questiontableid, inputFields, mcqFields, mcqtypeFields);

        console.log('CA Check', ABC);





        //             .then((res) => {
        //                 console.log(res);
        //                 if (res.status) {
        //                     setAddLoader(false);
        //                     setModalLine1('New Course Added');
        //                     setModalLine2('Successfully')
        //                     setModalVisible(true)
        //                 }
        //                 else {
        //                     setAddLoader(false);
        //                     showError(true);
        //                     setErrorMessage('Error occured');
        //                 }
        //             })
        //             .catch((err) => {
        //                 console.log(err);
        //                 setAddLoader(false)
        //                 showError(true);
        //                 setErrorMessage('Error occured');
        //             })
        //     }
        //     else {
        //         setAddLoader(false)
        //         showError(true);
        //         setErrorMessage('Please fill the Course details');
        //     }
        // }

        // // on change Picture handler
        // const onChangePictureHandler = (e) => {
        //     var url = URL.createObjectURL(e.target.files[0]);
        //     console.log(e.target.files[0])
        //     setPicturePreview(url)
        //     setCoursePicture(e.target.files[0])
        // }
    }


    // function to reset 
    const reSetForm = () => {
        setName(null)
        setDescription1(null)
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
        // console.log(all)
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
        // console.log("working")

    }
    //setting the user id of the user coming from the url into a local variable
    // const [userId, setUserId] = useState(props.match.params.id);
    const { userId } = useParams()
    const tableIcons = materialTableIcons

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
        console.log("SetTab", newValue)
    };
    //returns the created date of the record of the table
    function renderDate(date) {
        const newDate = new Date(date);
        const returnDate = months[newDate.getMonth()] + ' ' + newDate.getDate() + ' ' + newDate.getFullYear();
        return returnDate;
    }


    //useEffect will assign the data of user according to the userId from the state on every change into the userId
    useEffect(() => {

        getUserById(userId)
            .then((res) => {
                // console.log('user Details', res);
                // if (res.status) {
                setNoUserFound(false);
                setUserDetailsById(res.user);
                const profilePic = res.user.profileImage ? (imageBaseUrl + res.user.profileImage) : ('');
                setUserProfileImg(profilePic)
                // }
                // else {
                //     setNoUserFound(true);
                // }
            })
            .catch((err) => {
                // console.log(err);
            })


    }, [userId])

    useEffect(async () => {

        if (userId) {
            const response = await getEarningsByUserId(userId)
            if (response.status) {
                setUserPayments(response.course)
                // console.log(response, " payment")
                let sum = 0;
                response.course.map(item => {
                    sum = sum + parseInt(item.amount)
                })
                setTotalPaymentAmount(sum)
            }
        }

    }, [userId])

    //function to change the status of the user to blocked!
    function changeUserStatus(status) {
        changeStatus(userDetailsById._id, status)
            .then((res => {
                // console.log('res', res);
                if (res.status) {
                    getUserById(userId)
                        .then((res) => {
                            // console.log(res);
                            if (res.status) {
                                setNoUserFound(false);
                                setUserDetailsById(res.user);
                                const profilePic = res.user.profileImage ? (imageBaseUrl + res.user.profileImage) : ('');
                                setUserProfileImg(profilePic)
                            }
                            else {
                                setNoUserFound(true);
                            }
                        })
                        .catch((err) => {
                            // console.log(err);
                        })
                }
                else {
                    alert("error occured")
                }
            }))
            .catch((err => {
                // console.log('err', err);
            }))
    }

    function changeCourseStatus(rowData, index, status) {
        editCourse(rowData._id, rowData.name, rowData?.boardID?._id, rowData?.subBoardID?._id, rowData?.classesID?._id, rowData?.subjectID?._id, rowData?.description, status)
            .then((res => {
                // console.log('res',res);
                if (res.status) {
                    // const index = rowData.tableData.id;
                    //updating Course status in state array
                    const updatedRows = [...course];
                    updatedRows[index].status = status;
                    setCourse(updatedRows);

                }
                else {
                    alert("error occured")
                }
            }))
            .catch((err => {
                console.log('err', err);
            }))
    }
    function deleteUserProfile() {
        deleteUser(userDetailsById._id)
            .then((res) => {
                // console.log(res)
                if (res.status) {

                }
            })
            .catch((err) => {
                // console.error(err)
            })
    }
    // function addnewqtn() {
    //     console.log('jacky')
    //     $("#dynamic").append("<input type='text' value={'jacky'}/>");
    // }


    useEffect(() => {
        // fetching all user courses
        setTableDataLoading(true)
        getAllUserCourses(userId).then((res) => {
            // console.log('getAllUserCourses', res);
            if (res.status) {
                //setting the fetched getAllUserCourses into state variable
                setUserCourses(res.courses);
                setCompletedCouresNum(res.courses.filter(item => item.progress == 100).length)
            }
            setTableDataLoading(false)
        })
            .catch((err) => {
                // console.error(err);
            });
    }, [userId])

    // console.log(className)
    const classSeparator = (e) => {
        setClassState(e.target.value)
        // const className = e.target.value.split('*')[0]
        className = e.target.value.split('*')[1];
        console.log('value', className);
        setClasses1(className);
        // setName(className + ' ' + boardName + ' ' + subjectName)
    }
    const courseSeparator = (e) => {
        setCourseState(e.target.value)
        // const qualification = e.target.value.split('*')[0]
        // setCourses(courseName)
        courseName = e.target.value.split('*')[1];
        setName(className + ' ' + boardName + ' ' + subjectName + ' ' + courseName)
    }
    const boardSeparator = (e) => {
        setBoardState(e.target.value)
        // const board2 = e.target.value.split('*')[0]
        boardName = e.target.value.split('*')[1];
        console.log('value', boardName);
        setBoard2(boardName);

        console.log('board value', board2);


        // setName(className + ' ' + boardName + ' ' + subjectName)
    }

    const typeseperator = (e) => {
        typestate(e.target.value)
        typename = e.target.value.split('*')[1];
        console.log('value', typename);
        setType(typename);
        console.log('Type value', board);
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
        // const subjectId = e.target.value.split('*')[0]
        subjectName = e.target.value.split('*')[1];
        console.log('value', subjectName);
        setSubject2(subjectName);

        console.log('subject value', subject2);
        setName(className + ' ' + boardName + ' ' + subBoardName + ' ' + subjectName)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("InputFields", inputFields);
    };

    const mcqSubmit = (e) => {
        e.preventDefault();
        console.log("mcqsfield", mcqFields);
    };

    const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setInputFields(newInputFields);
    }
    const handleMCQChangeInput = (id, event) => {
        const newMcqInputFields = mcqFields.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setMcqFields(newMcqInputFields);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(), type: '', hint: '', answer: '', marks: '' }])
    }
    const handlemcqAddFields = () => {
        setMcqFields([...mcqFields, { id: uuidv4(), optiona: '' }])
    }

    const handlemcqRemoveFields = id => {
        const values = [...mcqFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setMcqFields(values);
    }
    const handleRemoveFields = id => {
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }



    return (
        <>
            {/* <TopNavbar /> */}
            {/* <LeftNavbar > */}

            <div className="container" >
                {/* <p className="mt-3 txt-5282F0">Users {'>'} Details</p> */}
                <h5 className="mt-3 txt-5282F0 fw-bold">Evaluation Management</h5>


                <hr className="mt-4" />
                <div className="d-flex align-items-center">
                    <div className="container pageHeaderCard">
                        <div className="row">
                            {/* {console.log(userDetailsById)} */}

                            <div className="col-lg-8 col-12">
                                {/* <Tab.Container id="left-tabs-example" defaultActiveKey="courses" style={{ backgroundColor: 'yellow' }}> */}
                                <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example" variant={"scrollable"}
                                    scrollButtons={"on"}>
                                    <Tab label="Evaluation details" {...a11yProps(0)} />
                                    <Tab label="Create" {...a11yProps(1)} />
                                    <Tab label="Review" {...a11yProps(2)} />
                                    {/* <Tab label="Publish" {...a11yProps(3)} /> */}
                                    {/* <div className='si'><Button>Save </Button></div> */}
                                    {/* <Tab label="Payment" {...a11yProps(2)} />
                                        <Tab label="Subscription" {...a11yProps(3)} /> */}
                                    {/* <Tab label="Progress" {...a11yProps(4)} /> */}
                                </Tabs>

                                <div >

                                    <TabPanel value={tab} index={0}>
                                        <div className='evaluationone'>
                                            <div className='one'>
                                                <div className="col-lg-6 col-sm-12 col-16">
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label> Board</Form.Label>
                                                        <Form.Select onChange={boardSeparator} value={boardState} aria-label="Default select example"> {/*onChange={boardSeparator} value={boardState}*/}
                                                            <option>Select </option>
                                                            {boardData.map((item, index) => (
                                                                <option key={index} value={`${item._id}*${item.name}`}>{item.name}</option>
                                                            ))}


                                                        </Form.Select>
                                                    </Form.Group>
                                                    {subBoardsData.length ? (
                                                        <Form.Group className="mb-3 col-4" controlId="exampleForm.ControlInput1">
                                                            <Form.Label> Sub Board</Form.Label>
                                                            <Form.Select value={subBoardState} onChange={subBoardSeparator} aria-label="Default select example">
                                                                <option> Select </option>
                                                                {subBoardsData.map((item, index) => (
                                                                    <option key={index} value={`${item._id}*${item.name}`}>{item.name}</option>
                                                                ))}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    ) : (null)}
                                                </div>
                                                <div className='qualification col-lg-6' >
                                                    <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                        <Form.Label> Qualification</Form.Label>
                                                        <Form.Select value={classState} onChange={classSeparator} aria-label="Default select example">
                                                            <option>Select </option>
                                                            {classesData.map((item, index) => (
                                                                <option key={index} value={`${item._id}*${item.name}`}>{item.name}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className='two'>
                                                <div className='selectsub col-lg-6'>

                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Subject</Form.Label>
                                                        <Form.Select value={subjectState} onChange={subjectSeparator} aria-label="Default select example">
                                                            <option>Select  </option>
                                                            {subjectData.map((item, index) => (
                                                                <option key={index} value={`${item._id}*${item.name}`}>{item.name}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </div>
                                                <div className='coursename col-6'>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Course Name</Form.Label>
                                                        <Form.Select value={name} type="text" onChange={(e) => setName(e.target.value)} aria-label="Default select example">
                                                            <option>Select  </option>
                                                            {coursesData.map((item, index) => (
                                                                <option key={index} value={`${item.name}`}>{item.name}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className='desc col-lg-8'>
                                                <Form.Group className="mb-8 " controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control value={description1} placeholder="Total word count 400 only" type="text" onChange={(e) => setDescription1(e.target.value)} as="textarea" rows={3} />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="addevalnxtbtn" >
                                            <Button onClick={() => addevaluation()} className="btn btn-warning" size='small' variant="contained"   >Next</Button>
                                        </div>

                                    </TabPanel>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



            <div>



                <Col sm={12}>
                    <TabPanel value={tab} index={1} id="create">
                        <div className="createques">

                            <div>
                                <Form.Group className="mb-6 " controlId="exampleForm.ControlTextarea1" ></Form.Group>
                                <Form.Label>Question</Form.Label>

                                <Form.Control type="text" style={{ width: "320%", height: "85%" }} value={question} onChange={(e) => setQuestion(e.target.value)} as="textarea" rows={5}   ></Form.Control>
                                <Form.Control type="hidden" value={id} onChange={(e) => setID(e.target.value)}   ></Form.Control>
                            </div>
                            <div class="vl"></div>
                            <div className='IV' >
                                <h1 class="ig">Media</h1>
                                <Card style={{ backgroundColor: "gray", marginLeft: "-23%" }} sx={{ border: '1px solid yellow' }} className='addevalimght'>
                                    <Form.Control type="file" onChange={(e) => setMedia(e.target.files[0])} />
                                    {selectedFile && <img src={preview} />}</Card>

                            </div>

                        </div>


                        <div className=" col-lg-12 col-sm-6 col-12 mt-3"   >
                            <Container >

                                <form className={classes.root} onSubmit={handleSubmit}>
                                    {inputFields.map(inputField => (
                                        <div key={inputField.id}>
                                            <div className='anspt' onChange={event => handleChangeInput(inputField.id, event)} >
                                                <div class="ques">
                                                    <Form.Label>Answer in Part</Form.Label>
                                                </div>
                                                <div className='crthint'>
                                                    <div className="col-lg-3 col-sm-6 col-12 mt-3 ">
                                                        <Form.Label>Hint</Form.Label>
                                                        <Form.Control value={inputFields.hint} name="hint" type="text" onChange={event => handleChangeInput(inputField.id, event)}  ></Form.Control>
                                                    </div>


                                                    <div className=" type  col-lg-3 col-sm-6 col-12  ">
                                                        <Form.Label>Type</Form.Label>
                                                        <Form.Group controlId="exampleForm.ControlInput1" >


                                                            <Form.Select className="custom-select" value={inputFields.type} name='type' type='text' onChange={(e) => (handleshowhide(e))}
                                                                aria-label="Default select example">
                                                                <option value="select">Select</option>
                                                                <option value="text"> Text</option>
                                                                <option value="media">G-Panel</option>
                                                                <option value="formula">Formula</option>
                                                                <option value="mcq">MCQ</option>

                                                                {/* <Form.Control type='text' name='type' value={inputFields.type} onChange={event => handleChangeInput(inputField.id, event)}   ></Form.Control> */}

                                                            </Form.Select >
                                                            {/* <Form.Control value={inputFields.type} name='type' type='text' onChange={event => handleChangeInput(inputField.id, event)}></Form.Control> */}

                                                            {/* <Form.Control type="text" name='optionA' value={inputField.optionA}
                                             onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control> */}
                                                        </Form.Group>
                                                    </div>

                                                    <div className="marks  col-lg-3 col-sm-6 col-12">
                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Marks</Form.Label>

                                                            <Form.Control value={inputFields.marks} type="number" name='marks' placeholder='Marks' onChange={event => handleChangeInput(inputField.id, event)}></Form.Control>
                                                        </Form.Group>
                                                    </div>


                                                </div>



                                                {
                                                    showhide === 'media' && (
                                                        <div >
                                                            <Form.Group controlId="exampleForm.ControlInput1">
                                                                <Form.Label>G-Panel</Form.Label>
                                                                <br />
                                                                <iframe class="responsive-iframe" img src={test} width='100%' height="200" > </iframe>
                                                            </Form.Group>

                                                        </div>
                                                    )}

                                                {
                                                    showhide === 'mcq' && (
                                                        <form className={mcqs.root} onSubmit={handlemctypesSubmit}>
                                                            {mcqtypeFields.map(mcqtypeField => (
                                                                   <div key={mcqtypeField.id}>
                                                                   <div className='crthint'>
                                                                    <div className="col-lg-2 col-sm-6 col-12 mt-3 ">
                                                                        <Form.Label>Hint</Form.Label>
                                                                        <Form.Control value={mcqtypeFields.hint} name="hint" type="text"  onChange={event => handleMctypesChangeInput(mcqtypeField.id, event)} ></Form.Control>
                                                                    </div>
                                                                    
                                                                    
                                                                    <div className=" type  col-lg-2 col-sm-6 col-12  ">
                                                                        <Form.Label>Type</Form.Label>
                                                                        <Form.Group controlId="exampleForm.ControlInput1" >
                                                                    
                                                                    
                                                                            
                                                                    
                                                                             <Form.Control type='text' name='type'     onChange={event => handleMCQChangeInput(mcqField.id, event)}   ></Form.Control> 
                                                                    
                                                                          
                                                                            {/* <Form.Control value={inputFields.type} name='type' type='text' onChange={event => handleChangeInput(inputField.id, event)}></Form.Control>  */}
                                                                    
                                                                             {/* <Form.Control type="text" name='optionA' value={inputField.optionA}
                                                                    onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control>  */}
                                                                        </Form.Group>
                                                                    </div>
                                                                    
                                                                    <div className="marks  col-lg-2 col-sm-6 col-12">
                                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                                            <Form.Label>Marks</Form.Label>
                                                                    
                                                                            <Form.Control value={mcqtypeFields.marks} type="number" name='marks' placeholder='Marks'  onChange={event => handleMctypesChangeInput(mcqtypeField.id, event)} ></Form.Control>
                                                                        </Form.Group>
                                                                    </div>
                                                                    
                                                                    
                                                                    </div>
                                                                    </div>


                                                                      ))}

                                                        </form>
                                                    )
                                                }

                                                {

                                                    showhide === 'mcq' && (
                                                        <form className={mcqs.root} onSubmit={mcqSubmit}>

                                                            {mcqFields.map(mcqField => (
                                                                <div key={mcqField.id}>

                                                                    <div className='mcqbox' >


                                                                        <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                                            <Form.Label>Option</Form.Label>
                                                                            <Form.Control type="text" name='optiona' value={mcqField.optiona}
                                                                                onChange={event => handleMCQChangeInput(mcqField.id, event)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                                                                        </Form.Group>

                                                                        {/* <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                                            <Form.Label>Answer B</Form.Label>
                                                                            <Form.Control type="radio" name='optionb' value={mcqField.optionb}
                                                                                onChange={event => handleMCQChangeInput(mcqField.id, event)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                                                                        </Form.Group>
                                                                        <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                                            <Form.Label>Answer C</Form.Label>
                                                                            <Form.Control type="radio" name='optionc' value={mcqField.optionc}
                                                                                onChange={event => handleMCQChangeInput(mcqField.id, event)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                                                                        </Form.Group>
                                                                        <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                                            <Form.Label>Answer D</Form.Label>
                                                                            <Form.Control type="radio" name='optiond' value={mcqField.optiond}
                                                                                onChange={event => handleMCQChangeInput(mcqField.id, event)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                                                                        </Form.Group>
                                                                        <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                                            <Form.Label>Answer E</Form.Label>
                                                                            <Form.Control type="radio" name='optione' value={mcqField.optiond}
                                                                                onChange={event => handleMCQChangeInput(mcqField.id, event)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                                                                        </Form.Group>
                                                                        <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                                            <Form.Label>Answer F</Form.Label>
                                                                            <Form.Control type="radio" name='optionf' value={mcqField.optiond}
                                                                                onChange={event => handleMCQChangeInput(mcqField.id, event)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                                                                         </Form.Group> */}


                                                                    </div>

                                                                </div>
                                                            ))

                                                            }
                                                            <div className='mcqbtnsas' style={{ width: '80%', marginTop: '-4.9%', marginLeft: '3.7%' }}>
                                                                <div className='btnadd'>
                                                                    <Button className='btnai' size='small' onClick={handlemcqAddFields} color="success" variant="contained" ><AddIcon /></Button>
                                                                </div>
                                                                <div class='btnsub'>
                                                                    <Button className="btnsi" variant="contained" onClick={handlemcqRemoveFields} color="error" size="small" ><RemoveIcon /></Button>
                                                                </div>
                                                            </div>
                                                        </form>

                                                    )}
                                                {
                                                    showhide === 'formula' && (
                                                        <div className="col-lg-5 col-sm-6 col-12 ">
                                                            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                                <Form.Label>Formula</Form.Label>
                                                                <Form className="custom-select"
                                                                    value={inputFields.formula}
                                                                    onChange={(e) => {
                                                                        const selectedFood = e.target.value;
                                                                        setFoodState(selectedFood);
                                                                    }}>

                                                                </Form>
                                                                <Form.Control type="text" text={text} name='Answer' value={formula} onChange={(e) => setFormula(e.target.value)} placeholder='Formula' ></Form.Control>
                                                                <br />

                                                                <div class="buttons-flex">

                                                                    <button class="btn btn-light" size="small">&#43;</button>
                                                                    <button class="btn btn-light" size="small">&#8722;</button>
                                                                    <button class="btn btn-light" size="small">&#xd7;</button>
                                                                    <button class="btn btn-light" size="small">&#xf7;</button>
                                                                    <button class="btn btn-light" size="small">&#x3d;</button>
                                                                    <button class="btn btn-light" size="small">&#x2260;</button>
                                                                    <button class="btn btn-light" size="small">&#xb1;</button>
                                                                    <button class="btn btn-light" size="small">&#x25;</button>
                                                                    <button class="btn btn-light" size="small">&#x3c;</button>
                                                                    <button class="btn btn-light" size="small">&#x3e;</button>


                                                                </div>



                                                            </Form.Group>

                                                        </div>
                                                    )}





                                                {/* <div className='btnadd'>
                                <Button className='btnai' size='small' color="success" variant="contained" onClick={handleAddFields}><AddIcon /></Button>

                            </div>
                            <div class='btnsub'>
                                <Button className="btnsi" variant="contained" color="error" size="small" onClick={handleRemoveFields}><RemoveIcon /></Button>
                            </div> */}
                                                {
                                                    showhide != 'media' && showhide != 'formula' && showhide != 'mcq' && (
                                                        <div className="ans col-lg-6 col-sm-6 col-12" >
                                                            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                                <Form.Label>Answer</Form.Label>
                                                                <Form className="custom-select"
                                                                    value={foodState}
                                                                    onChange={(e) => {
                                                                        const selectedFood = e.target.value;
                                                                        setFoodState(selectedFood);
                                                                    }}>

                                                                </Form>
                                                                <Form.Control type="text" name='answer' value={inputFields.answer} onChange={event => handleChangeInput(inputField.id, event)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                                                            </Form.Group>
                                                            <div className='createplus'>
                                                                <div className='btnadd'>
                                                                    <Button className='btnai' size='small' onClick={handleAddFields} color="success" variant="contained" ><AddIcon /></Button>
                                                                </div>
                                                                <div class='btnsub'>
                                                                    <Button className="btnsi" variant="contained" onClick={handleRemoveFields} color="error" size="small" ><RemoveIcon /></Button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    )}

                                            </div>
                                        </div>


                                    ))}

                                </form>
                                <div className='btnnxtcreate '>

                                    <Button className="btn btn-warning" size='small' onClick={() => setTab(2)} variant="contained">Next</Button>


                                </div>
                                {/* onClick={handleAddFields} onClick={handleRemoveFields}*/}

                            </Container>
                        </div>
                    </TabPanel>
                </Col>
            </div>

            <div>

                {/* ................................This is review tab......................... */}
                <Col sm={12}>
                    <TabPanel value={tab} index={2}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    {/* <TableCell>S.No.</TableCell>                             */}
                                    <TableCell >Course</TableCell>
                                    <TableCell >board Name</TableCell>
                                    <TableCell >Qualification</TableCell>
                                    <TableCell >Subject Name</TableCell>
                                    <TableCell >Description</TableCell>
                                </TableHead>
                                <TableBody>

                                    {/* <TableCell>S.No.</TableCell>*/}
                                    <TableCell >{name} </TableCell>
                                    <TableCell >{board2}</TableCell>
                                    <TableCell >{classes1}</TableCell>
                                    <TableCell >{subject2}</TableCell>
                                    <TableCell >{description1}</TableCell>


                                    <br />



                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div className="lastrev">

                            <div>
                                <Form.Group className="mb-6 " controlId="exampleForm.ControlTextarea1" ></Form.Group>
                                <Form.Label>Question</Form.Label>

                                <Form.Control type="text" style={{ width: "570%" }} readOnly={true} value={question} onChange={(e) => setQuestion(e.target.value)} as="textarea" rows={5}   ></Form.Control>
                            </div>

                            <div class="vl"></div>
                            <div className='lastwmedia' >
                                <Form.Label className='medialabel'>Media</Form.Label>
                                <Card style={{ backgroundColor: "gray", marginLeft: "-1350%" }} sx={{ border: '1px solid yellow' }} className='lastimg'>
                                    {/* <Form.Control type="file" onChange={onSelectFile} onChange1={(e) => setMedia(e.target.value)} /> */}
                                    {selectedFile && <img src={preview} />}</Card>

                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-6 col-12" >
                            <form className={classes.root} onSubmit={handleSubmit}>
                                {inputFields.map(inputField => (
                                    <div key={inputField.id}>

                                        <div className='lastbdr' onChange={event => handleChangeInput(inputField.id, event)}>
                                            <div class="ques">
                                                <Form.Group className="mb-6 mt-3 " controlId="exampleForm.ControlInput1" ></Form.Group>
                                                <Form.Label>Answer in Part</Form.Label>
                                            </div>
                                            <div className='lastrevhint'>
                                                <div >
                                                    <Form.Label>Hint</Form.Label>
                                                    <Form.Control readOnly={true} value={inputField.hint} name="hint" type="text" placeholder='Hint' onChange={event => handleChangeInput(inputField.id, event)}  ></Form.Control>
                                                </div>
                                                <div className='ltmk' >
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Marks</Form.Label>
                                                        <Form.Control readOnly={true} value={inputField.marks} type="text" name='marks' placeholder='Marks' onChange={event => handleChangeInput(inputField.id, event)}></Form.Control>
                                                    </Form.Group>
                                                </div>
                                                <div className='ltty' >
                                                    <Form.Label>Type</Form.Label>
                                                    <Form.Group controlId="exampleForm.ControlInput1" >
                                                    {/* <Form.Select className="custom-select" value={inputFields.type} name='type' type='text' onChange={(e) => (handleshowhide(e))}
                                                                aria-label="Default select example">
                                                                <option value="select">Select</option>
                                                                <option value="text"> Text</option>
                                                                <option value="media">G-Panel</option>
                                                                <option value="formula">Formula</option>
                                                                <option value="mcq">MCQ</option> */}

                                                                <Form.Control readOnly={true} type='text' name='type' value={inputField.type} onChange={event => handleChangeInput(inputField.id, event)}   ></Form.Control>

                                                            {/* </Form.Select > */}
                                                    </Form.Group>
                                                </div>

                                            </div>


                                            <div >
                                                {/* {
                                                    showhide === 'mcq' && (
                                                        <div className="ans col-lg-6 col-sm-6 col-12" >
                                                            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                                <Form.Label>Option A</Form.Label>
                                                                <Form.Control type="text" value={answer}
                                                                    onChange={(e) => setAnswer(e.target.value)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                                                            </Form.Group>
                                                            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                                <Form.Label>Option B</Form.Label>
                                                                <Form.Control type="text" value={answer}
                                                                    onChange={(e) => setAnswer(e.target.value)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                                                            </Form.Group>
                                                            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                                <Form.Label>Option C</Form.Label>
                                                                <Form.Control type="text" value={answer}
                                                                    onChange={(e) => setAnswer(e.target.value)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                                                            </Form.Group>
                                                            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                                <Form.Label>Option D</Form.Label>
                                                                <Form.Control type="text" value={answer}
                                                                    onChange={(e) => setAnswer(e.target.value)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                                                            </Form.Group>
                                                        </div>
                                                    )} */}
                                                {
                                                    showhide === 'media' && (
                                                        <div >
                                                            <Form.Group controlId="exampleForm.ControlInput1">
                                                                <Form.Label>G-Panel</Form.Label>
                                                                <br />
                                                                <iframe class="responsive-iframe" img src={test} width='100%' height="200" > </iframe>
                                                            </Form.Group>

                                                        </div>
                                                    )}
                                                 {
                                                    showhide === 'mcq' && (
                                                        <form className={mcqs.root} onSubmit={handlemctypesSubmit}>
                                                            {mcqtypeFields.map(mcqtypeField => (
                                                                   <div key={mcqtypeField.id}>
                                                                   <div className='crthint'>
                                                                    <div className="col-lg-2 col-sm-6 col-12 mt-3 ">
                                                                        <Form.Label>Hint</Form.Label>
                                                                        <Form.Control value={mcqtypeField.hint} name="hint" type="text"  onChange={event => handleMctypesChangeInput(mcqtypeField.id, event)} ></Form.Control>
                                                                    </div>
                                                                    
                                                                    
                                                                    <div className=" type  col-lg-2 col-sm-6 col-12  ">
                                                                        <Form.Label>Type</Form.Label>
                                                                        <Form.Group controlId="exampleForm.ControlInput1" >
                                                                    
                                                                    
                                                                            <Form.Select className="custom-select" readOnly='true' value={mcqtypeField.type} name='type' type='text'  onChange={event => handleMctypesChangeInput(mcqtypeField.id, event)}
                                                                               aria-label="Default select example">
                                                                               {/* <option value="select">Select</option>
                                                                                <option value="text"> Text</option>
                                                                                <option value="media">G-Panel</option>*/}
                                                                                <option value="select">Select</option>
                                                                                {/* <option value="formula">Formula</option>   */}
                                                                                <option value="mcq">MCQ</option> 
                                                                    
                                                                             {/* <Form.Control type='text' name='type' value={mcqField.type} onChange={event => handleMCQChangeInput(mcqField.id, event)}   ></Form.Control>  */}
                                                                    
                                                                            </Form.Select > 
                                                                            {/* <Form.Control value={inputFields.type} name='type' type='text' onChange={event => handleChangeInput(inputField.id, event)}></Form.Control>  */}
                                                                    
                                                                             {/* <Form.Control type="text" name='optionA' value={inputField.optionA}
                                                                    onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control>  */}
                                                                        </Form.Group>
                                                                    </div>
                                                                    
                                                                    <div className="marks  col-lg-2 col-sm-6 col-12">
                                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                                            <Form.Label>Marks</Form.Label>
                                                                    
                                                                            <Form.Control value={mcqtypeField.marks} type="number" name='marks' placeholder='Marks'  onChange={event => handleMctypesChangeInput(mcqtypeField.id, event)} ></Form.Control>
                                                                        </Form.Group>
                                                                    </div>
                                                                    
                                                                    
                                                                    </div>
                                                                    </div>


                                                                      ))}

                                                        </form>

                                                    )
                                                }    
                                                 {

showhide === 'mcq' && (
    <form className={mcqs.root} onSubmit={mcqSubmit}>

        {mcqFields.map(mcqField => (
            <div key={mcqField.id}>

                <div className='mcqbox' >


                    <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                        <Form.Label>Option</Form.Label>
                        <Form.Control type="text" name='optiona' value={mcqField.optiona}
                            onChange={event => handleMCQChangeInput(mcqField.id, event)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                    </Form.Group>

                    {/* <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                        <Form.Label>Answer B</Form.Label>
                        <Form.Control type="radio" name='optionb' value={mcqField.optionb}
                            onChange={event => handleMCQChangeInput(mcqField.id, event)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                        <Form.Label>Answer C</Form.Label>
                        <Form.Control type="radio" name='optionc' value={mcqField.optionc}
                            onChange={event => handleMCQChangeInput(mcqField.id, event)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                        <Form.Label>Answer D</Form.Label>
                        <Form.Control type="radio" name='optiond' value={mcqField.optiond}
                            onChange={event => handleMCQChangeInput(mcqField.id, event)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                        <Form.Label>Answer E</Form.Label>
                        <Form.Control type="radio" name='optione' value={mcqField.optiond}
                            onChange={event => handleMCQChangeInput(mcqField.id, event)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                        <Form.Label>Answer F</Form.Label>
                        <Form.Control type="radio" name='optionf' value={mcqField.optiond}
                            onChange={event => handleMCQChangeInput(mcqField.id, event)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                     </Form.Group> */}


                </div>

            </div>
        ))

        }
        
    </form>

)}   
                                                    
                                               
                                                
                                                {
                                                    showhide === 'formula' && (
                                                        <div className="col-lg-5 col-sm-6 col-12 ">
                                                            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                                <Form.Label>Formula</Form.Label>
                                                                <Form className="custom-select"
                                                                    value={inputFields.formula}
                                                                    onChange={(e) => {
                                                                        const selectedFood = e.target.value;
                                                                        setFoodState(selectedFood);
                                                                    }}>

                                                                </Form>
                                                                <Form.Control type="text" text={text} name='Answer' value={formula} onChange={(e) => setFormula(e.target.value)} placeholder='Formula' ></Form.Control>
                                                                <br />

                                                                <div class="buttons-flex">

                                                                    <button class="btn btn-light" size="small">&#43;</button>
                                                                    <button class="btn btn-light" size="small">&#8722;</button>
                                                                    <button class="btn btn-light" size="small">&#xd7;</button>
                                                                    <button class="btn btn-light" size="small">&#xf7;</button>
                                                                    <button class="btn btn-light" size="small">&#x3d;</button>
                                                                    <button class="btn btn-light" size="small">&#x2260;</button>
                                                                    <button class="btn btn-light" size="small">&#xb1;</button>
                                                                    <button class="btn btn-light" size="small">&#x25;</button>
                                                                    <button class="btn btn-light" size="small">&#x3c;</button>
                                                                    <button class="btn btn-light" size="small">&#x3e;</button>


                                                                </div>



                                                            </Form.Group>

                                                        </div>
                                                    )}
                                                {
                                                    showhide != 'media' && showhide != 'formula' && showhide != 'mcq' && (
                                                        <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Answer</Form.Label>
                                                            <Form className="custom-select"
                                                                value={foodState}
                                                                onChange={(e) => {
                                                                    const selectedFood = e.target.value;
                                                                    setFoodState(selectedFood);
                                                                }}>

                                                            </Form>
                                                            <Form.Control type="text" name='answer' value={inputField.answer} onChange={event => handleChangeInput(inputField.id, event)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                                                        </Form.Group>
                                                    )}
                                                {/* <div className='createplus'>
                                                            <div className='btnadd'>
                                                                <Button hidden="hidden" className='btnai' size='small' onClick={handleAddFields} color="success" variant="contained" ><AddIcon /></Button>
                                                            </div>
                                                            <div class='btnsub'>
                                                                <Button  hidden="hidden" className="btnsi" variant="contained" onClick={handleRemoveFields} color="error" size="small" ><RemoveIcon /></Button>
                                                            </div>
                                                      </div> */}

                                            </div>

                                        </div>





                                    </div>


                                ))}
                                <div className='containedbtn'>
                                    <div className='btnnxtsave'>
                                        <Button class="btn btn-info" onClick={() => addNewEvaluation()} variant="contained">Save</Button>
                                    </div>
                                    <div className='plus'>
                                        <Button class="btn btn-secondary" onClick={() => setTab(1)} variant="contained">Add</Button>
                                    </div>
                                    <div className='Finish'>
                                        <Button class="btn btn-success" onClick={() => navigate("/dashboard/evaluation")} variant="contained">Finish</Button>
                                    </div>

                                </div>
                            </form>
                        </div>

                    </TabPanel>
                </Col>
            </div>

        </>


    )
}