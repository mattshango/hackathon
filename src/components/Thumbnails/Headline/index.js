import React from 'react'
import './style.scss'

const Headline = ({title, children}) => {
  return (
    <div>
      <div className="headline__title">
        {title}
      </div>
      <div className="headline__description">
        {children}
      </div>
    </div>
  )
}

export default Headline