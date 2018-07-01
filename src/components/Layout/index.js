import React from 'react'
import './style.scss'

const Layout = (props) => {
    return (
     <div className="layout">
        <div className="overlay">
          {props.children}
        </div>
      </div>
    )
}

export default Layout