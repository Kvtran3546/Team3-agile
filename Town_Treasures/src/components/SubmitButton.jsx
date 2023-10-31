import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SubmitButton = () => {
  return (
    <div>
        <Button as={Link} to="/submitspot" className='bg-[#05b76a] px-3 py-2 rounded-md text-white hover:bg-[#02874D] transition-all duration-500'>Submit a Spot!</Button>
    </div>
  )
}

export default SubmitButton;