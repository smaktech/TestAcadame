import React, { useState, useEffect, useParams } from 'react';
import Container from '@material-ui/core/Container';
import test from './image/geogebra-export.png';
import TextField from '@material-ui/core/TextField';
import { createAnswer} from '../../api/Answer/Answer'
// import Button from '@material-ui/core/Button';
import { Button, Input, Card } from '@mui/material'
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Alert from '@mui/material/Alert';

import { v4 as uuidv4 } from 'uuid';

import { Form, Row, } from 'react-bootstrap'
import './app.css'
import PlusButton from './test7';

// import test from './image/logo.png';

import { makeStyles } from '@material-ui/core/styles';

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

function Dynfield() {
    const [foodState, setFoodState] = useState();
    const [formula, setFormula] = useState();
    const [question, setQuestion] = useState()
    const [media, setMedia] = useState();
    const courseID ='';
    const [editFormLoader, setEditFormLoader] = useState(false)
    const [mode, setMode] = useState(courseID ? "edit" : "add");
    const [hint, setHint] = useState()
    const [marks, setMarks] = useState()
    const [answer, setAnswer] = useState()
    const [showhide, setShowhide] = useState('');
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

    const handleshowhide = (event) => {
        const getuser = event.target.value;
        setShowhide(getuser);

    }
    

    const classes = useStyles()
    const [inputFields, setInputFields] = useState([
        { type: '', hint: '', answer: '', marks: '' },
    ]);

    useEffect(() => {
        setMode(courseID ? "edit" : "add")
        setEditFormLoader(true)
        // getCourseById(courseID).then((res) => {
        //     console.log('res', res);
        //     if (res.status) {
        //         //setting the fetched Course by id into state variable
        //         setCourse(res.course);
        //         setName(res.course.name)
                // setHint(res.course.hint)
        //         //setBoard(res?.course?.board?._id)
        //         setSelectedSubBoard(res?.course?.subBoardID?._id)
        //         // setClasses(res.course.classesID._id)
        //         // setSubject(res.course.subjectID._id)
        //         setTopic(res.course.topicIDs)
        //         setCoursePicture(res.course.coursePicture)
        //     }
        //     setEditFormLoader(false)
        // })
            // .catch((err) => {
            //     console.error(err);
            // });

    }, [courseID])
        
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
    function addNew() {
       
        alert("Question Submitted")
        createAnswer(hint, marks, answer,formula, question, selectedFile)
    }   
    
  

    return (
        <Container >

            <form className={classes.root} onSubmit={handleSubmit}>
                {inputFields.map(inputField => (
                    <div key={inputField.id}> 
                        <div class="ques">
                            <Row>  <Form.Group className="mb-6 " controlId="exampleForm.ControlTextarea1" ></Form.Group>
                                <Form.Label>Question</Form.Label>

                                <Form.Control type="text" value={question} onChange={(e) => setQuestion(e.target.value)}  as="textarea" rows={5}   ></Form.Control>
                            </Row>
                            <Row>
                                <div class='IV' >
                                    <h1 class="ig">Media</h1>
                                    <Card style={{ backgroundColor: "gray" }} sx={{ border: '1px solid yellow' }}className='imght'>
                                    <Form.Control type="file"  onChange={onSelectFile} onChange1={(e) => setMedia(e.target.value)} />
                                        {selectedFile && <img src={preview} width='80%' />}</Card>
                                        
                                </div>
                                
                            </Row>
                            
                            
                        </div>

                            <div class="ques">
                                <Form.Group className="mb-6 mt-3 " controlId="exampleForm.ControlInput1" ></Form.Group>
                                <Form.Label>Answer in Part</Form.Label>
                            </div>
                            <div>
                                <Form.Label>Hint</Form.Label>
                                <Form.Control  value={hint}  name="hint" type="text" onChange={(e) => setHint(e.target.value)}  ></Form.Control>
                            </div>
                            <div className="marks  col-lg-5 col-sm-6 col-12 mt-3 ">
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Marks</Form.Label>
                                    {/* <Form.Select  aria-label="Default select example"> */}

                                    {/* </Form.Select> */}
                                    {/* <Form.Control type="text" name='marks' value={inputField.answer}
                                        onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control> */}
                                    <Form.Control value={marks} type="text" name='Answer'  placeholder='Marks' onChange={(e) => setMarks(e.target.value)}></Form.Control>
                                </Form.Group>
                            </div>

                            <div className=" type  col-lg-5 col-sm-6 col-12  ">
                                <Form.Label>Type</Form.Label>
                                <Form.Group  controlId="exampleForm.ControlInput1" >


                                    <Form.Select className="custom-select"
                                        onChange={(e) => (handleshowhide(e))} aria-label="Default select example">
                                        <option value="select">Select</option>
                                        <option value="text"> Text</option>
                                        <option value="media">G-Panel</option>
                                        <option value="formula">Formula</option>


                                        <Form.Control type="text" name='type' value={foodState} ></Form.Control>
                                    </Form.Select>

                                    {/* <Form.Control type="text" name='optionA' value={inputField.optionA}
                                    onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control> */}
                                </Form.Group>
                            </div>

                            {
                                showhide === 'media' && (
                                    <div className="ans col-lg-6 col-sm-6 col-12">
                                        <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                            <Form.Label>G-Panel</Form.Label>
                                            <br />
                                            {/* <Input accept="image/*" id="contained-button-file" multiple type="file" /> */}
                                            <iframe class="responsive-iframe" img src={test} width='100%' height="300" > </iframe>

                                            {/* <Button variant="contained" component="span">
                      Upload
                    </Button> */}
                                            {/* <Form.Control type="text" name='Answer' value={foodState} ></Form.Control> */}
                                        </Form.Group>

                                    </div>
                                )}


                            {
                                showhide != 'media' && showhide != 'formula' && (
                                    <div className="ans col-lg-6 col-sm-6 col-12">
                                        <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                            <Form.Label>Answer</Form.Label>
                                            <Form className="custom-select"
                                                value={foodState}
                                                onChange={(e) => {
                                                    const selectedFood = e.target.value;
                                                    setFoodState(selectedFood);
                                                }}>

                                            </Form>
                                            <Form.Control type="text" name='Answer' value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                                        </Form.Group>

                                    </div>
                                )}

                            {
                                showhide === 'formula' && (
                                    <div className="ans col-lg-6 col-sm-6 col-12">
                                        <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                            <Form.Label>Formula</Form.Label>
                                            <Form className="custom-select"
                                                value={formula}
                                                onChange={(e) => {
                                                    const selectedFood = e.target.value;
                                                    setFoodState(selectedFood);
                                                }}>

                                            </Form>
                                            <Form.Control type="text" name='Answer' value={formula} onChange={(e) => setFormula(e.target.value)} placeholder='Formula' ></Form.Control>
                                            <br />
                                            
                                            <div class="buttons-flex">

                                                <button class="btn btn-light" size="small">&#43;</button>
                                                <button class="btn btn-light" size="small">&#8722;</button>
                                                <button class="btn btn-light" size="small">&#xd7;</button>
                                                <button class="btn btn-light" size="small">&#xf7;</button>
                                                <button class="btn btn-light" size="small">&#x3d;</button>
                                                <button class="btn btn-light" size="small">&#x2260;</button>
                                                <button class="btn btn-light" size="small">&#xb1;</button>
                                                <button class="btn btn-light" size="small">&#x25;</button>
                                                <button class="btn btn-light" size="small">&#x3c;</button>
                                                <button class="btn btn-light" size="small">&#x3e;</button>


                                            </div>
                                            <div class="buttons-flex2">


                                                <button class="btn btn-light" size="small">.</button>
                                                <button class="btn btn-light" size="small">/</button>
                                                <button class="btn btn-light" size="small">?</button>
                                                <button class="btn btn-light" size="small">;</button>
                                                <button class="btn btn-light" size="small">:</button>
                                                <button class="btn btn-light" size="small">'</button>
                                                <button class="btn btn-light" size="small">"</button>
                                                <button class="btn btn-light" size="small">&#x22DC;</button>
                                                <button class="btn btn-light" size="small">&#x22DD;</button>
                                                <button class="btn btn-light" size="small">&#x208D;</button>



                                            </div>
                                            <div class="buttons-flex7">

                                                <button class="btn btn-light" size="small">&#x192;</button>
                                                <button class="btn btn-light" size="small">&#x25;</button>
                                                <button class="btn btn-light" size="small">&#x89;</button>
                                                <button class="btn btn-light" size="small">&#x2031;</button>
                                                <button class="btn btn-light" size="small">&#x2200;</button>
                                                <button class="btn btn-light" size="small">&#x2201;</button>
                                                <button class="btn btn-light" size="small">&#x2202;</button>
                                                <button class="btn btn-light" size="small">&#x2203;</button>
                                                <button class="btn btn-light" size="small">&#x2204;</button>
                                                <button class="btn btn-light" size="small">&#x2205;</button>

                                            </div>
                                            <div class="buttons-flex8">

                                                <button class="btn btn-light" size="small">&#x2206;</button>
                                                <button class="btn btn-light" size="small">&#x2207;</button>
                                                <button class="btn btn-light" size="small">&#x2208;</button>
                                                <button class="btn btn-light" size="small">&#x2209;</button>
                                                <button class="btn btn-light" size="small">&#x220A;</button>
                                                <button class="btn btn-light" size="small">&#x220B;</button>
                                                <button class="btn btn-light" size="small">&#x2217;</button>
                                                <button class="btn btn-light" size="small">&#x2218;</button>
                                                <button class="btn btn-light" size="small">&#x221A;</button>
                                                <button class="btn btn-light" size="small">&#x221B;</button>

                                            </div>
                                            <div class="buttons-flex9">

                                                <button class="btn btn-light" size="small">&#x221C;</button>
                                                <button class="btn btn-light" size="small">&#x221D;</button>
                                                <button class="btn btn-light" size="small">&#x221E;</button>
                                                <button class="btn btn-light" size="small">&#x2225;</button>
                                                <button class="btn btn-light" size="small">&#x2226;</button>
                                                <button class="btn btn-light" size="small">&#x222A;</button>
                                                <button class="btn btn-light" size="small">&#x222B;</button>
                                                <button class="btn btn-light" size="small">&#x222C;</button>
                                                <button class="btn btn-light" size="small">&#x222D;</button>
                                                <button class="btn btn-light" size="small">&#x222E;</button>

                                            </div>
                                            <div class="buttons-flex10">

                                                <button class="btn btn-light" size="small">&#x222F;</button>
                                                <button class="btn btn-light" size="small">&#x2230;</button>
                                                <button class="btn btn-light" size="small">&#x2231;</button>
                                                <button class="btn btn-light" size="small">&#x2232;</button>
                                                <button class="btn btn-light" size="small">&#x2233;</button>
                                                <button class="btn btn-light" size="small">&#x2234;</button>
                                                <button class="btn btn-light" size="small">!</button>
                                                <button class="btn btn-light" size="small">#</button>
                                                <button class="btn btn-light" size="small">&#x26;</button>
                                                <button class="btn btn-light" size="small">&#x27;</button>

                                            </div>
                                            <div class="buttons-flex11">

                                                <button class="btn btn-light" size="small">&#x28;</button>
                                                <button class="btn btn-light" size="small">&#x29;</button>
                                                <button class="btn btn-light" size="small">&#x5b;</button>
                                                <button class="btn btn-light" size="small">&#x5c;</button>
                                                <button class="btn btn-light" size="small">&#x5d;</button>
                                                <button class="btn btn-light" size="small">&#x5e;</button>
                                                <button class="btn btn-light" size="small">&#x5f;</button>
                                                <button class="btn btn-light" size="small">&#x60;</button>
                                                <button class="btn btn-light" size="small">&#x7b;</button>
                                                <button class="btn btn-light" size="small">&#x7c;</button>

                                            </div>
                                            <div class="buttons-flex12">

                                                <button class="btn btn-light" size="small">&#x7d;</button>
                                                <button class="btn btn-light" size="small">&#x7e;</button>
                                                <button class="btn btn-light" size="small">&#xa1;</button>
                                                <button class="btn btn-light" size="small">&#xa6;</button>
                                                <button class="btn btn-light" size="small">&#xa7;</button>
                                                <button class="btn btn-light" size="small">&#xa8;</button>
                                                <button class="btn btn-light" size="small">&#xa9;</button>
                                                <button class="btn btn-light" size="small">&#xab;</button>
                                                <button class="btn btn-light" size="small">&#xac;</button>
                                                <button class="btn btn-light" size="small">&#xae;</button>

                                            </div>
                                            <div class="buttons-flex13">

                                                <button class="btn btn-light" size="small">&#x2160;</button>
                                                <button class="btn btn-light" size="small">&#x2161;</button>
                                                <button class="btn btn-light" size="small">&#x2162;</button>
                                                <button class="btn btn-light" size="small">&#x2163;</button>
                                                <button class="btn btn-light" size="small">&#x2164;</button>
                                                <button class="btn btn-light" size="small">&#x2165;</button>
                                                <button class="btn btn-light" size="small">&#x2166;</button>
                                                <button class="btn btn-light" size="small">&#x2167;</button>
                                                <button class="btn btn-light" size="small">&#x2168;</button>
                                                <button class="btn btn-light" size="small">&#x2169;</button>

                                            </div>
                                            <div class="buttons-flex14">

                                                <button class="btn btn-light" size="small">&#x216A;</button>
                                                <button class="btn btn-light" size="small">&#x216B;</button>
                                                <button class="btn btn-light" size="small">&#x216C;</button>
                                                <button class="btn btn-light" size="small">&#x216D;</button>
                                                <button class="btn btn-light" size="small">&#x216E;</button>
                                                <button class="btn btn-light" size="small">&#x216F;</button>
                                                <button class="btn btn-light" size="small">&#x2170;</button>
                                                <button class="btn btn-light" size="small">&#x2171;</button>
                                                <button class="btn btn-light" size="small">&#x2172;</button>
                                                <button class="btn btn-light" size="small">&#x2173;</button>

                                            </div>
                                            <div class="buttons-flex15">

                                                <button class="btn btn-light" size="small">&#x2174;</button>
                                                <button class="btn btn-light" size="small">&#x2175;</button>
                                                <button class="btn btn-light" size="small">&#x2176;</button>
                                                <button class="btn btn-light" size="small">&#x2177;</button>
                                                <button class="btn btn-light" size="small">&#x2178;</button>
                                                <button class="btn btn-light" size="small">&#x2179;</button>
                                                <button class="btn btn-light" size="small">&#x217A;</button>
                                                <button class="btn btn-light" size="small">&#x217B;</button>
                                                <button class="btn btn-light" size="small">&#x217C;</button>
                                                <button class="btn btn-light" size="small">&#x217D;</button>

                                            </div>
                                            <div class="buttons-flex3">

                                                <button class="btn btn-light" size="small">0</button>
                                                <button class="btn btn-light" size="small">1</button>
                                                <button class="btn btn-light" size="small">2</button>
                                                <button class="btn btn-light" size="small">3</button>
                                                <button class="btn btn-light" size="small">4</button>
                                                <button class="btn btn-light" size="small">5</button>
                                                <button class="btn btn-light" size="small">6</button>
                                                <button class="btn btn-light" size="small">7</button>
                                                <button class="btn btn-light" size="small">8</button>
                                                <button class="btn btn-light" size="small">9</button>

                                            </div>
                                            <div class="buttons-flex16">

                                                <button class="btn btn-light" size="small">&#xbc;</button>
                                                <button class="btn btn-light" size="small">&#xbd;</button>
                                                <button class="btn btn-light" size="small">&#xbe;</button>
                                                <button class="btn btn-light" size="small">&#x2150;</button>
                                                <button class="btn btn-light" size="small">&#x2151;</button>
                                                <button class="btn btn-light" size="small">&#x2152;</button>
                                                <button class="btn btn-light" size="small">&#x2153;</button>
                                                <button class="btn btn-light" size="small">&#x2154;</button>
                                                <button class="btn btn-light" size="small">&#x2155;</button>
                                                <button class="btn btn-light" size="small">&#x2156;</button>

                                            </div>
                                            <div class="buttons-flex17">

                                                <button class="btn btn-light" size="small">&#x2157;</button>
                                                <button class="btn btn-light" size="small">&#x2158;</button>
                                                <button class="btn btn-light" size="small">&#x2159;</button>
                                                <button class="btn btn-light" size="small">&#x215A;</button>
                                                <button class="btn btn-light" size="small">&#x215B;</button>
                                                <button class="btn btn-light" size="small">&#x215C;</button>
                                                <button class="btn btn-light" size="small">&#x215D;</button>
                                                <button class="btn btn-light" size="small">&#x215E;</button>
                                                <button class="btn btn-light" size="small">&#x215F;</button>
                                                <button class="btn btn-light" size="small">&#x2189;</button>

                                            </div>
                                            <div class="buttons-flex4">
                                                <button class="btn btn-light" size="small"></button>
                                                <button class="btn btn-light" size="small">,</button>
                                                <button class="btn btn-light" size="small">&#x5b;</button>
                                                <button class="btn btn-light" size="small">a</button>
                                                <button class="btn btn-light" size="small">b</button>
                                                <button class="btn btn-light" size="small">c</button>
                                                <button class="btn btn-light" size="small">d</button>
                                                <button class="btn btn-light" size="small">e</button>
                                                <button class="btn btn-light" size="small">f</button>
                                                <button class="btn btn-light" size="small">g</button>

                                            </div>

                                            <div class="buttons-flex5">
                                                <button class="btn btn-light" size="small">h</button>
                                                <button class="btn btn-light" size="small">i</button>
                                                <button class="btn btn-light" size="small">j</button>
                                                <button class="btn btn-light" size="small">k</button>
                                                <button class="btn btn-light" size="small">l</button>
                                                <button class="btn btn-light" size="small">m</button>
                                                <button class="btn btn-light" size="small">n</button>
                                                <button class="btn btn-light" size="small">o</button>
                                                <button class="btn btn-light" size="small">p</button>
                                                <button class="btn btn-light" size="small">q</button>
                                            </div>
                                            <div class="buttons-flex6">
                                                <button class="btn btn-light" size="small">r</button>
                                                <button class="btn btn-light" size="small">s</button>
                                                <button class="btn btn-light" size="small">t</button>
                                                <button class="btn btn-light" size="small">u</button>
                                                <button class="btn btn-light" size="small">v</button>
                                                <button class="btn btn-light" size="small">w</button>
                                                <button class="btn btn-light" size="small">x</button>
                                                <button class="btn btn-light" size="small">y</button>
                                                <button class="btn btn-light" size="small">z</button>

                                            </div>
                                    

                                        </Form.Group>

                                    </div>
                                )}


                            <div className="marks col-lg-5 col-sm-6 col-12">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                                    {/* <Form.Select  aria-label="Default select example"> */}

                                    {/* </Form.Select> */}
                                    {/* <Form.Control type="text" name='marks' value={inputField.marks}
                                    onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control> */}
                                </Form.Group>
                            </div>
                            {/* <div className='btnadd'>
                                <Button className='btnai' size='small' color="success" variant="contained" onClick={handleAddFields}><AddIcon /></Button>

                            </div>
                            <div class='btnsub'>
                                <Button className="btnsi" variant="contained" color="error" size="small" onClick={handleRemoveFields}><RemoveIcon /></Button>
                            </div> */}


                        </div>

                 
                ))}

            </form>

            <div className='btnnxt'>
                <Button className="btn btn-warning" size='small' onClick={() => addNew()} variant="contained">Save</Button>
            </div>
        </Container>
    );
}

export default Dynfield;