import React from 'react'
import './style.scss'

const Card = ({title, children}) => {
  return (
    <div className="card hackathon-card">
      <div className="card-body hackathon-card__body">
        <h5 className="card-title hackathon-card__title">{title}</h5>
        <div className="card-text hackathon-card__text">{children}</div>
      </div>
    </div>
  );
}

export default Card;