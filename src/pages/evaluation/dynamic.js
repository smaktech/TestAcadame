import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { createQuestion} from '../../api/Question/Question'
import test from './image/logo.png';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import { Button, Input } from '@mui/material'
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { v4 as uuidv4 } from 'uuid';
import { Form, Row, Card, Carousel } from 'react-bootstrap'
import './app.css'

import { makeStyles } from '@material-ui/core/styles';
import Dynfield from './dynfield';

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

function Addmoreinput() {
    const classes = useStyles()
    const [question, setQuestion] = useState()
    const [media, setMedia] = useState();
    const [inputFields, setInputFields] = useState([
        { type: '', hint: '', answer: '', marks: '' },
    ]);
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
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("InputFields", inputFields);
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

    const handleAddFields = () => {
        setInputFields([...inputFields, { type: '', hint: '', answer: '', marks: '' }])
    }

    const handleRemoveFields = id => {
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }
    function addQuestion() {
        createQuestion(question, selectedFile)
    }

    return (
        <Container>

            <form className={classes.root} onSubmit={handleSubmit}>
                {inputFields.map(inputField => (
                    <div key={inputField.id}>
                        {/* <TextField
                            name="firstName"
                            label="First Name"
                            variant="filled"
                            value={inputField.firstName}
                            onChange={event => handleChangeInput(inputField.id, event)}
                        /> */}
                        {/* <div class="ques">
                            <Row>  <Form.Group className="mb-6 " controlId="exampleForm.ControlTextarea1" ></Form.Group>
                                <Form.Label>Question</Form.Label>

                                <Form.Control type="text" value={question} onChange={(e) => setQuestion(e.target.value)}  as="textarea" rows={5}   ></Form.Control>
                            </Row>
                            <Row>
                                <div class='IV' >
                                    <h1 class="ig">Media</h1>
                                    <Card style={{ backgroundColor: "gray" }} className='imght'>
                                    <Form.Control type="file"  onChange={onSelectFile} onChange1={(e) => setMedia(e.target.value)} />
                                        {selectedFile && <img src={preview} width='80%' />}</Card>
                                        
                                </div>
                                
                            </Row>
                            
                            
                        </div> */}
                        {/* <Button className="btn btn-warning" size='small' onClick={() => addQuestion()} variant="contained">Save Question</Button> */}


                        {/* <div class='btnadd'>
                            <Button class=" btn-secondary btn-sm" onClick={handleAddFields}><AddIcon /></Button>
                            
                        </div> */}

                        {/* <span> <Button class=" btnsub btn-secondary btn-sm ml-3" onClick={handleRemoveFields}><RemoveIcon /></Button> </span> */}


                    </div>

                ))}


                {/* Answer in part checking */}

                {/* <div class="ques">
                            <Form.Group className="mb-6 mt-3 " controlId="exampleForm.ControlTextarea1" ></Form.Group>
                            <Form.Label>Answer in Part</Form.Label>
                            
                           
                        </div>
                        <div>
                        <Form.Label>Hint</Form.Label>
                        <Form.Control type="text" name='marks'  ></Form.Control>
                        </div> */}
                {/* <div class='fieldhead'>
                    <div class='type1'><Form.Label>Type</Form.Label></div>

                    <div class='hint1'>  <Form.Label>Hint</Form.Label></div>
                    <div class='marks1'>  <Form.Label>Marks</Form.Label></div>
                    <div class='answer1'> <Form.Label>Answer</Form.Label></div>
                </div> */}
            </form>
        </Container>
    );
}

export default Addmoreinput;




{/* <TextField
                            name="lastName"
                            label="Last Name"
                            variant="filled"
                            value={inputField.lastName}
                            onChange={event => handleChangeInput(inputField.id, event)}
                        /> */}
{/* <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                            <RemoveIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleAddFields}
                        >
                            <AddIcon />
                        </IconButton> */}

{/* <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit"
                    endIcon={<Icon>send</Icon>}
                    onClick={handleSubmit}
                >Send</Button> */}






                //// 4 fields
                // <div className=" col-lg-5 col-sm-6 col-12">
                //             <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1" >
                //                 <Form.Label>Type</Form.Label>
                //                 <Form.Select aria-label="Default select example">
                //                     <option>Select</option>
                //                     <option>Option A</option>
                //                     <option>Option B</option>
                //                     <option>Option C</option>
                //                     <option>Option D</option>
                //                     <Form.Control type="text" name='type' value={inputField.type}
                //                     onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control>
                //                 </Form.Select>
                //                 {/* <Form.Control type="text" name='optionA' value={inputField.optionA}
                //                     onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control> */}
                //             </Form.Group>

                //         </div>
                //         <div className="hint col-lg-5 col-sm-6 col-12">
                //             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                //                 <Form.Label>Hint</Form.Label>
                //                 {/* <Form.Select  aria-label="Default select example"> */}

                //                 {/* </Form.Select> */}
                //                 <Form.Control type="text" name='hint' value={inputField.hint}
                //                     onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control>
                //             </Form.Group>
                //         </div>
                //         <div className="ans col-lg-5 col-sm-6 col-12">
                //             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                //                 <Form.Label>Answer</Form.Label>
                //                 {/* <Form.Select  aria-label="Default select example"> */}

                //                 {/* </Form.Select> */}
                //                 <Form.Control type="text" name='answer' value={inputField.answer}
                //                     onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control>
                //             </Form.Group>
                //         </div>
                //         <div className="marks col-lg-5 col-sm-6 col-12">
                //             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                //                 <Form.Label>Marks</Form.Label>
                //                 {/* <Form.Select  aria-label="Default select example"> */}

                //                 {/* </Form.Select> */}
                //                 <Form.Control type="text" name='marks' value={inputField.marks}
                //                     onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control>
                //             </Form.Group>
                //         </div>