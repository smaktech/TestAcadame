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
import { createSubBoard, editSubBoards, getSubBoardById } from 'src/api/SubBoard/SubBoard'
export default function AddEditSubBoards(props) {
    // const boardId = props.match.params.board/oardStatus;
    const { boardId, subBoardStatus, subBoardId } = useParams()
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
    const [subBoardName, setsubBoardName] = useState();

    //shows the error when users try to add board without name
    const [errorMessage, setErrorMessage] = useState(false);
    const [error, showError] = useState(false);

    const [subBoardIcon, setSubBoardIcon] = useState(null);

    //updating mode state on change of board id
    useEffect(() => {
        setMode(subBoardId ? "edit" : "add")
        setEditFormLoader(true)
        getSubBoardById(subBoardId).then((res) => {
            console.log('res', res);
            if (res.status) {
                //setting the fetched board by id into state variable
                setsubBoardName(res.subBoards.name)
            }
            setEditFormLoader(false)
        })
            .catch((err) => {
                console.error(err);
                setEditFormLoader(false)
            });
    }, [boardId])

    //edit the details basically the name of the existing board
    function editboardDetails() {
        setModalVisible(false);
        setEditLoader(true);
        showError(false);
        if (subBoardName != '') {
            editSubBoards(subBoardId, subBoardName, subBoardStatus)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        setEditLoader(false);
                        setModalLine1('Sub Board details has been');
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
            setErrorMessage('Please fill the Sub board name');
        }

    }

    //adds new board 
    function addNewboard() {
        setModalVisible(false);
        setAddLoader(true);
        showError(false);
        if (subBoardName != '') {
            createSubBoard(subBoardName, 'active', boardId, subBoardIcon)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        setAddLoader(false);
                        setModalLine1('New Sub Board Added');
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
            setErrorMessage('Please fill the Sub board name');
        }
    }

    // function to reset
    const reSetForm = () => {
        setsubBoardName('')
    }


    return (
        <>

            {/* <div className="container" style={{overflowY: 'scroll'}}> */}
            <h5 className="mt-3 txt-5282F0 fw-bold">Sub Board Management</h5>
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
                                            <div class="row pt-2 " style={{ margin: 5 }}>
                                                <div class="col-md-5  col-sm-12 clr-danger-100">
                                                    <div class="   text-center">
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
                                            onChange={(e) => setsubBoardName(e.target.value)}
                                            value={subBoardName}
                                            required
                                        />
                                    ) : (
                                        <FormControl
                                            placeholder="Enter board Name"
                                            aria-label="Search"
                                            aria-describedby="basic-addon1"
                                            onChange={(e) => setsubBoardName(e.target.value)}
                                            required
                                        />
                                    )}

                                </InputGroup> */}
                                        <Form>
                                            {mode == 'edit' ? (
                                                <>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Board Name</Form.Label>
                                                        <Form.Control value={subBoardName} type="text" placeholder="Enter board Name" onChange={(e) => setsubBoardName(e.target.value)} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Choose Icon</Form.Label>
                                                        <Form.Control value={subBoardIcon} type="file" placeholder="choose Sub Topic Exam Zip" onChange={(e) => setSubBoardIcon(e.target.files[0])} />
                                                    </Form.Group>
                                                </>
                                            ) : (
                                                <>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Board Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter board Name" onChange={(e) => setsubBoardName(e.target.value)} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Choose Icon</Form.Label>
                                                        <Form.Control type="file" placeholder="choose Sub Topic Exam Zip" onChange={(e) => setSubBoardIcon(e.target.files[0])} />
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
                                        <Button onClick={() => navigate('/dashboard/boards/subBoard/addSubBoard/' + boardId)} variant="outlined">Cancel</Button>
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
                                        >Add Sub Board</Button>
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
                        <div className="text-center txt-5282F0 my-4" style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                            <img src={'/Assets/modalPhoto.png'} />
                            <h3>{modalLine1}</h3>
                            <h3 className="modalLowerText">{modalLine2}</h3>
                        </div>
                        <div className="text-center mt-4 pb-3">
                            <Button variant="outlined" style={{ marginRight: 10, marginTop: 10 }}
                                onClick={() => { mode == 'add' ? (<>{setModalVisible(false), reSetForm()}</>) : (<>{setModalVisible(false), reSetForm(), navigate('/dashboard/boards/subBoard/addSubBoard/' + boardId)}</>) }}
                            >Add New Sub Board</Button>
                            &emsp;
                            <Button variant="contained" style={{ marginRight: 10, marginTop: 10 }}
                                onClick={() => navigate('/dashboard/boards/subBoard/' + boardId)}
                            >Back To Sub Boards</Button>
                        </div>
                    </BootstrapModal.Body>
                </Box>
            </Modal>



            {/* </div> */}

        </>
    )
}
