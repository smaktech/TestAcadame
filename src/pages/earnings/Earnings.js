//page for all Subjects listing!
import TablePagination from '@mui/material/TablePagination';
import React, { useState, useEffect, forwardRef, useRef } from 'react'
// import {  InputGroup, FormControl } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useSelector } from 'react-redux'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import { updatePassword, changeName, uploadImage } from '../../api/Profile/Profile'
import Loader from "react-loader-spinner";



import { BsSortDownAlt, BsFillTrashFill, BiBlock } from "react-icons/bs";

import MaterialTable from 'material-table'
import { materialTableIcons, modalStyle } from '../../config';
import { deleteResourse, editResourse, getAllResourse, getResourseByFilter } from '../../api/Resourses/Resourses'
import { getAllEarnings, getEarningsByFilter } from '../../api/Earnings/Earnings'
import { dataLimit, imageBaseUrl } from '../../config'
// import MultiSlider from '../../Components/Slider/MultiSlider'


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

import Slider from '@mui/material/Slider';
import { Button } from '@mui/material';
import SingleEarningRow from './SingleEarningRow';

export default function Earnings(props) {
    const tableIcons = materialTableIcons
    //setting earning data into a variable
    const [earnings, setEarnings] = useState([]);
    const [noEarnings, setNoEarnings] = useState(false);
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

    //loader in the alert table on confirm Button
    const [actionLodaer, setActionLoader] = useState(false);

    //sets the visibility of the filter modal 
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

    //sets the range of amount
    const [minValue, set_minValue] = useState(0);
    const [maxValue, set_maxValue] = useState(100);

    const [page, setPage] = useState(1);
    const [rowLimit, setRowLimit] = useState(dataLimit)
    const [totalPages, setTotalPages] = useState();
    const [sliderValue, setSliderValue] = useState([0, 100])
    const navigate = useNavigate();


    useEffect(() => {
        if (filterLoader || search != null) {
            // if(search!=null || search.length > 0) {
            //setting the loader for table
            setTableDataLoading(true);
            //calling filter functions with required parameters
            console.log(minValue, maxValue)
            getEarningsByFilter(search, filterStatus, filterDateFrom, filterDateTo, minValue, maxValue, sortByDate)
                .then((res) => {
                    console.log("res", res)
                    if (res.status) {
                        setEarnings(res.results.data);
                        setTotalPages(res.results.totalPages)
                    }
                    else {
                        setEarnings([])
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
        setNoEarnings(false)
        setTableDataLoading(true)
        getAllEarnings(page, rowLimit).then((res) => {
            console.log('res', res);
            if (res.status) {
                //setting the fetched Topics into state variable
                setEarnings(res.results.data);
                setTotalPages(res.results.totalPages)
            }
            else {
                //setting no earnigs found variable true 
                setNoEarnings(true);
            }
            setTableDataLoading(false)
        })
            .catch((err) => {
                console.error(err);
            });

    }, [page, rowLimit])



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

    const handleChange = (event, newValue) => {
        // setValue(newValue);
        set_minValue(newValue[0])
        set_maxValue(newValue[1])
        setSliderValue(newValue)
    };

    return (
        <>


            {/* <div className="container" style={{overflowY: 'scroll'}}> */}
            <h5 className="mt-3 txt-5282F0 fw-bold">Earnings Management</h5>
            <div className="d-flex align-items-center mt-3">
                <Card className="col-5 col-md-5 col-lg-3 shadow-lg rounded">
                    <CardContent>
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-4 col-md-4 col-12">
                                <img src="/Assets/money.png" />
                            </div>
                            <div className="col-lg-8 col-md-8 col-12">
                                <h4 className="mt-3 txt-5282F0 fw-bold">$1000</h4>
                                <h6 className="mt-3 txt-5282F0 fw-bold ">Total Payment <br />Received</h6>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
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
                                // onClick={() => navigate('/dashboard/resources/addResource')}
                                >
                                    <i class="fas fa-plus-circle"></i>
                                    &nbsp;Add New Transaction</Button>
                                <Button variant="contained" className="" >Export</Button>
                            </div>
                        </div>

                        <div>
                            {/* <div className="row">
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
                {/* material table for displaying Resourse details  */}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableCell>S.No.</TableCell>
                            <TableCell >User Name</TableCell>
                            <TableCell >Transaction Id</TableCell>
                            <TableCell >Transaction Date</TableCell>
                            <TableCell >Status</TableCell>
                            <TableCell >Price</TableCell>
                        </TableHead>
                        <TableBody>
                            {earnings.map((row, index) => <SingleEarningRow row={row} index={index} />)}

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
                            title: 'User Name',
                            field: 'userName',
                            render: rowData => <>
                                <img src={rowData.profileImage ? (imageBaseUrl + rowData.profileImage) : ('/Assets/userProfile.png')} height={30} style={{ borderRadius: '50%' }} />
                                {rowData.userID.name}
                            </>
                        },
                        {
                            title: 'Transaction Id',
                            field: 'transactionID',
                            render: rowData => <>{rowData.transactionID}</>
                        },
                        {
                            title: 'Transaction Date',
                            field: 'transactionDate',
                            render: rowData => <>{renderDate(rowData.transactionDate)}</>
                        },
                        {
                            title: 'Status',
                            render: rowData => <>{rowData.status == true ? ('Completed') : ('Cancelled')}</>
                        },
                        {
                            title: 'Price',
                            render: rowData => <>{rowData.amount}</>
                        },
                    ]}
                    data={earnings}
                    title="earnings"
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


            {/* Modal for applying filter */}
            <Modal
                open={filterModal}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onClose={() => setFilterModal(false)}
            >
                <Box sx={modalStyle}>
                    <BootstrapModal.Header className="clr-primary-400 py-2">
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
                            <label>Transaction Date</label>
                            <div className="col-lg-6 col-sm-6 col-12">
                                <input type="date" className="form-control txt-5282F0" placeholder="From" onChange={(e) => setFilterDateFrom(e.target.value)} value={filterDateFrom} />
                            </div>
                            <div className="col-lg-6 col-sm-6 col-12">
                                <input type="date" className="form-control txt-5282F0" onChange={(e) => setFilterDateTo(e.target.value)} value={filterDateTo} />
                            </div>
                            <div className="row" style={{ marginTop: 10 }}>
                                <div className="col-lg-12 col-sm-12 col-12">
                                    <label>Amount of Transaction</label>
                                    <h5>$ {minValue} - {maxValue}</h5>
                                    {/* <MultiSlider min={0} max={30000} set_maxValue={set_maxValue} set_minValue={set_minValue}/> */}
                                    <Slider
                                        getAriaLabel={() => 'Amount of Transaction'}
                                        value={sliderValue}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                    // getAriaValueText={valuetext}
                                    />
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: 10 }}>
                                <div className="col-lg-12 col-sm-12 col-12">
                                    <label>Status</label>
                                    <select className="form-control txt-5282F0" onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
                                        <option>Status</option>
                                        <option value={true}>Completed</option>
                                        <option value={false}>Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="text-center txt-5282F0 my-4">

                        </div>
                        <div className="text-center mt-4 pb-3">
                            <Button className="btn btn-outline-secondary px-5"
                                // onClick={()=>resetFilterData()}
                                onClick={() => resetFilterData()}
                            >Reset </Button>
                            &emsp;
                            {filterLoader ? (
                                <Button className="btn btn-primary px-5" >
                                    <CircularProgress size={20} />
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