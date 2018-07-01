import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

export default class Photos extends Component {
  renderPhoto(photos){
    if(!photos || photos.length < 1) return (
      <div className="thumbnail-photo">
        <div>Add Photo</div>
      </div>
    )

    return (
      <div className="thumbnail-photo">
        <div style={{backgroundImage: `url(${photos[0].imageUrl})`}}></div>
      </div>
    )
  }
  render() {
    const {photos} = this.props

    return (
      this.renderPhoto(photos)
    )
  }
}

Photos.propTypes = {
  photos: PropTypes.array
}
