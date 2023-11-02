import React from 'react';

const Card = ({ image, title, address }) => {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <div className="card-info">
        <h2>{title}</h2>
        <p>{address}</p>
      </div>
    </div>
  );
}

export default Card;