import React, { useState, useEffect, forwardRef, useRef } from 'react'
import { InputGroup, FormControl,   Nav, Row, Col, Sonnet } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useSelector } from 'react-redux'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import { updatePassword, changeName, uploadImage } from '../../api/Profile/Profile'
import Loader from "react-loader-spinner";
  
 
 
import { BsSortDownAlt, BsFillTrashFill, BiBlock } from "react-icons/bs";
import { getUserById, changeStatus, deleteUser } from "../../api/Users/Users"
import { imageBaseUrl } from '../..'; 
import { editAboutUs, editPrivacyPolicy, editTermAndConditions, fetchCMS } from '../../api/CMS/CMS'

 
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
import CircularProgress from '@mui/material/CircularProgress';  
import { Modal as BootstrapModal} from 'react-bootstrap'
import Grid from '@mui/material/Grid'; 
import Modal from '@mui/material/Modal'; 
import { modalStyle } from 'src/config'
import {useParams} from 'react-router-dom'

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
export default function AddEditCMS(props) {

    //setting the user id of the user coming from the url into a local variable
    const {cmsId} = useParams()
    // const [cmsId, setCmsId] = useState();

    const [mode, setMode] = useState(cmsId ? "edit" : "add")

    //setting cms data into a variable
    const [cms, setCms] = useState([]);

    //setting Terms data into a variable
    const [terms, setTerms] = useState();
    const [isTerms, setIsTerms] = useState(false)

    //setting Terms data into a variable
    const [policy, setPolicy] = useState();
    const [isPolicy, setIsPolicy] = useState(false)

    //setting Terms data into a variable
    const [about, setAbout] = useState();
    const [isAbout, setIsAbout] = useState(false)

    const [modalVisible, setModalVisible] = useState(false)
    const navigate =  useNavigate()

    //sets and display the line in the success modal!
    const [modalLine1, setModalLine1] = useState('');
    const [modalLine2, setModalLine2] = useState('')

    //sets the loader for add subject button
    const [addLoader, setAddLoader] = useState(false)

    //sets the loader for edit subject button
    const [editLoader, setEditLoader] = useState(false)

    //shows the error when users try to add subject without name
    const [errorMessage, setErrorMessage] = useState(false);
    const [error, showError] = useState(false);
    const [tab, setTab] = React.useState(0);

    const handleChange = (event, newValue) => {
      setTab(newValue);
    };
    //useEffect will assign the data of user according to the userId from the state on every change into the userId
    useEffect(() => {
        setMode(cmsId ? "edit" : "add")
        fetchCMS().then((res) => {
            console.log('res', res);
            if (res.status) {
                //setting the fetched user into state variable
                setCms(res.cms);
            }
        })
            .catch((err) => {
                console.error(err);
            });

    }, [cmsId])


    //edit  existing terms and condition
    function editTerms() {
        setModalVisible(false);
        setEditLoader(true);
        showError(false);
        if (cmsId != '') {
            console.log(terms)
            editTermAndConditions(cmsId, terms)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        setEditLoader(false);
                        setModalLine1('Terms & condition has been');
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
    //edit  existing about us
    function editAbout() {
        setModalVisible(false);
        setEditLoader(true);
        showError(false);
        if (cmsId != '') {
            editAboutUs(cmsId, about)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        setEditLoader(false);
                        setModalLine1('About Us has been');
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
            setErrorMessage('Please fill all the about details');
        }

    }

    //edit the  existing policy
    function editPolicy() {
        setModalVisible(false);
        setEditLoader(true);
        showError(false);
        if (cmsId != '') {
            editPrivacyPolicy(cmsId, policy)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        setEditLoader(false);
                        setModalLine1('Privacy Policy has been');
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
            setErrorMessage('Please fill all the policy details');
        }

    }


    return (
        <>
            <h5 className="m-3 txt-5282F0 fw-bold">CMS | Edit Details</h5>
            <Card className="shadow px-4 mt-4" style={{ width: '100%' }}>
                <CardContent>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> 
                    <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Terms & Conditions" {...a11yProps(0)} />
                        <Tab label="About Us" {...a11yProps(1)} /> 
                        <Tab label="PrivacyPolicy" {...a11yProps(2)} />
                    </Tabs>

                </Box>
                    
                        <Row>
                            <Col sm={12}>
                            
                                    <TabPanel value={tab} index={0}>
                                        <InputGroup>
                                            <FormControl
                                                aria-label="Search"
                                                aria-describedby="basic-addon1"
                                                as="textarea" rows={3}
                                                defaultValue={cms.termsAndConditions}
                                                onChange={(e) => {setTerms(e.target.value); setIsTerms(true)}}
                                            />
                                        </InputGroup>
                                    </TabPanel>
                                    <TabPanel  value={tab} index={1}>
                                        <InputGroup>
                                            <FormControl
                                                aria-label="Search"
                                                as="textarea" rows={3}
                                                aria-describedby="basic-addon1"
                                                defaultValue={cms.aboutUs}
                                                onChange={(e) => {setAbout(e.target.value); setIsAbout(true)}}
                                            />
                                        </InputGroup>
                                    </TabPanel>
                                    {/* <TabPanel eventKey="FAQs">
                                        <InputGroup>
                                            <FormControl
                                                aria-label="Search"
                                                aria-describedby="basic-addon1"
                                            // value={cms.fqa}
                                            // onChange={(e)=>se(e.target.value)}
                                            />
                                        </InputGroup>
                                    </TabPanel> */}
                                    <TabPanel value={tab} index={2}>
                                        <InputGroup>
                                            <FormControl
                                                aria-label="Search"
                                                as="textarea" rows={3}
                                                aria-describedby="basic-addon1"
                                                defaultValue={cms.privacyPolicy}
                                                onChange={(e) => {setPolicy(e.target.value); setIsPolicy(true)}}
                                            />
                                        </InputGroup>
                                    </TabPanel>
                                
                            </Col>
                        </Row>
                    
                    <div className="row d-felx justify-content-end">

                        {mode == "edit" ? (
                            <>
                                <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                    {editLoader ? (
                                        <Button variant="outlined">
                                            <CircularProgress size={20}/>
                                        </Button>
                                    ) : (
                                        <Button variant="contained"  onClick={() => {isTerms? editTerms() : isPolicy? editPolicy() : editAbout() }}>Save Changes</Button>
                                    )}
                                </div>
                            </>
                        ) : (

                            <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                {addLoader ? (
                                    <Button variant="outlined" className=" py-2 px-6" >
                                        <CircularProgress size={20}/>
                                    </Button>
                                ) : (
                                    <Button variant="contained" className=" py-2 px-6"
                                    // onClick={() => addNewTopic()}
                                    >Add</Button>
                                )}

                            </div>
                        )}

                    </div>
                </CardContent>
            </Card>
            {/* </div> */}
            {/* </LeftNavbar> */}

            <Modal
                open={modalVisible}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onClose={()=>setModalVisible(false)}
            >
                <Box sx={modalStyle}>
                    <BootstrapModal.Body>
                        <div className="text-center txt-5282F0 my-4">
                            <img src={'/Assets/modalPhoto.png'} />
                            <h3>{modalLine1}</h3>
                            <h3 className="modalLowerText">{modalLine2}</h3>
                        </div>
                        <div className="text-center mt-4 pb-3">
                            <Button  variant="contained" className=" px-5" style={{ marginRight: 10 }}
                                onClick={() => navigate('/dashboard/cms')}
                            >Back To CMS</Button>
                        </div>
                    </BootstrapModal.Body>
                </Box>
            </Modal>
        </>
    )
}

