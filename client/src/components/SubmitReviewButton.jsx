import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SubmitReviewButton = () => {
  return (
    <div>
        <Button as={Link} to="/submitreview" className='bg-[#05b76a] px-3 py-2 rounded-md text-white hover:bg-[#02874D] transition-all duration-500'>Submit a Review!</Button>
    </div>
  )
}

export default SubmitReviewButton;