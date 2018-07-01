import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Page from '../'
import './style.scss'

import { getNews } from '../../ducks/app'

class NewsPage extends Component {
  componentDidMount(){
    // Get News
    this.props.getNews()
  }

  render() {
    return (
      <Page>
        <Helmet title="News" />
        <div className="container">
          <div className="row">
            <div className="col-sm-6" style={{textAlign: "left"}}>
              <h1 className="dashboard-h1--left">News</h1>
            </div>
            <div className="col-sm-6" style={{textAlign: "right", marginTop: "30px"}}>
              <Link to="/">
                <button type="button" className="btn btn-dark">Back</button>
              </Link>
            </div>
            <div className="col-12 news">
              <div className="news__image">
                <img src={this.props.news.image} alt="News" />
              </div>
              <p className="news__headline">
                {this.props.news.title}
              </p>
              <p className="news__description">
                {this.props.news.description}
              </p>
            </div>
          </div>
        </div>
      </Page>
    );
  }
} 

NewsPage.propTypes = {
  news: PropTypes.objectOf(PropTypes.string),
}

const mapStateToProps = state => ({
  news: state.app.news,
})

export default connect(mapStateToProps, { getNews })(NewsPage)