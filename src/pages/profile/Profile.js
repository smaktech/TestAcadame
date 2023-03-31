import React, {useState, useEffect, useRef } from 'react'
import {Modal as BootstrapModal} from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import {useSelector,useDispatch} from 'react-redux'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import {updatePassword,changeName,uploadImage,removeImage} from '../../api/Profile/Profile'
import Loader from "react-loader-spinner";
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import {imageBaseUrl, modalStyle} from '../../config'; 


import CloseIcon from '@mui/icons-material/Close';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'; 
import { Button, Typography } from '@mui/material'
import useAuth from 'src/hooks/useAuth'

export default function Profile() {
    const { user, updateProfile } = useAuth();
    const userDetails = user;
    const [isVisiblePassword, setIsVisiblePassword] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [modalShow4Status ,setModalShow4Status] = useState(false)
    const [imageFile, setImageFile] = useState(null)

    const dispatch = useDispatch();
   

    //input fields variable
    const [password, setRecentPassword] = useState('');
    const [newPassword , setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const navigate =  useNavigate()

    //storing the user details into variable from global state using redux
    // const authStatus = useSelector((state) => state.user.authStatus)
    // const userDetails = useSelector((state) => state.user.userDetails);
    // const userAccessToken = useSelector((state) => state.user.accessToken);
    const [name, setUserName] = useState(userDetails?.name);
    const email = userDetails?.email
    const userId = userDetails?._id;

    const [userProfileImg, setUserProfileImg] = useState(null)

    //loader for setting profileImage
    const [imageLoader , setImageLoader] =  useState(false)
    const [removeLoader , setRemoveLoader] = useState(false);

    //  Positions of the snacbar after successful saving of name
    const [vertical , setVertical] = useState('bottom');
    const [horizontal , setHorizontal] = useState('center');

    //snackbar
    const [open , setOpen] = useState(false);
    const [snackbarMessage,setSnackbarMessage] = useState('')

    //loader for save change password!
    const [loader, setloader] = useState(false);

    //shows error when admin try to change password
    const [errorMessage , setErrorMessage] = useState('');
    const [showError , setShowError] = useState();

    // console.log(userDetails,userAccessToken);
    let userImageRef = useRef()


    useEffect(() =>{
         if(userDetails)
         {
            if(userDetails.profileImage.includes('https://')||userDetails.profileImage.includes('http://'))
            {
                setUserProfileImg(userDetails.profileImage)
            }else
            {
                setUserProfileImg(`${imageBaseUrl}/${userDetails.profileImage}`)
            }
         }
       
         
    },[userDetails])
    // function to upload selected photo in the photo frame
    const onFileChange=(e)=>{
        let url = URL.createObjectURL(e.target.files[0]);
        // console.log(e.target.files)
        setImageFile(e.target.files[0]);
        setUserProfileImg(url);
     }


    // function to change admin password!
     function changeAdminPassword(){
        setloader(true);
        setShowError(false);
        //check whether the input fileds are empty or not!
        if(password == '' || newPassword == '' || confirmPassword == ''){
            setErrorMessage('Please Fill all the fields!');
            setShowError(true);
            setloader(false);
        }
        else
        {
            //check whether the both new passwords matches or not
            if(newPassword != confirmPassword)
            {
                setErrorMessage('Password does not match!');
                setShowError(true);
                setloader(false);
            }
            else
            {
                //check whether the new password is of min 8 characters or not
                if(newPassword.length < 8){
                    setErrorMessage('Password should be of min 8 characters!');
                    setShowError(true);
                    setloader(false);
                }
                //processing the change password request using API
                else
                {   
                    updatePassword({ email, password,newPassword })
                        .then((res) => {
                            setloader(false);
                            // console.log('res',res);
                                if(res.status){
                                    //displaying the modal for successful changes
                                    setModalShow4Status(true);
                                }
                                else
                                {  
                                    //displaying error on invalid password 
                                    setErrorMessage(res.message);
                                    setShowError(true);
                                }
                        
                        })
                        .catch((err) => {
                            setloader(false);
                            console.error(err);
                        });
                }
            }
            setloader(false);
        }
     }

     //  function to change the name of the admin on blur of the input field
     function handleBlur(){
        if(name != '') {
            changeName(userId,{ name })
                        .then((res) => {
                            // console.log('res',res);
                                // console.log('data',data);
                                if(res.status){
                                    //displaying the snackbar for successful changes
                                    setSnackbarMessage("Name changed successfully!")
                                    updateProfile({...userDetails,name})
                                    setOpen(true);
                                }
                                else
                                {  
                                    //displaying error on invalid password 
                                    setErrorMessage(res.message);
                                    setShowError(true);
                                }
                        
                        })
                        .catch((err) => {
                            setloader(false);
                            console.error(err);
                        });
        }
     }

     // function to upload user ew profile pic on the server with api
     function uploadProfilePic() {
         console.log(imageFile)
        setImageLoader(true);
        if(imageFile !=null )
        {
            uploadImage(userId,imageFile)
                .then((res) => {
                    // console.log("res",res);
                    if(res.status)
                    { 
                        //setting the new image url in the state variable 
                        //showing the profile updated modal after successful uploading of image!
                        setImageLoader(false);
                        setUserProfileImg(imageBaseUrl+res.imagePath);
                        // dispatch({ type: SET_USER_PROFILE_PIC, payload: { profileImage: res.imagePath } });
                        updateProfile({...userDetails,profileImage:imageBaseUrl+res.imagePath})
                        setModalShow(false);
                        setModalShow4Status(true);
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        }
        else
        {
            alert("File not selected!");
            setImageLoader(false);
        }
     }

     //function that removes the userImage from the server
     function removeUserImage() {
         setRemoveLoader(true);
         removeImage(userId)
            .then((res)=>{
                console.log('res',res)
                if(res.status)
                {
                    //after successfully removing the file changing the state variable as well
                    setRemoveLoader(false);
                    setUserProfileImg("")
                    updateProfile({...userDetails,profileImage:null})
                }
                else
                {
                    setRemoveLoader(false);
                }
                
            })
            .catch((err) => {
                console.error(err);
                setRemoveLoader(false);
            })
     }

    return (
        <>

        <div className="px-3 ">
           <h5 className="mt-3 txt-5282F0 fw-bold">Profile</h5>
           <hr className="mt-4" />
           <div className="d-flex align-items-center">
                <div onClick={()=>setModalShow(true)}>
                    <img src={userProfileImg?(userProfileImg):("/Assets/userProfile.png")}  className="rounded-circle" width="180" />
                </div>
                <div className="ms-3">
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label htmlFor="userName" class="col-form-label txt-5282F0">Name :</label>
                        </div>
                        <div className="col-auto mt-3">
                            <input type="text" className="form-control txt-5282F0" value={name} 
                            onChange={(e) => setUserName(e.target.value)} onBlur={handleBlur}/>
                        </div>
                    </div>
                    <div className="d-flex mt-3 txt-5282F0">
                        <p>Email address: &nbsp; </p>
                        <p>{email}</p>
                    </div>
                </div>
           </div>
           <hr />

           <h5 className="mt-4 txt-5282F0 fw-bold">Change Password</h5>
            <div className="container">
            {
                    (showError)?
                    <div class="row pt-2 ">
                    <div class="col-md-5    col-sm-12 clr-danger-100">
                       <div class="   text-center">
                           {errorMessage}
                       </div>
                    </div>
                    
                    </div>

                    :
                   <> </>
                }
            </div>
            <div className="row mt-4">
                <div className="col-lg-4 pe-5">
                <div class="input-group" id="show_hide_password">
                    <input type={isVisiblePassword?("text"):("password")} className="form-control txt-5282F0" placeholder="Current Password" onChange={(e) => setRecentPassword(e.target.value)}/>
                    <div class="input-group-addon mt-2" style={{marginLeft: -30, zIndex:3}}>
                        <i class={isVisiblePassword?("fa fa-eye-slash txt-5282F0"):("fa fa-eye txt-5282F0")} aria-hidden="true" onClick={()=>setIsVisiblePassword(!isVisiblePassword)}></i>
                    </div>
                </div>
                </div>

                <div className="col-lg-8"></div>
            
                

                <div className="col-lg-4 pe-5 mt-5">
                <div class="input-group" id="show_hide_password">
                    <input type={isVisiblePassword?("text"):("password")} className="form-control txt-5282F0" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)}/>
                    <div class="input-group-addon mt-2" style={{marginLeft: -30, zIndex:3}}>
                        <i class={isVisiblePassword?("fa fa-eye-slash txt-5282F0"):("fa fa-eye txt-5282F0")} aria-hidden="true" onClick={()=>setIsVisiblePassword(!isVisiblePassword)}></i>
                    </div>
                </div>
                </div>

                <div className="col-lg-4 pe-5 mt-5">
                <div class="input-group" id="show_hide_password">
                    <input type={isVisiblePassword?("text"):("password")} className="form-control txt-5282F0" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <div class="input-group-addon mt-2" style={{marginLeft: -30, zIndex:3}}>
                        <i class={isVisiblePassword?("fa fa-eye-slash txt-5282F0"):("fa fa-eye txt-5282F0")} aria-hidden="true" onClick={()=>setIsVisiblePassword(!isVisiblePassword)}></i>
                    </div>
                </div>
                </div>

            </div>


            <div className="d-flex mt-5">
                <div className="pr-5">
                {loader?(
                    <Button variant="outlined" className="btn btn-primary py-2 px-5 me-3" >
                        <CircularProgress size={20}/>
                    </Button>
                ):(
                    <Button variant="contained" className="btn btn-primary py-2 px-5 me-3" onClick={changeAdminPassword}>Save</Button>
                )}
                </div>
                <div>
                    <Button  variant="outlined" className="btn btn-outline-dark py-2 px-5">Cancel</Button>
                </div>
            </div>

            {/* <Snackbar
                open={open}
                autoHideDuration={6000}
                message={snackbarMessage}
                anchorOrigin={{ vertical, horizontal }}
                onClose={()=>setOpen(false)}
            /> */}

        </div>



        <Modal
            open={modalShow}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onClose={()=>setModalShow(false)}
            >
                <Box sx={modalStyle}>
                   
                    <BootstrapModal.Body>
                        <div className="text-center d-flex justify-content-center" onClick={()=>{userImageRef.click()}}>
                                <img src={userProfileImg?(userProfileImg):("/Assets/userProfile.png")} 
                                className="rounded-circle" width="180"/>
                            
                        </div>
                        <div className="text-center mt-4 pb-3">
                            <input type="file" className="d-none" ref={(ref)=>userImageRef=ref} onChange={(e)=>onFileChange(e)} />
                            {userProfileImg?(
                                <div className="d-flex justify-content-around">
                                    {removeLoader?(
                                        <Button variant="outlined" className="btn btn-outline-primary py-2 px-4" >
                                            <CircularProgress size={20}/>
                                        </Button>
                                    ):(
                                        <Button variant="outlined" className="btn btn-outline-primary py-2 px-4" 
                                        onClick={()=>removeUserImage()}
                                        >Remove</Button>
                                    )}
                                    
                                    {imageLoader?(
                                            <Button variant="outlined" className="btn btn-primary px-4" >
                                                <CircularProgress size={20}/>
                                            </Button>
                                    ):(
                                        <Button variant="contained" className="btn btn-primary px-4"  
                                            // onClick={()=>{setModalShow(false); setModalShow4Status(true)}}
                                            onClick={()=>uploadProfilePic()}
                                            >Changes</Button>
                                    )}
                                    
                                </div>
                            ):(
                                <Button variant="contained"    onClick={()=>{userImageRef.click()}}>Add photo</Button> 
                            )}
                        
                        </div>
                    </BootstrapModal.Body>
                </Box>  
            {/* <Modal.Footer>
                <Button onClick={() => setModalShow(false)}>Close</Button>
            </Modal.Footer> */}
        </Modal>


        {/* modal for Status updated */}

        <Modal
            open={modalShow4Status}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onClose={()=>setModalShow4Status(false)}
            >
                <Box style={modalStyle}>
                    <BootstrapModal.Header className="clr-primary-400 py-2">
                        {/* <Modal.Title id="contained-modal-title-vcenter" className="text-center"> */}
                        
                        {/* <h4 className="text-center   mb-0">
                            Profile update
                        </h4> */}
                        <Grid container>
                            <Grid item xs={11} lg={11} md={11} sm={11}>
                                    <Typography variant="h6"> 
                                        Profile update
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
                            <p>You have successfully updated your profile information</p>                    
                        </div>
                        <div className="text-center mt-4 pb-3">
                            <Button  variant="outlined"className="btn btn-primary px-5"  onClick={()=>setModalShow4Status(false)}>OK</Button> 
                        </div>
                    </BootstrapModal.Body>
                </Box>
        </Modal>


    </>
    )
}
