import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './style.scss'
import Page from '../'
import Card from '../../components/Card'
import Headline from '../../components/Thumbnails/Headline'
import Photos from '../../components/Thumbnails/Photos'
import Tasks from '../../components/Thumbnails/Tasks'
import Weather from '../../components/Thumbnails/Weather'
import Clothes from '../../components/Thumbnails/Clothes'
import sunIcon from '../../assets/images/sun_icon.png'
import rainIcon from '../../assets/images/rain_icon.png'
import cloudsIcon from '../../assets/images/clouds_icon.png'

import { getClothes, getNews, getTeams, getWeather, logoutUser, getTasks, getImages } from '../../ducks/app'
import { chooseFirstTeamData, bgColours } from '../../helpers'

class HomePage extends Component {
  componentDidMount(){
    // Get Clothes
    this.props.getClothes()
    // Get News
    this.props.getNews()
    // Get Teams
    this.props.getTeams()
    // Get Weather
    this.props.getWeather()
    // Get Tasks
    this.props.getTasks()
    // Get Images
    this.props.getImages(this.props.username)
  }

  // Choose Weather Icon
  chooseWeatherIcon(text){
    switch(text){
      case "Clouds": return cloudsIcon
      case "Clear": return sunIcon
      case "Rain": return rainIcon
      case "Sunny": return sunIcon
      default: return sunIcon
    }
  }

  render() {
    // Data for Pie Chart
    const data = {
      datasets: [{
          data: Object.values(this.props.clothes),
          backgroundColor: bgColours(Object.values(this.props.clothes)),
      }],
      labels: Object.keys(this.props.clothes)
    }

    return (
      <Page>
        <Helmet title="Home" />
        <div className="container">
          <h1 className="dashboard-h1">{`Good day ${this.props.username}`}</h1> 
          <div className="logout">
            <button 
              className="btn btn-primary logout__btn"
              onClick={() => this.props.logoutUser()}
            >
              Logout
            </button>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <Card title='Weather'>
                <Weather
                  icon={this.chooseWeatherIcon(this.props.weather.status)}
                  degrees={`${this.props.weather.temp} Degrees`}
                  city={this.props.weather.city}
                />
              </Card>
            </div>
            <div className="col-sm-4">
              <Link to="/news" style={{ textDecoration: 'none', color:'white' }}>
                <Card title='News'>
                  <Headline title={this.props.news.title}>
                    {this.props.news.description}
                  </Headline>
                </Card>
              </Link>
            </div>
            <div className="col-sm-4">
              <Link to="/sports" style={{ textDecoration: 'none', color:'white' }}>
                <Card title="Football">
                  <Headline title={this.props.firstTeamData.firstTeam}>
                    {this.props.firstTeamData.randomVictory}
                  </Headline>
                </Card>
              </Link>
            </div>
            <div className="col-sm-4">
              <Link to="/photos" style={{ textDecoration: 'none', color:'white' }}>
                <Card title="Photos">
                  <Photos 
                    photos={this.props.photos}
                  />
                </Card>
              </Link>
            </div>
            <div className="col-sm-4">
              <Link to="/tasks" style={{ textDecoration: 'none', color:'white' }}>
                <Card title='Tasks'>
                  <Tasks tasksArray={this.props.tasks} />
                </Card>
              </Link>
            </div>
            <div className="col-sm-4">
              <Link to="/clothes" style={{ textDecoration: 'none', color:'white' }}>
                <Card title='Clothes'>
                  <Clothes data={data} />
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </Page>
    );
  }
} 

HomePage.propTypes = {
  username: PropTypes.string,
  clothes: PropTypes.object,
  news: PropTypes.objectOf(PropTypes.string),
  firstTeamData: PropTypes.objectOf(PropTypes.string),
  weather: PropTypes.object,
  tasks: PropTypes.array,
  photos: PropTypes.array,
}

const mapStateToProps = state => ({
  username: state.app.username,
  clothes: state.app.clothes,
  news: state.app.news,
  firstTeamData: chooseFirstTeamData(state.app.teams),
  weather: state.app.weather,
  tasks: state.app.tasks,
  photos: state.app.photos,
})

export default connect(mapStateToProps, 
  { 
    getClothes,
    getNews,
    getTeams,
    getWeather,
    getTasks,
    getImages,
    logoutUser
  }
)(HomePage)