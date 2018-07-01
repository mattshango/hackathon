import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Page from '../'
import { uploadImage, getImages } from '../../ducks/app'
import addIcon from '../../assets/images/plus_button.png'
import './style.scss'

class PhotosPage extends Component {
  constructor(props){
    super(props);

    this.handlePhoto = this.handlePhoto.bind(this);
  }

  componentDidMount(){
    this.props.getImages(this.props.username)
  }

  handlePhoto(e){
    const file = e.target.files[0]
    if(!file) return
    
    if(!file.type.startsWith('image')) return alert("Images Only")

    const getImageExtension = file.name.split(".")[file.name.split(".").length-1]
    const filename = `${this.props.username}__${this.props.photos.length+1}--${new Date().getTime()}.${getImageExtension}`
    
    this.props.uploadImage(file, filename)
  }


  renderPhotos(photos){
    const list = []
    photos.forEach((photo, index) => {
      list.push(
        <div key={index} className="col-sm-4">
          <div className="photo__image" style={{backgroundImage: `url(${photo.imageUrl})`}} alt={photo}></div>
        </div>
      )
    })
    return list
  }

  render() {
    return (
      <Page>
        <Helmet title="Photos" />
        <div className="container">
          <div className="row">
            <div className="col-sm-6" style={{textAlign: "left"}}>
              <h1 className="dashboard-h1--left">Photos</h1>
            </div>
            <div className="col-sm-6" style={{textAlign: "right", marginTop: "30px"}}>
              <Link to="/">
                <button type="button" className="btn btn-dark">Back</button>
              </Link>
            </div>
            <div className="col-sm-12">
                <div className="add-photo">
                  <div className="add-photo__container">
                    <img src={addIcon} style={{width: '22px', marginTop: '10px'}} alt="Add" />
                    <p>Add Photo</p>
                    <input type="file" name="file" className="add-photo__input" onChange={this.handlePhoto} />
                  </div>
                </div> 
            </div>
            {this.renderPhotos(this.props.photos)}
          </div>
        </div>
      </Page>
    )
  }
} 

PhotosPage.propTypes = {
  username: PropTypes.string,
  photos: PropTypes.array,
}

const mapStateToProps = state => ({
  username: state.app.username,
  photos: state.app.photos,
})

export default connect(mapStateToProps, {
  uploadImage,
  getImages
})(PhotosPage)