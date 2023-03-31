import React, { useState, useEffect, forwardRef, useRef } from 'react'
import { Modal,  InputGroup, FormControl, Nav, Row, Col, Sonnet } from 'react-bootstrap'
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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead'; 
import { Button } from '@mui/material';
 
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
// import Modal from '@mui/material/Modal';
import UserCoursesRow  from './UserCoursesRow'
import {useParams} from 'react-router'
import UserSubscriptionRow from './UserSubscriptionRow'
import { getEarningsByUserId } from 'src/api/Earnings/Earnings'
import UserPaymentRow from './UserPaymentRow'

// Chart.register(CategoryScale, LinearScale, PointElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,)

// export const options = {
//     responsive: true,
//     plugins: {
//         legend: {
//             position: 'top' ,
//         },
//         title: {
//             display: true,
//             text: 'Chart.js Bar Chart',
//         },
//     },
// };

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

    //setting the user id of the user coming from the url into a local variable
    // const [userId, setUserId] = useState(props.match.params.id);
    const {userId} = useParams()
    const tableIcons = materialTableIcons

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //constant for storing the details of the particular user
    const [userDetailsById, setUserDetailsById] = useState([]);
    const [userProfileImg, setUserProfileImg] = useState('')

    //sets the all courses of user
    const [userCourses, setUserCourses] = useState([])
    console.log('userCourses', userCourses)

    //loader in the alert table on confirm button
    const [actionLodaer, setActionLoader] = useState(false);

    const [filterModal, setFilterModal] = useState(false);

    //sets the loader of apply changes in filter modal
    const [filterLoader, setFilterLoader] = useState(false);
    const [completedCouresNum,setCompletedCouresNum] = useState(0);

    //variable to configure whether the user of that particular id is available or not
    const [noUserFound, setNoUserFound] = useState(false)

    //table data loading indicator
    const [tableDataLoading, setTableDataLoading] = useState(false)
    const [tab, setTab] = React.useState(0);
    const [userPayments,setUserPayments] = useState([])
    const [totalPaymentAmount,setTotalPaymentAmount] = useState(0)
    const handleChange = (event, newValue) => {
      setTab(newValue);
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
                console.log('user Details', res);
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
                console.log(err);
            })


    }, [userId])

    useEffect(async() => {

        if(userId)
        {
            const response = await   getEarningsByUserId(userId)
            if(response.status)
            {
                setUserPayments(response.course)
                console.log(response," payment")
                let sum=0;
                response.course.map(item=>{
                        sum = sum+parseInt(item.amount)
                })
                setTotalPaymentAmount(sum)
            }
        }
        
    },[userId])

    //function to change the status of the user to blocked!
    function changeUserStatus(status) {
        changeStatus(userDetailsById._id, status)
            .then((res => {
                console.log('res', res);
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
                            console.log(err);
                        })
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
                console.log(res)
                if (res.status) {

                }
            })
            .catch((err) => {
                console.error(err)
            })
    }


    useEffect(() => {
        // fetching all user courses
        setTableDataLoading(true)
        getAllUserCourses(userId).then((res) => {
            console.log('getAllUserCourses', res);
            if (res.status) {
                //setting the fetched getAllUserCourses into state variable
                setUserCourses(res.courses);
                setCompletedCouresNum(res.courses.filter(item=>item.progress==100).length)
            }
            setTableDataLoading(false)
        })
            .catch((err) => {
                console.error(err);
            });
    }, [userId])


    return (
        <>
            {/* <TopNavbar /> */}
            {/* <LeftNavbar > */}
            <div className="container" style={{ overflowY: 'scroll' }}>
                <p className="mt-3 txt-5282F0">Users {'>'} Details</p>
                <h5 className="mt-3 txt-5282F0 fw-bold">Users Management</h5>
                <hr className="mt-4" />
                <div className="d-flex align-items-center">
                    <div className="container pageHeaderCard">
                        <div className="row">
                            {/* {console.log(userDetailsById)} */}
                            <div className="col-lg-4 col-12 mb-4">
                                <Card className="shadow" style={{ width: '18rem' }}>
                                    <img   src={userProfileImg ? (userProfileImg) : ("/Assets/userProfile.png")} />
                                    <CardContent className="">
                                        <div className="name" style={{ display: 'flex', justifyContent: 'center' }}>
                                            {/* displaying the name of the user from the userDetailsById object */}
                                             
                                            <Typography variant="h4">{userDetailsById.name}</Typography>
                                        </div>
                                        <Box>
                                            <div className="row email" style={{ color: 'blue', fontSize: 13, margin: 5, marginRight: -10 }}>
                                                <div className="col-md-3 col-3">Email</div>
                                                <div className="col-md-9 col-9">{userDetailsById.email}</div>
                                            </div>
                                            <div className="row phone" style={{ color: 'blue', fontSize: 13, margin: 5 }}>
                                                <div className="col-md-3 col-3">Phone</div>
                                                <div className="col-md-9 col-9">{userDetailsById.phoneNumber}</div>
                                            </div>
                                            <div className="row" style={{ display: 'flex', justifyContent: 'center', color: 'blue', fontSize: 13, margin: 5 }}>
                                                <div className="col-md-6 col-6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    {userDetailsById.isActive ? (
                                                        <a href="javascript:void(0)" onClick={() => changeUserStatus(false)} style={{ width: '50%' }}>Block</a>
                                                    ) : (
                                                        <a href="javascript:void(0)" onClick={() => changeUserStatus(true)} style={{ width: '50%' }}>UnBlock</a>
                                                    )}
                                                </div>
                                                <div className="col-md-6 col-6" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                    <a href="javascript:void(0)" onClick={() => { deleteUserProfile() }} style={{ width: '50%' }}>Delete</a>
                                                </div>
                                            </div>
                                        </Box>  
                                         
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="col-lg-8 col-12">
                                {/* <Tab.Container id="left-tabs-example" defaultActiveKey="courses" style={{ backgroundColor: 'yellow' }}> */}
                                    <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example" variant={"scrollable"}
  scrollButtons={"on"}>
                                        <Tab label="Courses" {...a11yProps(0)} />
                                        <Tab label="School" {...a11yProps(1)} />
                                        <Tab label="Payment" {...a11yProps(2)} />
                                        <Tab label="Subscription" {...a11yProps(3)} />
                                        {/* <Tab label="Progress" {...a11yProps(4)} /> */}
                                    </Tabs>
                                    {/* <Nav variant="pills" className="flex-row border border-primary">
                                        <Nav.Item>
                                            <Nav.Link className="borderRadius0" eventKey="courses">Courses</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className="borderRadius0" eventKey="school">School</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className="borderRadius0" eventKey="payment">Payment</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className="borderRadius0" eventKey="subscription">Subscription</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className="borderRadius0" eventKey="progress">Progress</Nav.Link>
                                        </Nav.Item>
                                    </Nav> */}
                                    <Row>
                                        <Col sm={12}> 
                                                <TabPanel value={tab} index={0}>
                                                    <div className="d-flex align-items-center m-4">
                                                        <Card className="col-5 col-md-5 col-lg-6 bg-light mx-3 shadow-lg rounded">
                                                            <CardContent className="text-center pageHeaderCard">
                                                                <div className="row justify-content-center align-items-center">
                                                                    <div className="col-lg-4 col-md-4 col-12">
                                                                        <img src="/Assets/money.png" />
                                                                    </div>
                                                                    <div className="col-lg-8 col-md-8 col-12">
                                                                        <h4 className="mt-3 txt-5282F0 fw-bold">{userCourses.length}</h4>
                                                                        <h6 className="mt-3 txt-5282F0 fw-bold ">Total Courses <br />Joined</h6>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                        <Card className="col-5 col-md-5 col-lg-6 bg-light shadow-lg mx-3 rounded">
                                                            <CardContent className="text-center pageHeaderCard">
                                                                <div className="row justify-content-center align-items-center">
                                                                    <div className="col-lg-4 col-md-4 col-12">
                                                                        <img src="/Assets/money.png" />
                                                                    </div>
                                                                    <div className="col-lg-8 col-md-8 col-12">
                                                                        <h4 className="mt-3 txt-5282F0 fw-bold">{completedCouresNum}</h4>
                                                                        <h6 className="mt-3 txt-5282F0 fw-bold ">Total Courses <br />Completed</h6>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                    {/* <MaterialTable
                                                        columns={[
                                                            {
                                                                title: 'S No.',
                                                                field: 'Serial',
                                                                render: rowData => <>{rowData.tableData.id + 1}</>
                                                            },
                                                            {
                                                                title: 'Title',
                                                                field: 'Title',
                                                                render: rowData => <>{rowData.courseID.name}</>
                                                            },
                                                            {
                                                                title: 'Joined on',
                                                                field: 'Joined on',
                                                                render: rowData => <>{renderDate(rowData.courseID.createdAt)}</>
                                                            },
                                                            {
                                                                title: 'Timings',
                                                                field: 'Timings',
                                                                // render: rowData => <>{rowData.courseID.createdAt}</>
                                                            },
                                                            {
                                                                title: 'Status',
                                                                field: 'Status',
                                                                render: rowData => <>{rowData.progress == 100 ? 'Completed' : 'Incomplete'}</>
                                                            },
                                                        ]}
                                                        data={userCourses}
                                                        title="Courses"
                                                        isLoading={tableDataLoading}
                                                        options={{
                                                            sorting: true,
                                                            // exportButton: true,
                                                            toolbar: true,
                                                            showTitle: false,
                                                            search: false,
                                                            paging: false
                                                        }}
                                                        icons={tableIcons}
                                                    /> */}
                                                     <TableContainer>
                                                            <Table>
                                                                <TableHead>
                                                                    <TableCell>S.No.</TableCell> 
                                                                    <TableCell >Title</TableCell>
                                                                    <TableCell >Joined On</TableCell>
                                                                    <TableCell >Status</TableCell> 
                                                                </TableHead>
                                                                <TableBody>
                                                                    {userCourses.map((item,index)=>(
                                                                        <UserCoursesRow 
                                                                            item={item}
                                                                            index={index}
                                                                        />
                                                                    ))}

                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                </TabPanel>
                                                <TabPanel value={tab} index={1}>
                                                    <Card className="shadow"  >
                                                        <CardContent className="">
                                                            {/* <Card.Text> */}
                                                                <div className="row email" style={{ color: 'blue', fontSize: 20, margin: 5, marginRight: -10 }}>
                                                                    <div className="col-md-3 col-3">Name:</div>
                                                                    <div className="col-md-9 col-9">{userDetailsById.name}</div>
                                                                </div>
                                                                <div className="row phone" style={{ color: 'blue', fontSize: 20, margin: 5, marginRight: -10 }}>
                                                                    <div className="col-md-3 col-3">Phone:</div>
                                                                    <div className="col-md-9 col-9">{userDetailsById.phoneNumber}</div>
                                                                </div>
                                                                <div className="row email" style={{ color: 'blue', fontSize: 20, margin: 5, marginRight: -10 }}>
                                                                    <div className="col-md-3 col-3">Email:</div>
                                                                    <div className="col-md-9 col-9">{userDetailsById.email}</div>
                                                                </div>
                                                                <div className="row email" style={{ color: 'blue', fontSize: 20, margin: 5, marginRight: -10 }}>
                                                                    <div className="col-md-3 col-3">About:</div>
                                                                    <div className="col-md-9 col-9">{userDetailsById.about}</div>
                                                                </div>

                                                            {/* </Card.Text> */}
                                                        </CardContent>
                                                    </Card>
                                                </TabPanel>
                                                <TabPanel value={tab} index={2}>
                                                    <div className="d-flex align-items-center m-4">
                                                        <Card className="col-5 col-md-5 col-lg-6 bg-light mx-3 shadow-lg rounded">
                                                            <CardContent className="text-center pageHeaderCard">
                                                                <div className="row justify-content-center align-items-center">
                                                                    <div className="col-lg-4 col-md-4 col-12">
                                                                        <img src="/Assets/money.png" />
                                                                    </div>
                                                                    <div className="col-lg-8 col-md-8 col-12">
                                                                        <h4 className="mt-3 txt-5282F0 fw-bold">${totalPaymentAmount}</h4>
                                                                        <h6 className="mt-3 txt-5282F0 fw-bold ">Total Payments <br />Made</h6>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                   
                                                        <TableContainer>
                                                            <Table>
                                                                <TableHead>
                                                                    <TableCell>S.No.</TableCell> 
                                                                    <TableCell >Transaction Id</TableCell>
                                                                    <TableCell >Transaction Date</TableCell>
                                                                    <TableCell >status</TableCell>
                                                                    <TableCell >Price</TableCell> 
                                                                    <TableCell >Cancellation/Refund Status</TableCell> 
                                                                    <TableCell >Cancellation/Refund Date</TableCell> 
                                                                    <TableCell >Cancellation Reason</TableCell> 
                                                                    <TableCell >Action</TableCell> 
                                                                </TableHead>
                                                                <TableBody>
                                                                    {userPayments.map((item,index)=>(
                                                                        <UserPaymentRow 
                                                                            item={item}
                                                                            index={index}
                                                                       
                                                                        />
                                                                    ))}

                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                </TabPanel>
                                                <TabPanel value={tab} index={3}>
                                                    
                                                        <TableContainer>
                                                            <Table>
                                                                <TableHead>
                                                                    <TableCell>S.No.</TableCell> 
                                                                    <TableCell >Course</TableCell>
                                                                    <TableCell >Start Date</TableCell>
                                                                    <TableCell >End Date</TableCell>
                                                                    <TableCell >Price</TableCell> 
                                                                </TableHead>
                                                                <TableBody>
                                                                    {userCourses.map((item,index)=>(
                                                                        <UserSubscriptionRow 
                                                                            item={item}
                                                                            index={index}
                                                                        />
                                                                    ))}

                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                </TabPanel>
                                                <TabPanel value={tab} index={4}>
                                                    <div className="row  " style={{ color: 'blue', fontSize: 15, margin: 5, }}>
                                                        <div className="col-md-3 col-3">
                                                            <div className='row' style={{ color: 'blue', fontSize: 20, }}>
                                                                <div className="col-md-5 col-5">From:</div>
                                                                <div className="col-md-6 col-6">June 8 2021</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 col-3">
                                                            <div className='row' style={{ color: 'blue', fontSize: 20, }}>
                                                                <div className="col-md-5 col-5">To:</div>
                                                                <div className="col-md-6 col-6">June 8 2026</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-6 d-flex justify-content-end">
                                                            <button className="btn btn-primary mx-3" onClick={() => setFilterModal(true)}><BsSortDownAlt /></button>
                                                        </div>
                                                    </div>
                                                    <div className="row " style={{ color: 'blue', fontSize: 18, margin: 5 }}>
                                                        <div className="col-md-1 col-1">Subject:</div>
                                                        <div className="col-md-1 col-1 mx-3">History</div>
                                                    </div>
                                                    {/* <LineChart /> */}
                                                    {/* <Bar datasetIdKey='id' options={options} data={{
                                                        labels: ['Jun', 'Jul', 'Aug'],
                                                        datasets: [
                                                            {
                                                                id: 1,
                                                                label: '',
                                                                data: [5, 6, 7],
                                                            },
                                                            {
                                                                id: 2,
                                                                label: '',
                                                                data: [3, 2, 1],
                                                            },
                                                        ],
                                                    }} /> */}
                                                </TabPanel> 
                                        </Col>
                                    </Row>
                                {/* </Tab.Container> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </LeftNavbar> */}

            {/* Modal for applying filter */}
            <Modal
                show={filterModal}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setFilterModal(false)}
            >
                <Modal.Header className="clr-primary-400 py-2" closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="text-center">
                        <h4 className="text-center   mb-0">
                            Apply Filter
                        </h4>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row labelColor">
                        <div className="col-lg-6 col-sm-6 col-12">
                            <input type="date" className="form-control txt-5282F0"
                            // onChange={(e) => setFilterDateTo(e.target.value)} value={filterDateTo}
                            />
                        </div>
                        <div className="row" style={{ marginTop: 10 }}>
                            <div className="col-lg-12 col-sm-12 col-12">
                                <label>Status</label>
                                <select className="form-control txt-5282F0"
                                // onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}
                                >
                                    <option value={null}>Subject</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="text-center txt-5282F0 my-4">

                    </div>
                    <div className="text-center mt-4 pb-3">
                        <button className="btn btn-outline-secondary px-5"
                        // onClick={()=>resetFilterData()}
                        // onClick={() => resetFilterData()}
                        >Reset </button>
                        &emsp;
                        {filterLoader ? (
                            <button className="btn btn-primary px-5" >
                                <CircularProgress size={20}/>
                            </button>
                        ) : (
                            <button className="btn btn-primary px-5"
                            // onClick={() => { applyFilters() }}
                            >Confirm</button>
                        )}

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

