//page for all Subjects listing!
import TablePagination from '@mui/material/TablePagination';
import React, { useState, useEffect, forwardRef, useRef } from 'react'
// import { Modal, Card, InputGroup, FormControl, Table } from 'react-bootstrap'
// import ModalHeader from 'react-bootstrap/ModalHeader'
import { useSelector } from 'react-redux'
import { Link, useNavigate, Redirect, useParams } from 'react-router-dom'
import { updatePassword, changeName, uploadImage } from '../../api/Profile/Profile'
import Loader from "react-loader-spinner";
import { apiUrl } from '../../config';



import { BsSortDownAlt, BsFillTrashFill, BiBlock } from "react-icons/bs";

import MaterialTable from 'material-table'
import { fetchSubjects, editSubject, deleteSubject, getSubjectByFilter } from "../../api/Subject/Subject"
import { materialTableIcons } from '../../config';
import { deleteTopic, editTopic, fetchTopics, getAllTopics, getTopicByFilter, getCourseTopics, getCourseAllTopics } from '../../api/Topic/Topic'
import { TableFooter, TableRow } from '@mui/material'
import { dataLimit, modalStyle } from '../../config';

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
import SingleTopicRow from './SingleTopicRow';


export default function Topics(props) {
    const { id } = useParams();
    const courseID = id;
    const tableIcons = materialTableIcons
    //setting topics data into a variable
    const [topics, setTopics] = useState([]);
    const [notopic, setNoTopics] = useState(false);
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
    const [actionTopicId, setTopicId] = useState();
    const [subjectName, setSubjectName] = useState('');

    //unblock or block vairbale 
    const [subjectStatus, setSubjectStatus] = useState(true);

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

    const [page, setPage] = useState(1);
    const [rowLimit, setRowLimit] = useState(dataLimit)
    const [sortByDate, setSortByDate] = useState();

    //sets the loader of apply changes in filter modal
    const [filterLoader, setFilterLoader] = useState(false);

    //sets the total pages 
    const [totalPages, setTotalPages] = useState();

    const navigate = useNavigate();

    // useEffect(() => {
    //     fetch(`${apiUrl}/topic/getCourseTopics/${id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data.topic);
    //             setTopics(data?.topic)
    //         })
    // }, [])
    // useEffect(() => {
    //     getCourseTopics(id)
    //         .then((res) => {
    //             console.log('hello', res.topic);
    //             if (res.status) {
    //                 setTopics(res.topic)
    //             }
    //             setFilterLoader(false);
    //             setTableDataLoading(false);
    //             setFilterModal(false);
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             setFilterLoader(false)
    //         })
    // }, [id])


    useEffect(() => {
        if (filterLoader || search != null) {
            // if(search!=null || search.length > 0) {
            //setting the loader for table
            setTableDataLoading(true);
            //calling filter functions with required parameters
            console.log(filterDateFrom)
            console.log('hello', search);
            getTopicByFilter(search, filterDateFrom, filterDateTo, sortByDate, filterStatus)
                .then((res) => {
                    console.log("res", res)
                    if (res.status) {
                        setTopics(res.results.data);
                        setTotalPages(res.results.totalPages)
                    }
                    else {
                        setTopics([])
                    }
                    setFilterLoader(false)
                    setTableDataLoading(false);
                    setFilterModal(false);
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
        setNoTopics(false)
        setTableDataLoading(true)
        getCourseAllTopics(courseID).then((res) => {
            console.log('res', res);
            if (res.status) {
                //setting the fetched Topics into state variable
                setTopics(res.data);
                // setTotalPages(res.totalPages)
            }
            else {
                //setting no Topic found variable true 
                setNoTopics(true);
            }
            setTableDataLoading(false)
        })
            .catch((err) => {
                console.error(err);
            });

    }, [page, rowLimit])

    //opens up the delete modal for deleting the subject
    function openDeleteAlertModal(id, index) {
        setTopicId(id);
        setRowId(index)
        setModalMode('delete');
        setModalTitle('Delete the Topic?');
        setInfo('All the details of the Topic will be removed from the Platform');
        setModalAlertTitle(true)
    }

    //function to change the status of the Subject to blocked!
    function changeTopicStatus(rowData, index, status) {
        editTopic(rowData._id, rowData.name, rowData.description, status)
            .then((res => {
                // console.log('res',res);
                if (res.status) {
                    // const index = rowData.tableData.id;
                    //updating subject status in state array
                    const updatedRows = [...topics];
                    updatedRows[index].status = status;
                    setTopics(updatedRows);
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
    function deleteTopicProfile() {
        setActionLoader(true)
        deleteTopic(actionTopicId, courseID)
            .then((res) => {
                // console.log(res)
                if (res.status) {
                    const index = rowId;
                    //removing deleted Subject from state array 
                    const updatedRows = [...topics]
                    updatedRows.splice(index, 1)
                    setTopics(updatedRows);
                    setModalContent('Topic Deleted successfully!')
                    setModalAlertTitle(false);
                    setCompletionModal(true);
                    setActionLoader(false)
                }
            })
            .catch((err) => {
                console.error(err)
            })
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
            <h5 className="mt-3 txt-5282F0 fw-bold">Topics Management</h5>
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
                                    onClick={() => navigate('/dashboard/topics/addTopic/' + courseID)}
                                >
                                    <i class="fas fa-plus-circle"></i>
                                    &nbsp;Add New Topics</Button>
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
                                    onClick={() => navigate('/dashboard/topics/addTopic')}
                                >
                                    <i class="fas fa-plus-circle"></i>
                                    &nbsp;Add New Topics</Button>
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
                            <TableCell >Status</TableCell>
                            <TableCell >Action</TableCell>
                        </TableHead>
                        <TableBody>
                            {topics?.map((row, index) => <SingleTopicRow courseID={courseID} changeTopicStatus={changeTopicStatus} row={row} key={index} openDeleteAlertModal={openDeleteAlertModal} />
                            )}

                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <MaterialTable
                    columns={[
                        {
                            title: 'S No.',
                            field: 'Serial',
                            render: rowData => <>{rowData.tableData.id + 1}</>
                        },
                        {
                            title: 'Name',
                            field: 'name',
                            render: rowData => <>{rowData.name}</>
                        },
                        {
                            title: 'Added On',
                            field: 'createdAt',
                            render: rowData => <>{renderDate(rowData.createdAt)}</>
                        },
                        {
                            title: 'Status',
                            render: rowData => <>{rowData.status == 'inactive' ? ('In Active') : ('Active')}</>
                        },
                        {
                            title: 'Action',
                            render: rowData => <>
                                {rowData.status == 'inactive' ? (
                                    <a href="javascript:void(0)"
                                        onClick={() => changeTopicStatus(rowData, 'active')}
                                    >
                                        <i class="fas fa-toggle-off txt-5282F0"></i>
                                    </a>
                                ) : (
                                    <a href="javascript:void(0)"
                                        onClick={() => changeTopicStatus(rowData, 'inactive')}>
                                        <i class="fas fa-toggle-on txt-5282F0"></i>
                                    </a>
                                )}
                                &emsp;
                                <a href="javascript:void(0)"
                                    onClick={() => navigate('/app/editTopic/' + rowData._id + '/' + rowData.status + '/' + rowData.name)}>
                                    <i className="fas fa-pen txt-5282F0"></i>
                                </a>
                                &emsp;
                                <a href="javascript:void(0)" onClick={() => openDeleteAlertModal(rowData)}>
                                    <i className="fas fa-trash txt-5282F0"></i>
                                </a>
                            </>
                        },
                    ]}
                    data={topics}
                    title="topics"
                    isLoading={tableDataLoading}
                    options={{
                        sorting: true,
                        exportButton: true,
                        toolbar: true,
                        showTitle: false,
                        search: false,
                        paging:false
                    }}
                    icons={tableIcons}
                /> */}
            </div>
            {/* <div className="px-3 mt-3 w-100 d-flex justify-content-end">
                <TableFooter>
                    <TableRow>
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
                    </TableRow>
                </TableFooter>
            </div> */}
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
                            <p>Are you sure to {modalMode} this Topic?</p>
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
                                    onClick={() => { modalMode == 'delete' ? (deleteTopicProfile()) : (changeTopicStatus()) }}
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
                                    Updated Topics!
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
                aria-labelledby="contained-modal-title-vcenter"
                onClose={() => setFilterModal(false)}

            >
                <Box sx={modalStyle}>
                    <BootstrapModal.Header className="clr-primary-400 py-2" >
                        {/* <BootstrapModal.Title id="contained-modal-title-vcenter" className="text-center"> */}
                        {/* <Box> */}
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
                        {/* </Box> */}
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
                            <Grid container>
                                <Grid item xs={5} lg={5} md={5} sm={5}>
                                    <Button variant="outlined" className=" px-5"
                                        // onClick={()=>resetFilterData()}
                                        onClick={() => resetFilterData()}
                                    >Reset </Button>
                                </Grid>
                                &emsp;
                                <Grid item xs={5} lg={5} md={5} sm={5}>
                                    {filterLoader ? (
                                        <Button variant="outlined" className=" px-5" >

                                            <CircularProgress size={20} />
                                        </Button>
                                    ) : (
                                        <Button variant="contained" className=" px-5"
                                            onClick={() => { applyFilters() }}
                                        >Confirm</Button>
                                    )}
                                </Grid>
                            </Grid>
                        </div>
                    </BootstrapModal.Body>
                </Box>
            </Modal>

        </>
    )
}