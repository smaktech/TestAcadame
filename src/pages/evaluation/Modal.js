import React from "react";
import { FormControl, Form,  } from "react-bootstrap";
import { getQuestion } from '../../api/Question/Question';
import {  getSingleAnswer, getAnswerapi } from '../../api/Answer/Answer'
import "./Modal.css";
import { useState, useEffect, forwardRef, useRef } from 'react'
import { useParams } from 'react-router'
function Modal2({ setOpenModal }) {
    const [hint, setHint] = useState([]);
    const [allanswer, setAllanswer] = useState();

    const { id } = useParams();


    useEffect(() => {
        // setDataLoading(true);
        // setNoCourses(false);
        //  // fetching All answer and questions
        getSingleAnswer(id).then((res) => {

            // console.log('coursesData', res);
            if (res.status) {
                //  //setting the fetched Topics into state variable
                // setAnswertable(res.results)
                setHint(res.results.hint);
                // setMarks(res.results.marks);
                // setType(res.results.type);
              
                    // setAllanswer(res.results);
                   
                
                
              
                
                console.log('getSingleAnswer data state', allanswer);
                // setTotalPages(res.results.totalPages);

            } else {
                //  //setting no Topic found variable true
                setNoCourses(true);
            }
            
            setDataLoading(false);
        })
            .catch((err) => {
                // console.error(err);
            });
    })


  return (
    <>
  
   
    <div className="modalBackground">
     
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
       
        <div className="title">
          <h4 >Answer Part details</h4>
        </div>
        
   
     
      <div class="modal-body">
        <Form.Label>Hint</Form.Label>
        <FormControl type="text"  value={hint} onChange={(e) => setHint(e.target.value)} ></FormControl>
        
      </div>
      <div class="modal-body">
      <Form.Label>Type</Form.Label>
        <FormControl  type="text"  ></FormControl>
      </div>
      <div class="modal-body">
      <Form.Label>Marks</Form.Label>
        <FormControl type="text"  ></FormControl>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
      </div>
    </div>
  
    
 
    </>
    );
}

export default Modal2;