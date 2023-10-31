import React from 'react'
import {Navbar} from '../components'
import {Button, Form, FormGroup} from 'react-bootstrap';
const SubmitSpot = () => {
    function handleSubmit(e) {
        console.log("Spot submitted");
      }
  return (
    <div>
        <h1 className='text-white'>Submit Spot</h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup id="LocationTitle">
                <Form.Label>Location Title</Form.Label>
                <Form.Check
                id="box1"
                type="text"
                required
                />
            </FormGroup>
            <FormGroup id="StreetAddress">
                <Form.Label>Street Address</Form.Label>
                <Form.Check
                id="box2"
                type="text"
                required
                />
            </FormGroup>
            <FormGroup id="City">
                <Form.Label>City</Form.Label>
                <Form.Check
                id="box3"
                type="text"
                required
                />
            </FormGroup>
            <FormGroup id="State">
                <Form.Label>State</Form.Label>
                <Form.Check
                id="box4"
                type="text"
                required
                />
            </FormGroup>
            <FormGroup id="Description">
                <Form.Label>Description</Form.Label>
                <Form.Check
                id="box5"
                type="text"
                required
                />
            </FormGroup>
            <Button type="submit">
              Submit
            </Button>
        </Form>
    </div>
  )
}

export default SubmitSpot