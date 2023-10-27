import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SubmitButton = () => {
  return (
    <div>
        <Button as={Link} to="/submitspot">Submit a Spot!</Button>
    </div>
  )
}

export default SubmitButton;