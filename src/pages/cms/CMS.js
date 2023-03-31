//page for all users listing!
import TablePagination from '@mui/material/TablePagination';
import React, { useState, useEffect, forwardRef, useRef } from 'react'
import { Modal as BootstrapModal,  InputGroup, FormControl, Nav, Row, Col } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useSelector } from 'react-redux'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import { updatePassword, changeName, uploadImage } from '../../api/Profile/Profile'
import Loader from "react-loader-spinner";
  
 
 
import { BsSortDownAlt, BsFillTrashFill, BiBlock } from "react-icons/bs";

import MaterialTable from 'material-table'
import { fetchUser, changeStatus, deleteUser } from "../../api/Users/Users"
import { dataLimit, imageBaseUrl, modalStyle } from '../../config';
import { materialTableIcons } from '../../config';
import { createFAQ, deleteFAQ, editFAQ, fetchCMS, getAllFQA } from '../../api/CMS/CMS'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SingleFaqRow from './SingleFaqRow';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead'; 
import { Button } from '@mui/material';

import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';

import CloseIcon from '@mui/icons-material/Close';
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

export default function CMS(props) {
    const tableIcons = materialTableIcons
    //setting cms data into a variable
    const [cms, setCms] = useState([]);

    //setting faq data into a variable
    const [faq, setFqa] = useState([]);
    const [isFQA, setIsFQA] = useState(false)

    const [noUsers, setNoUsers] = useState(false);
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

    //sets the id of the user who is blocked or deleted
    const [actionFAQId, setFAQId] = useState();

    //unblock or block vairbale 
    const [userStatus, setUserStatus] = useState(true);

    //sets the row data where the action took place
    const [rowId, setRowId] = useState()

    //loader in the alert table on confirm button
    const [actionLodaer, setActionLoader] = useState(false);

    const [filterModal, setFilterModal] = useState(false);

    //sets the user picked date from the apply filter modal
    const [ques, setQues] = useState();
    const [ans, setAns] = useState();

    const [sortByDate, setSortByDate] = useState();

    //sets the loader of apply changes in filter modal
    const [filterLoader, setFilterLoader] = useState(false);

    const [modalVisible, setModalVisible] = useState(false)

    //sets and display the line in the success modal!
    const [modalLine1, setModalLine1] = useState('');
    const [modalLine2, setModalLine2] = useState('')

    //sets the loader for add subject button
    const [addLoader, setAddLoader] = useState(false)

    //sets the loader for edit subject button
    const [editLoader, setEditLoader] = useState(false)

    //sets the mode  for add and edit
    const [mode, setMode] = useState('add')

    //sets the mode  for add and edit
    const [FAQID, setFAQID] = useState()

    //shows the error when users try to add FAQ without name
    const [errorMessage, setErrorMessage] = useState(false);
    const [error, showError] = useState(false);


    const [page, setPage] = useState(1);
    const [rowLimit, setRowLimit] = useState(dataLimit)
    const [totalPages, setTotalPages] = useState();

    const [tab, setTab] = React.useState(0);

    const handleChange = (event, newValue) => {
      setTab(newValue);
    };
    const navigate =  useNavigate();

    const materialTableRef = useRef()
    useEffect(() => {
        setNoUsers(false)
        setEditLoader(true)

        fetchCMS().then((res) => {
            console.log('res', res);
            if (res.status) {
                //setting the fetched user into state variable
                setCms(res.cms);
            }
            else {
                //setting no user found variable true 
                setNoUsers(true);
            }
            setTableDataLoading(false);
            setEditLoader(false)
        })
            .catch((err) => {
                console.error(err);
            });

    }, [])

    useEffect(() => {
        //Fetching All FQA
        getAllFQA(page, rowLimit).then((res) => {
            console.log('FAQ', res);
            setTableDataLoading(true)
            if (res.status) {
                //setting the fetched faq into state variable
                setFqa(res.results.data);
                setTotalPages(res.results.totalPages)
            }
            else {
                //setting no faq found variable true 
                setNoUsers(true);
            }
            setTableDataLoading(false);
        })
            .catch((err) => {
                console.error(err);
            });

    }, [page, rowLimit])

    function openDeleteAlertModal(id,index) {
        setFAQId(id);
        setRowId(index)
        setModalMode('delete');
        setModalTitle('Delete the Question?');
        setInfo('The Question will be removed from the Platform');
        setModalAlertTitle(true)
    }

    //sets the filter data to null
    function resetFilterData() {
        setQues(null);
        setAns(null);
        setFilterLoader(false);
    }



    //function to delete the FAQ from the database
    function deleteFAQProfile() {
        setActionLoader(true)
        deleteFAQ(actionFAQId)
            .then((res) => {
                // console.log(res)
                if (res.status) {
                    const index = rowId;
                    //removing deleted FAQ from state array 
                    const updatedRows = [...faq]
                    updatedRows.splice(index, 1)
                    setFqa(updatedRows);
                    setModalContent('Question Deleted successfully!')
                    setModalAlertTitle(false);
                    setCompletionModal(true);
                    setActionLoader(false)
                }
            })
            .catch((err) => {
                console.error(err)
            })
    }



    //adds new subject 
    function addNewFAQ() {
        setModalVisible(false);
        setAddLoader(true);
        showError(false);
        if (ques && ans != '') {
            createFAQ(ques, ans)
                .then((res) => {
                    // console.log(res);
                    if (res.status) {
                        setAddLoader(false);
                        setModalLine1('New FAQ Added');
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
            setErrorMessage('Please fill the FAQ Details');
        }
    }


    //edit the details basically the details of the existing FAQ
    function editFAQDetails() {
        setModalVisible(false);
        setEditLoader(true);
        showError(false);
        if (ques && ans != '') {
            editFAQ(FAQID, ques, ans)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        setEditLoader(false);
                        setModalLine1('FAQ has been');
                        setModalLine2('updated successfully')
                        setModalVisible(true)
                        //updating class status in state array
                        // const index = rowData.tableData.id;
                        // updatedRows[index].ques = ques;
                        // updatedRows[index].ans = ans;
                        // const updatedRows = [...faq];
                        // setFqa(updatedRows);
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
            setErrorMessage('Please fill the subject name');
        }

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

    const editFaq = (rowData) => 
    { 
        setFilterModal(true); 
        setQues(rowData.ques); 
        setAns(rowData.ans); 
        setMode('edit'); 
        setFAQID(rowData._id) 
    }

    return (
        <>


            {/* <div className="container" style={{overflowY: 'scroll'}}> */}
            <h5 className="m-4 txt-5282F0 fw-bold">CMS Management</h5>
            {/* <hr className="mt-4" /> */}
            {editLoader ? (
                <div className='w-100 py-2 px-6 me-3' style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <CircularProgress /> */}
                </div>
            ) : (
                <Box sx={{width:'100%'}}>
                    <Card>
                        <CardContent>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                
                                <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Terms & Conditions" {...a11yProps(0)} />
                                    <Tab label="About Us" {...a11yProps(1)} />
                                    <Tab label="FAQs" {...a11yProps(2)} />
                                    <Tab label="PrivacyPolicy" {...a11yProps(3)} />
                                </Tabs>
                                {/* <Tab.Container id="left-tabs-example" defaultActiveKey="TermsConditions" style={{ backgroundColor: 'yellow' }}> */}
                                    {/* <Nav variant="pills" className="flex-row justify-content-around rounded-top txt-5282F0" style={{ height: 70 }}>
                                        <Nav.Item className="mt-3 ">
                                            <Nav.Link className="borderRadius0 " eventKey="TermsConditions" onClick={() => setIsFQA(false)}>Terms & Conditions</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className="mt-3">
                                            <Nav.Link className="borderRadius0" eventKey="AboutUs" onClick={() => setIsFQA(false)}>About Us</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className="mt-3">
                                            <Nav.Link className="borderRadius0" eventKey="FAQs" onClick={() => setIsFQA(true)}>FAQs</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className="mt-3">
                                            <Nav.Link className="borderRadius0" eventKey="PrivacyPolicy" onClick={() => setIsFQA(false)}>Privacy Policy</Nav.Link>
                                        </Nav.Item>
                                    </Nav> */}
                                    <Row>
                                        <Col sm={12}>
                                            {/* <Tab.Content> */}
                                                <TabPanel value={tab} index={0}>
                                                    <div className='w-100 h-100 m-4'>
                                                        <h6>{cms.termsAndConditions}</h6>
                                                    </div>
                                                </TabPanel>
                                                <TabPanel value={tab} index={1}>
                                                    <div className='w-100 h-100 m-4'>
                                                        <h6>{cms.aboutUs}</h6>
                                                    </div>
                                                </TabPanel>
                                                <TabPanel eventKey="FAQs" value={tab} index={2}>


                                                <TableContainer>
                                                    <Table>
                                                        <TableHead>
                                                            <TableCell>S.No.</TableCell>
                                                            <TableCell >Question</TableCell>
                                                            <TableCell >Answer</TableCell> 
                                                            <TableCell >Action</TableCell>
                                                        </TableHead>  
                                                        <TableBody>
                                                        {faq.map((row,index) =><SingleFaqRow editFaq={editFaq} row={row} index={index} openDeleteAlertModal={openDeleteAlertModal}/>  
                                                        )}
                                                        
                                                        </TableBody>  
                                                    </Table>
                                                </TableContainer>
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
                                                    {/* <MaterialTable
                                                        columns={[
                                                            {
                                                                title: 'S No.',
                                                                field: 'Serial',
                                                                render: rowData => <>{rowData.tableData.id + 1}</>
                                                            },
                                                            {
                                                                title: 'Question',
                                                                field: 'Question',
                                                                render: rowData => <>{rowData.ques}</>
                                                            },
                                                            {
                                                                title: 'Answer',
                                                                field: 'Answer',
                                                                render: rowData => <>{rowData.ans}</>
                                                            },
                                                            {
                                                                title: 'Action',
                                                                render: rowData =>
                                                                    <>
                                                                        &emsp;
                                                                        <a href="javascript:void(0)"
                                                                            onClick={() => { setFilterModal(true); setQues(rowData.ques); setAns(rowData.ans); setMode('edit'); setFAQID(rowData._id) }}>
                                                                            <i className="fas fa-pen txt-5282F0"></i>
                                                                        </a>
                                                                        &emsp;
                                                                        <a href="javascript:void(0)" onClick={() => openDeleteAlertModal(rowData)}>
                                                                            <i className="fas fa-trash txt-5282F0"></i>
                                                                        </a>
                                                                    </>
                                                            },
                                                        ]}
                                                        data={faq}
                                                        title="faq"
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
                                                </TabPanel>
                                                <TabPanel value={tab} index={3}>
                                                    <div className='w-100 h-100 m-4'>
                                                        <h6>{cms.privacyPolicy}</h6>
                                                    </div>
                                                </TabPanel>
                                            {/* </Tab.Content> */}
                                        </Col>
                                    </Row>
                                {/* </Tab.Container> */}
                            </Box>
                            <div className=" d-flex  mt-3 justify-content-end">
                                {tab==2 ? (
                                    <Button variant="contained" className="btn px-5 btn-primary"
                                        onClick={() => setFilterModal(true)}
                                    >Add</Button>
                                ) : (
                                    <Button variant="contained" className="btn px-5 btn-primary"
                                        onClick={() =>  navigate('/dashboard/cms/editCms/' + cms._id)}
                                    >Update</Button>

                                )}
                            </div>
                        </CardContent>
                    </Card>
                </Box>
            )}
          
            {/* </div> */}

            {/* Modal for delete or blocking confirmation */}
            <Modal
                open={modalAlertTitle}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onClose={()=>{setModalAlertTitle(false)}}
            >
                <Box sx={modalStyle}>
                    <BootstrapModal.Header className="clr-primary-400 py-2"> 
                            <Grid container>
                                <Grid item xs={11} lg={11} md={11} sm={11}>
                                        <Typography variant="h6"> 
                                            {modalTitle}
                                        </Typography>
                                </Grid>
                                <Grid item xs={1} lg={1} md={1}>
                                        <Button onClick={() => setModalAlertTitle(false)} >
                                                <CloseIcon/>
                                        </Button>
                                </Grid> 
                            </Grid> 
                    </BootstrapModal.Header> 
                    <BootstrapModal.Body>
                        <div className="text-center txt-5282F0 my-4">
                            <p>Are you sure to {modalMode} this Question?</p>
                            <p><i className="fas fa-info-circle"></i> {info}</p>
                        </div>
                        <div className="text-center mt-4 pb-3">
                            <Button variant="outlined" 
                                onClick={() => setModalAlertTitle(false)}
                            >Cancel</Button>
                            &emsp;
                            {actionLodaer ? (
                                <Button variant="outlined"  >
                                    <CircularProgress  size={20}/>
                                </Button>
                            ) : (
                                <Button variant="contained"  
                                    onClick={() => deleteFAQProfile()}
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
                                            Updated FAQs!
                                    </Typography>
                            </Grid>
                            <Grid item xs={1} lg={1} md={1}>
                                    <Button onClick={() => setModalAlertTitle(false)} >
                                            <CloseIcon/>
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
                            <Button  variant="outlined" 
                                onClick={() => setCompletionModal(false)}
                            >OK</Button> 
                        </div>
                    </BootstrapModal.Body>
                </Box>
            </Modal>


            {/* Modal for add and edit faq */}
            <Modal
                open={filterModal}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onClose={() => setFilterModal(false)}
            >
                <Box sx={modalStyle}>
                    <BootstrapModal.Header className="clr-primary-400 py-2">
                        
                            <Grid container>
                                <Grid item xs={11} lg={11} md={11} sm={11}>
                                        <Typography variant="h6"> 
                                            Question & Answer
                                        </Typography>
                                </Grid>
                                <Grid item xs={1} lg={1} md={1}>
                                        <Button onClick={() => setFilterModal(false)} >
                                                <CloseIcon/>
                                        </Button>
                                </Grid> 
                            </Grid> 
                    </BootstrapModal.Header>
                    <BootstrapModal.Body>
                        <div className="row labelColor">
                            <label>Question</label>
                            <div className="mt-3 mb-3">
                                <input type="text" className="form-control txt-5282F0" placeholder="Enter Question" onChange={(e) => setQues(e.target.value)} value={ques} />
                            </div>
                            <label>Answer</label>
                            <div className="mt-3 mb-3">
                                <input type="text" className="form-control txt-5282F0" placeholder="Enter Answer" onChange={(e) => setAns(e.target.value)} value={ans} />
                            </div>
                        </div>
                        <div className="text-center txt-5282F0 my-4">

                        </div>
                        <div className="text-center mt-4 pb-3">
                            <Button 
                                // onClick={()=>resetFilterData()}
                                onClick={() => resetFilterData()}
                                variant="outlined"
                            >Reset </Button>
                            &emsp;
                            {filterLoader ? (
                                <Button
                                variant="outlined"
                                 >
                                      <CircularProgress  size={20}/>
                                </Button>
                            ) : (
                                <Button 
                                variant="contained"
                                
                                    onClick={() => { mode == 'add' ? addNewFAQ() : editFAQDetails() }}
                                >Confirm</Button>
                            )}

                        </div>
                    </BootstrapModal.Body>
                </Box>
            </Modal>

            {/* Modal for successful add FAQ */}
            <Modal
                open={modalVisible}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onClick={() =>setModalVisible(false)}
            >
                <Box sx={modalStyle}>
                    <BootstrapModal.Body>
                        <div className="text-center txt-5282F0 my-4">
                            <img src={'/Assets/modalPhoto.png'} />
                            <h3>{modalLine1}</h3>
                            <h3 className="modalLowerText">{modalLine2}</h3>
                        </div>
                        <div className="text-center mt-4 pb-3">
                            <Button variant="outlined"  style={{ marginRight: 10 }}
                                onClick={() => { setFilterModal(true); setModalVisible(false) }}
                            >Add New Question</Button>
                            &emsp;
                            <Button variant="contained"  style={{ marginRight: 10 }}
                                onClick={() => { setModalVisible(false); setFilterModal(false) }}
                            >Back To CMS</Button>
                        </div>
                    </BootstrapModal.Body>
                </Box>
            </Modal>

        </>
    )
}
