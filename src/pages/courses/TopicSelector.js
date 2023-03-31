import React from 'react'
import { Form } from 'react-bootstrap'
import Button from '@restart/ui/esm/Button'

export default function TopicSelector(props) {

    const { topicData, actionForChooseTopic, index, topic } = props


    return (
        <>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Select Topic</Form.Label>
                <Form.Select value={topic._id} onChange={(e) => actionForChooseTopic(e, index)} aria-label="Default select example">
                    <option>Select</option>
                    {topic && topicData.map((item, index) => (
                        <option value={item._id}>{item.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            
        </>
    )
}
