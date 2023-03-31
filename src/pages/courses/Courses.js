//page for all Subjects listing!
import TablePagination from '@mui/material/TablePagination';
import React, { useState, useEffect, forwardRef, useRef } from 'react'
// import { Modal, Card, InputGroup, FormControl, Table } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useSelector } from 'react-redux'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import Loader from "react-loader-spinner";
import { BsSortDownAlt, BsFillTrashFill, BiBlock } from "react-icons/bs";

import MaterialTable from 'material-table'
import { materialTableIcons, modalStyle } from '../../config';
import { getAllTopics, getTopicByFilter } from '../../api/Topic/Topic'
import { deleteCourse, editCourse, getAllCourse, getCourseByFilter } from '../../api/Courses/Courses'
import { getAllClasses } from '../../api/Classes/Classes'
import { getAllBoard } from '../../api/Boards/Boards'
import { dataLimit } from '../../config';
import { getAllSubjects } from '../../api/Subject/Subject';





import { Modal as BootstrapModal } from 'react-bootstrap'
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import { Button } from '@mui/material';
import SingleCourseRow from './SingleCourseRow';

export default function Courses(props) {
    const tableIcons = materialTableIcons
    //setting course data into a variable
    const [course, setCourse] = useState([]);

    //setting course data into a variable
    const [boardData, setBoardData] = useState([]);

    //setting course data into a variable
    const [subjectData, setSubjectData] = useState([]);

    const [noCourses, setNoCourses] = useState(false);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //this is the modal title for blocking or deleting modal
    const [modalTitle, setModalTitle] = useState('');

    //table data loading indicator
    const [tableDataLoading, setTableDataLoading] = useState(true)

    //sets the info inside the modal
    const [info, setInfo] = useState('')

    //const for setting the mode for which the alert modal is opened ? ('delete'):('block')
    const [modalMode, setModalMode] = useState('')

    //modal visible status for alert modal for deleting or blocking
    const [modalAlertTitle, setModalAlertTitle] = useState(false);

    //modal visible status for success of deleting or blocking
    const [completionModal, setCompletionModal] = useState(false);

    //sets the content of the success Modal!
    const [modalContent, setModalContent] = useState('');

    //sets the id and name of the topic who is blocked or deleted
    const [actionCouseId, setCourseId] = useState();
    const [subjectName, setSubjectName] = useState('');


    //sets the row data where the action took place
    const [rowId, setRowId] = useState()

    //loader in the alert table on confirm button
    const [actionLodaer, setActionLoader] = useState(false);

    //sets the visibility of the filter modal 
    const [filterModal, setFilterModal] = useState(false);

    //sets the user search string into state
    const [search, setSearch] = useState();

    //sets the user picked date from the apply filter modal
    const [filterDateFrom, setFilterDateFrom] = useState();
    const [filterDateTo, setFilterDateTo] = useState();
    const [filterStatus, setFilterStatus] = useState();
    const [subjectID, setSubjectID] = useState()
    const [topicID, setTopicID] = useState()
    const [classesID, setClassesID] = useState()
    const [boardID, setBoardID] = useState()


    const [sortByDate, setSortByDate] = useState();

    //sets the loader of apply changes in filter modal
    const [filterLoader, setFilterLoader] = useState(false);

    const [page, setPage] = useState(1);
    const [rowLimit, setRowLimit] = useState(dataLimit)
    const [totalPages, setTotalPages] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        if (filterLoader || search != null) {
            // if(search!=null || search.length > 0) {
            //setting the loader for table
            setTableDataLoading(true);
            //calling filter functions with required parameters
            console.log(filterDateFrom)
            getCourseByFilter(search, filterDateFrom, filterDateTo, sortByDate, filterStatus, boardID, subjectID)
                .then((res) => {
                    console.log("res", res)
                    if (res.status) {
                        setCourse(res.results.data);
                        setTotalPages(res.results.totalPages)
                    }
                    else {
                        setCourse([])
                    }
                    setFilterLoader(false)
                    setTableDataLoading(false);
                    setFilterModal(false);
                    // resetFilterData()
                })
                .catch((err) => {
                    console.log(err);
                    setFilterLoader(false)
                })
            // }
        }
    }, [search, filterLoader])

    const materialTableRef = useRef()
    useEffect(() => {
        setNoCourses(false)
        setTableDataLoading(true)
        getAllCourse(page, rowLimit).then((res) => {
            console.log('Courses Data', res);
            if (res.status) {
                //setting the fetched Course into state variable
                setCourse(res.results.data);
                setTotalPages(res.results.totalPages)
            }
            else {
                //setting no Course found variable true 
                setNoCourses(true);
            }
            setTableDataLoading(false)
        })
            .catch((err) => {
                console.error(err);
            });

    }, [page, rowLimit])


    useEffect(() => {
        // fetching all boards
        getAllBoard(page, rowLimit).then((res) => {
            console.log('Boards', res);
            if (res.status) {
                //setting the fetched board into state variable
                setBoardData(res.results.data);
            }
        })
            .catch((err) => {
                console.error(err);
            });

        // fetching all classes
        getAllSubjects(page, rowLimit).then((res) => {
            console.log('Subjects', res);
            if (res.status) {
                //setting the fetched classes into state variable
                setSubjectData(res.results.data);
            }
        })
            .catch((err) => {
                console.error(err);
            });
    }, [])

    //opens up the delete modal for deleting the Course
    function openDeleteAlertModal(id, index) {
        console.log(id, index)

        setCourseId(id);
        setRowId(index)
        setModalMode('delete');
        setModalTitle('Delete the Course?');
        setInfo('All the details of the Course will be removed from the Platform');
        setModalAlertTitle(true)
    }

    //function to change the status of the Course to blocked!
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

    //sets the filter data to null
    function resetFilterData() {
        setSearch(null);
        setFilterDateFrom(null);
        setFilterDateTo(null);
        setFilterStatus(null);
        setFilterLoader(false);
    }

    //function to delete the Subject from the database
    function deleteCourseProfile() {
        setActionLoader(true)
        deleteCourse(actionCouseId)
            .then((res) => {
                // console.log(res)
                if (res.status) {
                    const index = rowId;
                    //removing deleted Courses from state array 
                    const updatedRows = [...course]
                    updatedRows.splice(index, 1)
                    setCourse(updatedRows);
                    setModalContent('Course Deleted successfully!')
                    setModalAlertTitle(false);
                    setCompletionModal(true);
                    setActionLoader(false)
                }
            })
            .catch((err) => {
                console.error(err)
            })
            console.log('Course side check',deleteCourseProfile)
    }

    //function to confirm the filter changes
    function applyFilters() {
        setFilterLoader(true)

    }

    //returns the created date of the record of the table
    function renderDate(date) {
        const newDate = new Date(date);
        const returnDate = months[newDate.getMonth()] + ' ' + newDate.getDate() + ' ' + newDate.getFullYear();
        return returnDate;
    }

    // function for pagination
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

    return (
        <>


            {/* <div className="container" style={{overflowY: 'scroll'}}> */}
            <h5 className="mt-3 txt-5282F0 fw-bold">Courses Management</h5>
            {/* <hr className="mt-4" /> */}
            <div className="d-flex align-items-center mt-3">
                <Card className="w-100">
                    <CardContent className="pageHeaderCard">
                        <div className='row'>
                            <div className='col-lg-6 col-md-8 col-sm-4 d-flex justify-content-start'>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Search by name"
                                    variant="outlined"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button variant="contained"
                                    // opens up the filter modal onClick 
                                    sx={{ p: 1, mx: 1 }}
                                    onClick={() => setFilterModal(true)}
                                >
                                    <BsSortDownAlt size={20} />
                                </Button>
                            </div>
                            <div className='col-lg-6 col-md-4 d-flex justify-content-end'>
                                <Button variant="contained" className="btn btn-primary me-3"
                                    onClick={() => navigate('/dashboard/courses/addCourse')}
                                >
                                    <i class="fas fa-plus-circle"></i>
                                    &nbsp;Add New Course</Button>
                                <Button variant="contained" className="" >Export</Button>
                            </div>
                        </div>

                        <div>
                            {/* <div className="row" style={{ marginBottom: 10, marginLeft: 50 }}>
                            <div className="col-lg-5 col-sm-6 col-12">
                            </div>
                            <div className="col-lg-3 col-md-2 col-6 ">
                            </div>
                            <div className="col-lg-4 col-md-4 col-12">
                                <Button variant="contained" className="btn btn-primary py-2 px-5 me-3"
                                    onClick={() => navigate('/dashboard/courses/addCourse')}
                                >
                                    <i class="fas fa-plus-circle"></i>
                                    &nbsp;Add New Course</Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-sm-6 col-12">
                                <InputGroup className="mb-3" >
                                    <FormControl
                                        placeholder="Search by name"
                                        aria-label="Search"
                                        aria-describedby="basic-addon1"
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Search by name"
                                    variant="outlined"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                </InputGroup>
                            </div>
                            <div className="col-lg-4 col-md-2 col-6 ">
                                <Button variant="contained"
                                    // opens up the filter modal onClick 
                                    sx={{ p: 1, mr: 1 }}
                                    onClick={() => setFilterModal(true)}
                                >
                                    <BsSortDownAlt size={20} />
                                </Button>
                            </div>
                            <div className="col-lg-2 col-md-2 col-6 ">
                                <Button variant="contained" className="py-2 px-5 me-3" >Export</Button>
                            </div>
                        </div> */}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="row px-3 mt-3 materialTable">
                {/* material table for displaying Subject details  */}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableCell>S.No.</TableCell>
                            <TableCell></TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell >Added On</TableCell>
                            <TableCell >Board Name</TableCell>
                            <TableCell >Qualification Name</TableCell>
                            <TableCell >Status</TableCell>
                            <TableCell >Action</TableCell>
                        </TableHead>
                        <TableBody>
                            {course.map((row, index) => <SingleCourseRow changeCourseStatus={changeCourseStatus} row={row} index={index} openDeleteAlertModal={openDeleteAlertModal} />
                                    // {console.log('single course',row )                            
                                )}
                                    
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="px-3 mt-3 w-100 d-flex justify-content-end">
                <TablePagination

                    rowsPerPageOptions={[5, 10, 25]}
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
            {/* </div> */}

            {/* Modal for delete or blocking confirmation */}
            <Modal
                open={modalAlertTitle}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onClose={() => setModalAlertTitle(false)}
            >
                <Box sx={modalStyle}>
                    <BootstrapModal.Header className="clr-primary-400 py-2">
                        {/* <BootstrapModal.Title id="contained-Bootstrapmodal-title-vcenter" className="text-center"> */}

                        <Grid container>
                            <Grid item xs={11} lg={11} md={11} sm={11}>
                                <Typography variant="h6">
                                    {modalTitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={1} lg={1} md={1}>
                                <Button onClick={() => setModalAlertTitle(false)} >
                                    <CloseIcon />
                                </Button>
                            </Grid>
                        </Grid>


                        {/* </BootstrapModal.Title> */}
                    </BootstrapModal.Header>
                    <BootstrapModal.Body>
                        <div className="text-center txt-5282F0 my-4">
                            <p>Are you sure to {modalMode} this Course?</p>
                            <p><i className="fas fa-info-circle"></i> {info}</p>
                        </div>
                        <div className="text-center mt-4 pb-3">
                            <Button variant="outlined" className="btn btn-outline-secondary px-5"
                                onClick={() => setModalAlertTitle(false)}
                            >Cancel</Button>
                            &emsp;
                            {actionLodaer ? (
                                <Button variant="outlined" className="btn btn-primary px-5" >
                                    <CircularProgress size={20} />
                                </Button>
                            ) : (
                                <Button variant="contained" className="btn btn-primary px-5"
                                    onClick={() => { modalMode == 'delete' ? (deleteCourseProfile()) : (changeCourseStatus()) }}
                                >Confirm</Button>
                            )}

                        </div>
                    </BootstrapModal.Body>
                </Box>
            </Modal>

            {/* Modal for successful deletion and block */}
            <Modal
                show={completionModal}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Box style={modalStyle}>
                    <BootstrapModal.Header className="clr-primary-400 py-2">
                        {/* <Modal.Title id="contained-modal-title-vcenter" className="text-center"> */}

                        <Grid container>
                            <Grid item xs={11} lg={11} md={11} sm={11}>
                                <Typography variant="h6">
                                    Updated Courses!
                                </Typography>
                            </Grid>
                            <Grid item xs={1} lg={1} md={1}>
                                <Button onClick={() => setModalAlertTitle(false)} >
                                    <CloseIcon />
                                </Button>
                            </Grid>
                        </Grid>

                        {/* </Modal.Title> */}
                    </BootstrapModal.Header>
                    <BootstrapModal.Body>
                        <div className="text-center txt-5282F0 my-4">
                            <p>{modalContent}</p>
                        </div>
                        <div className="text-center mt-4 pb-3">
                            <button className="btn btn-primary px-5"
                                onClick={() => setCompletionModal(false)}
                            >OK</button>
                        </div>
                    </BootstrapModal.Body>
                </Box>
            </Modal>

            {/* Modal for applying filter */}
            <Modal
                open={filterModal}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onClose={() => setFilterModal(false)}
            >
                <Box sx={modalStyle}>
                    <BootstrapModal.Header>
                        {/* <BootstrapModal.Title id="contained-Bootstrapmodal-title-vcenter" className="text-center"> */}
                        <Grid container>
                            <Grid item xs={11} lg={11} md={11} sm={11}>
                                <Typography variant="h6">
                                    Apply Filter
                                </Typography>
                            </Grid>
                            <Grid item xs={1} lg={1} md={1}>
                                <Button onClick={() => setFilterModal(false)} >
                                    <CloseIcon />
                                </Button>
                            </Grid>
                        </Grid>

                        {/* </BootstrapModal.Title> */}
                    </BootstrapModal.Header>
                    <BootstrapModal.Body>
                        <div className="row labelColor">
                            <label>Added Date</label>
                            <div className="col-lg-6 col-sm-6 col-12">
                                <input type="date" className="form-control txt-5282F0" placeholder="From" onChange={(e) => setFilterDateFrom(e.target.value)} value={filterDateFrom} />
                            </div>
                            <div className="col-lg-6 col-sm-6 col-12">
                                <input type="date" className="form-control txt-5282F0" onChange={(e) => setFilterDateTo(e.target.value)} value={filterDateTo} />
                            </div>
                            <div className="row" style={{ marginTop: 10 }}>
                                <div className="col-lg-12 col-sm-12 col-12">
                                    <label>Board</label>
                                    <select className="form-control txt-5282F0" onChange={(e) => setBoardID(e.target.value)} value={boardID}>
                                        <option value={null}>Board</option>
                                        {boardData.map((item, index) => (
                                            <option value={item._id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: 10 }}>
                                <div className="col-lg-12 col-sm-12 col-12">
                                    <label>Subject</label>
                                    <select className="form-control txt-5282F0" onChange={(e) => setSubjectID(e.target.value)} value={classesID}>
                                        <option value={null}>Subject</option>
                                        {subjectData.map((item, index) => (
                                            <option value={item._id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: 10 }}>
                                <div className="col-lg-12 col-sm-12 col-12">
                                    <label>Status</label>
                                    <select className="form-control txt-5282F0" onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
                                        <option value={null}>Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="text-center txt-5282F0 my-4">

                        </div>
                        <div className="text-center mt-4 pb-3">
                            <Button variant="outlined" className="btn btn-outline-secondary px-5"
                                // onClick={()=>resetFilterData()}
                                onClick={() => resetFilterData()}
                            >Reset </Button>
                            &emsp;
                            {filterLoader ? (
                                <Button variant="outlined" className="btn btn-primary px-5" >
                                    <Loader
                                        type="Puff"
                                        color="white"
                                        height={30}
                                        width={30}
                                    />
                                </Button>
                            ) : (
                                <Button variant="contained" className="btn btn-primary px-5"
                                    onClick={() => { applyFilters() }}
                                >Confirm</Button>
                            )}

                        </div>
                    </BootstrapModal.Body>
                </Box>
            </Modal>

        </>
    )
}