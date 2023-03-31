// import React, { useState } from "react";
// import { Container } from 'react-bootstrap';
// import { Button, Input } from '@mui/material';

// function Selectdropdown() {
//   const [showhide, setShowhide] = useState('');

//   const handleshowhide = (event) => {
//     const getuser = event.target.value;
//     setShowhide(getuser);

//   }

//   return (
//     <React.Fragment>
//       <Container>
//         <div className="row fthight">

//           <div className="col-sm-6">
//             <h4 className="mt-3">Test Field </h4>

//             <div className="col-md-10 form-group mb-3">
//               <label className="mb-2">Username</label>
//               <input type="text" name="username" className="form-control" />
//             </div>

//             <div className="col-md-10 form-group mb-3">
//               <label className="mb-2">User Type</label>
//               <select name="usertype" className="form-control" onChange={(e) => (handleshowhide(e))}>
//                 <option value="">--Select User Type--</option>
//                 <option value="1">User Type 1</option>
//                 <option value="2">User Type 2</option>
//                 <option value="3">User Type 3</option>
//               </select>
//             </div>

//             {
//               showhide === '1' && (
//                 <div className="col-md-10 form-group">
//                   <label htmlFor="contained-button-file">
//                     <Input accept="image/*" id="contained-button-file" multiple type="file" />
//                     <Button variant="contained" component="span">
//                       Upload
//                     </Button>
//                   </label>
//                   <textarea name="address1" className="form-control"></textarea>
//                 </div>
//               )}

//             {
//               showhide === '2' && (
//                 <div className="col-md-10 form-group">
//                   <label className="mb-2">User Address 2</label>
//                   <textarea name="address2" className="form-control"></textarea>
//                 </div>
//               )}

//             {
//               showhide === '3' && (
//                 <div className="col-md-10 form-group">
//                   <label className="mb-2">User Address 3</label>
//                   <textarea name="address3" className="form-control"></textarea>
//                 </div>
//               )}

//           </div>

//         </div>

//       </Container>
//     </React.Fragment>
//   );
// }
// export default Selectdropdown;

//------------------------------------------------------------------------------//


// import react from 'react';
// import test from './image/logo.png';
// import Button from 'react-bootstrap/Button'
// import { Form, Row, Card, Carousel } from 'react-bootstrap'

// function App() {
//   function number1() {
//     // console.log('fun1')
//     <div class="ques">
//                           <Row>  <Form.Group className="mb-6 " controlId="exampleForm.ControlTextarea1" ></Form.Group>
//                             <Form.Label>Question</Form.Label>

//                             <Form.Control type="text" name='question' as="textarea" rows={5}   ></Form.Control>
//                             </Row>
//                             <Row>
//                             <div class='IV' >
//                             <h1 class="ig">Media</h1>
//                             <Card className='imght'><img src={test} /></Card>
//                         </div>
//                             </Row>
//                         </div>
//   }
//   function number2() {
//     console.log('fun2')
//   }
//   return (
//     <div className='App' >
//       <h1>Call multiple</h1>
//       <Button onClick={()=> {
//         number1()
        
//       }}>Call Both</Button>
//     </div>
//   )
// }
// export default App

////////////------------------------------/////////////////
// import React, { useState } from "react";
// import { Form, Row, Card, Carousel } from 'react-bootstrap'
// import './app.css'


// const App = () => {
//   const [selectedImages, setSelectedImages] = useState([]);
//   const onSelectFile = (event) => {
//     const selectedFiles = event.target.files;
//     const selectedFilesArray = Array.from(selectedFiles);

//     const imagesArray = selectedFilesArray.map((file) => {
//       return URL.createObjectURL(file);
//     });

//     setSelectedImages((previousImages) => previousImages.concat(imagesArray));
//   };

//   return (
//     <section>
//       <label>
//         + Add Images
//         <br />
//         <span>up to 10 images</span>
//         <input
//           type="file"
//           name="images"
//           onChange={onSelectFile}
//           multiple
//           accept="image/png , image/jpeg, image/webp"
//         />
//       </label>
//       <br />

//       {selectedImages.length > 0 &&
//         (selectedImages.length > 10 ? (
//           <p className="error">
//             You can't upload more than 10 images! <br />
//             <span>
//               please delete <b> {selectedImages.length - 10} </b> of them{" "}
//             </span>
//           </p>
//         ) : (
//           <button
//             className="upload-btn"
//             onClick={() => {
//               console.log("UPLOAD IMAGES");
//             }}
//           >
//             UPLOAD {selectedImages.length} IMAGE
//             {selectedImages.length === 1 ? "" : "S"}
//           </button>
//         ))}

//       <div className="images">
//         {selectedImages &&
//           selectedImages.map((image, index) => {
//             return (
//               <div key={image} className="image">
//                 <img src={image} height="200" alt="upload" />
//                 <button
//                   onClick={() =>
//                     setSelectedImages(selectedImages.filter((e) => e !== image))
//                   }
//                 >
//                   delete image
//                 </button>
//                 <p className>{index + 1}</p>
                
//               </div>
              
              
//             );
//           })}
//       </div>
     
//     </section>
//   );
// };

// export default App;
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';



// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );

// export default function BasicCard() {
//   return (
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//           Word of the Day
//         </Typography>
//         <Typography variant="h5" component="div">
//           be{bull}nev{bull}o{bull}lent
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           adjective
//         </Typography>
//         <Typography variant="body2">
//           well meaning and kindly.
//           <br />
//           {'"a benevolent smile"'}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//   );
// }



