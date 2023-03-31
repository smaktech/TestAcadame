//page for all users listing!

import React, { useState, useEffect, forwardRef, useRef } from 'react'
import { InputGroup, FormControl, Table, Form } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useSelector } from 'react-redux'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import { updatePassword, changeName, uploadImage } from '../../api/Profile/Profile'
import Loader from "react-loader-spinner";



import { BsSortDownAlt, BsFillTrashFill, BiBlock } from "react-icons/bs";

import MaterialTable from 'material-table'
import { fetchboards, editBoards, deleteboard, getBoardById } from "../../api/Boards/Boards"

import { createBoard } from '../../api/Boards/Boards'
import { useParams } from 'react-router-dom'


import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material'
import { Modal as BootstrapModal } from 'react-bootstrap'
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from 'src/config'


export default function AddEditBoards(props) {
    // const boardId = props.match.params.board/oardStatus;
    const { boardId, boardStatus } = useParams()
    console.log('Check board id', boardId)
    const [mode, setMode] = useState(boardId ? "edit" : "add")

    const [modalVisible, setModalVisible] = useState(false)
    const navigate = useNavigate()

    //sets and display the line in the success modal!
    const [modalLine1, setModalLine1] = useState('');
    const [modalLine2, setModalLine2] = useState('')

    //sets the loader for add board button
    const [addLoader, setAddLoader] = useState(false)

    //sets the loader for edit board button
    const [editLoader, setEditLoader] = useState(false)

    //sets the loader for edit subject button
    const [editFormLoader, setEditFormLoader] = useState(false)

    //sets the name of the board user want to add
    const [boardName, setboardName] = useState();

    //shows the error when users try to add board without name
    const [errorMessage, setErrorMessage] = useState(false);
    const [error, showError] = useState(false);

    const [boardIcon, setBoardIcon] = useState("");

    //updating mode state on change of board id
    useEffect(() => {
        setMode(boardId ? "edit" : "add")
        setEditFormLoader(true)
        getBoardById(boardId).then((res) => {
            console.log('res', res);
            if (res.status) {
                //setting the fetched board by id into state variable
                setboardName(res.course.name)
            }
            setEditFormLoader(false)
        })
            .catch((err) => {
                console.error(err);
            });
    }, [boardId])

    console.log(boardId, boardName, boardStatus)
    //edit the details basically the name of the existing board
    function editboardDetails() {
        setModalVisible(false);
        setEditLoader(true);
        showError(false);
        if (boardName != '') {
            editBoards(boardId, boardName, boardStatus,boardIcon)
                .then((res) => {
                    console.log('hello', res);
                    if (res.status) {
                        setEditLoader(false);
                        setModalLine1('Board details has been');
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
            setErrorMessage('Please fill the board name');
        }

    }

    //adds new board 
    function addNewboard() {
        setModalVisible(false);
        setAddLoader(true);
        showError(false);
        if (boardName != '') {
            createBoard(boardName, 'active', boardIcon)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        setAddLoader(false);
                        setModalLine1('New Board Added');
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
            setErrorMessage('Please fill the board name');
        }
    }

    // function to reset
    const reSetForm = () => {
        setboardName('')
    }


    return (
        <>

            {/* <div className="container" style={{overflowY: 'scroll'}}> */}
            <h5 className="mt-3 txt-5282F0 fw-bold">Boards Management</h5>
            <hr className="mt-4" />
            {editFormLoader ? (
                <div className='w-100 py-2 px-6 me-3' style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress size={20} />
                </div>
            ) : (
                <>
                    <div className=" align-items-center">
                        <Card className="w-100">
                            <CardContent>
                                <div className="row">
                                    {
                                        (error) ?
                                            <div className="row pt-2 " style={{ margin: 5 }}>
                                                <div className="col-md-5  col-sm-12 clr-danger-100">
                                                    <div className="   text-center">
                                                        {errorMessage}
                                                    </div>
                                                </div>

                                            </div>
                                            :
                                            <> </>
                                    }
                                    <div className="col-lg-6 col-sm-6 col-12">
                                        {/* <InputGroup className="mb-3" >

                                            {mode == 'edit' ? (
                                                <FormControl
                                                    placeholder="Enter board Name"
                                                    aria-label="Search"
                                                    aria-describedby="basic-addon1"
                                                    onChange={(e) => setboardName(e.target.value)}
                                                    value={boardName}
                                                    required
                                                />
                                            ) : (
                                                <FormControl
                                                    placeholder="Enter board Name"
                                                    aria-label="Search"
                                                    aria-describedby="basic-addon1"
                                                    onChange={(e) => setboardName(e.target.value)}
                                                    required
                                                />
                                            )}

                                        </InputGroup> */}

                                        <Form>
                                            {mode == 'edit' ? (
                                                <>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Board Name</Form.Label>
                                                        <Form.Control value={boardName} type="text" placeholder="Enter board Name" onChange={(e) => setboardName(e.target.value)} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Choose Icon</Form.Label>
                                                        <Form.Control   type="file" placeholder="choose Sub Topic Exam Zip" onChange={(e) => setBoardIcon(e.target.files[0])} />
                                                    </Form.Group>
                                                </>
                                            ) : (
                                                <>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Board Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter board Name" onChange={(e) => setboardName(e.target.value)} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Choose Icon</Form.Label>
                                                        <Form.Control type="file" placeholder="choose Sub Topic Exam Zip" onChange={(e) => setBoardIcon(e.target.files[0])} />
                                                    </Form.Group>
                                                </>
                                            )}
                                        </Form>
                                    </div>


                                </div>

                            </CardContent>
                        </Card>
                        <div className="row">

                            {mode == "edit" ? (
                                <>
                                    <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                        <Button onClick={() => navigate('/dashboard/boards')} variant="outlined">Cancel</Button>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                        {editLoader ? (
                                            <Button variant="outlined">
                                                <CircularProgress size={20} />
                                            </Button>
                                        ) : (
                                            <Button variant="contained" onClick={() => { editboardDetails() }}>Save Changes</Button>
                                        )}
                                    </div>
                                </>
                            ) : (

                                <div className="col-lg-2 col-md-2 col-6 mt-3 ">
                                    {addLoader ? (
                                        <Button variant="outlined">
                                            <CircularProgress size={20} />
                                        </Button>
                                    ) : (
                                        <Button variant="contained" onClick={() => addNewboard()}
                                        >Add board</Button>
                                    )}

                                </div>
                            )}

                        </div>
                    </div>

                </>
            )}
            <Modal
                open={modalVisible}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onClose={() => setModalVisible(false)}
            >
                <Box sx={modalStyle}>
                    <BootstrapModal.Body>
                        <div className="text-center txt-5282F0 my-4">
                            <img src={'/Assets/modalPhoto.png'} />
                            <h3>{modalLine1}</h3>
                            <h3 className="modalLowerText">{modalLine2}</h3>
                        </div>
                        <div className="text-center mt-4 pb-3">
                            <Button variant="outlined" className=" px-5" style={{ marginRight: 10 }}
                                onClick={() => { mode == 'add' ? (<>{setModalVisible(false), reSetForm()}</>) : (<>{setModalVisible(false), reSetForm(), navigate('/dashboard/boards/addBoard')}</>) }}
                            >Add New Board</Button>
                            &emsp;
                            <Button variant="contained" className=" px-5" style={{ marginRight: 10 }}
                                onClick={() => navigate('/dashboard/boards')}
                            >Back To Boards</Button>
                        </div>
                    </BootstrapModal.Body>
                </Box>
            </Modal>



            {/* </div> */}

        </>
    )
}
