import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Page from '../'
import './style.scss'
import { getListOfTeamsWonAgainst, getListOfTeams } from '../../helpers'

import { getTeams } from '../../ducks/app'

class SportsPage extends Component {
  constructor(props){
    super(props)

    this.onTextChange = this.onTextChange.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
    this.renderOptions = this.renderOptions.bind(this)
  }
  state = {
    inputText: '',
    selectedOption: '',
    teamsWonAgainst: [],
    gotResultsOnLaunch: false
  }

  componentDidMount(){
    // Get football teams data
    this.props.getTeams()
  }

  componentDidUpdate(){
    // If didnt get results on launch
    if(!this.state.gotResultsOnLaunch) {
      const teams = getListOfTeams(this.props.teams)

      this.setState({
        selectedOption: teams[0].toLowerCase(),
        teamsWonAgainst: getListOfTeamsWonAgainst(teams[0], this.props.teams),
        gotResultsOnLaunch: true,
      })
    }
  }

  // Render options for select
  renderOptions(teams){
    const options = []

    teams.forEach((team, index) => {
      options.push(<option value={team} key={index}>{team}</option>)
    })

    return options
  }

  // Display teams with data
  renderTeams(teams){
    const list = []
    teams.forEach((team, index) => {
      list.push(<div className="sports__team" key={index}>{team}</div>)
    })
    return list
  }

  // On text input change
  onTextChange(event){
    const team = event.target.value

    this.setState({
      inputText: team,
      teamsWonAgainst: getListOfTeamsWonAgainst(team, this.props.teams)
    })
  }

  // On select change
  onSelectChange(event){
    const team = event.target.value

    this.setState({
      selectedOption: team,
      teamsWonAgainst: getListOfTeamsWonAgainst(team, this.props.teams)
    })
  }


  render() {
    return (
      <Page>
        <Helmet title="Sports" />
        <div className="container">
          <div className="row">
            <div className="col-sm-6" style={{textAlign: "left"}}>
              <h1 className="dashboard-h1--left">Sports</h1>
            </div>
            <div className="col-sm-6" style={{textAlign: "right", marginTop: "30px"}}>
              <Link to="/">
                <button type="button" className="btn btn-dark">Back</button>
              </Link>
            </div>
            <div className="col-12 sports">
              <div className="sports__input-container">
                <input
                  type="text"
                  className="form-control sports__input"
                  placeholder="Enter football team"
                  value={this.state.inputText}
                  onChange={this.onTextChange}
                />
                <select 
                  className="form-control" 
                  value={this.state.selectedOption}
                  onChange={this.onSelectChange}
                >
                  {this.renderOptions(getListOfTeams(this.props.teams))}
                </select>
              </div>
              <h4 style={{textAlign: 'center'}}>Victories Against:</h4>
              <div className="sports__teams">
                {this.renderTeams(this.state.teamsWonAgainst)}
              </div>
            </div>
          </div>
        </div>
      </Page>
    )
  }
} 

SportsPage.propTypes = {
  teams: PropTypes.array,
}

const mapStateToProps = state => ({
  teams: state.app.teams
})

export default connect(mapStateToProps, 
  { 
    getTeams
  }
)(SportsPage)