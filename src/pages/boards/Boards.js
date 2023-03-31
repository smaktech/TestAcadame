//page for all boards listing!
import TablePagination from '@mui/material/TablePagination';
import React, { useState, useEffect, forwardRef, useRef } from 'react'
// import { Modal, Card, InputGroup, FormControl, Table } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useSelector } from 'react-redux'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import { updatePassword, changeName, uploadImage } from '../../api/Profile/Profile'
import Loader from "react-loader-spinner";



import { BsSortDownAlt, BsFillTrashFill, BiBlock } from "react-icons/bs";

import MaterialTable from 'material-table'
import { fetchBoards, editBoards, deleteBoards, getBoardByFilter, getAllBoard } from "../../api/Boards/Boards"
import { materialTableIcons } from '../../config';
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
import SingleBoardRow from './SIngleBoardRow';

export default function Boards(props) {
    const tableIcons = materialTableIcons
    //setting boards data into a variable
    const [boards, setboards] = useState([]);
    const [noboards, setNoboards] = useState(false);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //this is the modal title for blocking or deleting modal
    const [modalTitle, setModalTitle] = useState('');

    //sets the info inside the modal
    const [info, setInfo] = useState('')

    //table data loading indicator
    const [tableDataLoading, setTableDataLoading] = useState(true)

    //const for setting the mode for which the alert modal is opened ? ('delete'):('block')
    const [modalMode, setModalMode] = useState('')

    //modal visible status for alert modal for deleting or blocking
    const [modalAlertTitle, setModalAlertTitle] = useState(false);

    //modal visible status for success of deleting or blocking
    const [completionModal, setCompletionModal] = useState(false);

    //sets the content of the success Modal!
    const [modalContent, setModalContent] = useState('');

    //sets the id and name of the Boards who is blocked or deleted
    const [actionBoardsId, setBoardsId] = useState();
    const [BoardsName, setBoardsName] = useState('');

    //unblock or block vairbale 
    const [boardstatus, setboardstatus] = useState(true);

    //sets the row data where the action took place
    const [rowId, setRowId] = useState()

    //loader in the alert table on confirm button
    const [actionLodaer, setActionLoader] = useState(false);

    const [filterModal, setFilterModal] = useState(false);

    //sets the user search string into state
    const [search, setSearch] = useState();

    //sets the user picked date from the apply filter modal
    const [filterDateFrom, setFilterDateFrom] = useState();
    const [filterDateTo, setFilterDateTo] = useState();
    const [filterStatus, setFilterStatus] = useState();



    const [sortByDate, setSortByDate] = useState();

    //sets the loader of apply changes in filter modal
    const [filterLoader, setFilterLoader] = useState(false);

    const [page, setPage] = useState(1);
    const [rowLimit, setRowLimit] = useState(dataLimit)
    const [totalPages, setTotalPages] = useState();
    const navigate = useNavigate();

    const materialTableRef = useRef()

    //useEffect for calling the function for filter onchange of search or filter data continue button
    useEffect(() => {

        if (filterLoader || search != null) {
            // if(search!=null || search.length > 0) {
            //setting the loader for table
            setTableDataLoading(true);
            //calling filter functions with required parameters
            getBoardByFilter(search, filterStatus, filterDateFrom, filterDateTo)
                .then((res) => {
                    if (res.status) {
                        setboards(res.results.data);
                        setTotalPages(res.results.totalPages)
                    }
                    else {
                        setboards([])
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


    //sets the filter data to null
    function resetFilterData() {
        setSearch(null);
        setFilterDateFrom(null);
        setFilterDateTo(null);
        setFilterStatus(null);
        setFilterLoader(false);
    }

    //function to confirm the filter changes
    function applyFilters() {
        setFilterLoader(true)

    }


    useEffect(() => {
        setNoboards(false)
        setTableDataLoading(true)
        getAllBoard(page, rowLimit).then((res) => {
            console.log('res', res);
            if (res.status) {
                //setting the fetched Boards into state variable
                setboards(res.results.data);
                setTotalPages(res.results.totalPages)
            }
            else {
                //setting no Boards found variable true 
                setNoboards(true);
            }
            setTableDataLoading(false)
        })
            .catch((err) => {
                console.error(err);
            });

    }, [page, rowLimit])

    function openDeleteAlertModal(id, index) {
        setBoardsId(id);
        setRowId(index)
        setModalMode('delete');
        setModalTitle('Delete the Boards?');
        setInfo('All the details of the Boards will be removed from the Platform');
        setModalAlertTitle(true)
    }

    //function to change the status of the Boards to blocked!
    function changeboardstatus(id, name, index, status) {
        editBoards(id, name, status)
            .then((res => {
                // console.log('res',res);
                if (res.status) {
                    // const index = rowData.tableData.id;
                    //updating Boards status in state array
                    const updatedRows = [...boards];
                    updatedRows[index].status = status;
                    setboards(updatedRows);
                }
                else {
                    alert("error occured")
                }
            }))
            .catch((err => {
                console.log('err', err);
            }))
    }

    //function to delete the Boards from the database
    function deleteBoardsProfile() {
        setActionLoader(true)
        deleteBoards(actionBoardsId)
            .then((res) => {
                // console.log(res)
                if (res.status) {
                    const index = rowId;
                    //removing deleted Boards from state array 
                    const updatedRows = [...boards]
                    updatedRows.splice(index, 1)
                    setboards(updatedRows);
                    setModalContent('Boards Deleted successfully!')
                    setModalAlertTitle(false);
                    setCompletionModal(true);
                    setActionLoader(false)
                }
            })
            .catch((err) => {
                console.error(err)
            })
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
            <h5 className="mt-3 txt-5282F0 fw-bold">Boards Management</h5>
            {/* <hr className="mt-4" /> */}
            <div className="d-flex align-items-center mt-3 ">
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
                                    sx={{ p: 1, mr: 1 }}
                                    onClick={() => setFilterModal(true)}
                                >
                                    <BsSortDownAlt size={20} />
                                </Button>
                            </div>
                            <div className='col-lg-6 col-md-4 d-flex justify-content-end'>
                                <Button variant="contained" className="btn btn-primary me-3"
                                    onClick={() => navigate('/dashboard/boards/addBoard')}
                                >
                                    <i class="fas fa-plus-circle"></i>
                                    &nbsp;Add New Board</Button>
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
                                    onClick={() => navigate('/dashboard/boards/addBoard')}
                                >
                                    <i class="fas fa-plus-circle"></i>
                                    &nbsp;Add New Board</Button>
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
                {/* material table for displaying Boards details  */}

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
                            {boards.map((row, index) => <SingleBoardRow changeBoardStatus={changeboardstatus} row={row} index={index} openDeleteAlertModal={openDeleteAlertModal} />
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
                                        onClick={() => changeboardstatus(rowData, 'active')}
                                    >
                                        <i class="fas fa-toggle-off txt-5282F0"></i>
                                    </a>
                                ) : (
                                    <a href="javascript:void(0)"
                                        onClick={() => changeboardstatus(rowData, 'inactive')}>
                                        <i class="fas fa-toggle-on txt-5282F0"></i>
                                    </a>
                                )}
                                &emsp;
                                <a href="javascript:void(0)"
                                    onClick={() => navigate('/app/editBoard/' + rowData._id + '/' + rowData.status + '/' + rowData.name)}>
                                    <i className="fas fa-pen txt-5282F0"></i>
                                </a>
                                &emsp;
                                <a href="javascript:void(0)" onClick={() => openDeleteAlertModal(rowData)}>
                                    <i className="fas fa-trash txt-5282F0"></i>
                                </a>
                            </>
                        },
                    ]}
                    data={boards}
                    isLoading={tableDataLoading}
                    title="boards"
                    
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
            <div className="px-3 mt-3 w-100 d-flex justify-content-end">
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
                            <p>Are you sure to {modalMode} this Board?</p>
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
                                    onClick={() => { modalMode == 'delete' ? (deleteBoardsProfile()) : (changeboardstatus()) }}
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
                                    Updated Boards!
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