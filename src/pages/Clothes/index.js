import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pie } from 'react-chartjs-2'
import PropTypes from 'prop-types'

import Page from '../'
import { bgColours } from '../../helpers'
import { getClothes } from '../../ducks/app'

class ClothesPage extends Component {
  componentDidMount(){
    // Get Clothes
    this.props.getClothes()
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

    // Options for Pie Chart
    const options = {
      tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                return `${data.labels[tooltipItem.index]}: ${data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]}/1000 days worn`;
            }
        }
      }, 
      legend: {
          labels: {
              fontColor: 'white'
          }
      }
    }

    return (
      <Page>
        <Helmet title="Clothes" />
        <div className="container">
          <div className="row">
            <div className="col-sm-6" style={{textAlign: "left"}}>
              <h1 className="dashboard-h1--left">Clothes</h1>
            </div>
            <div className="col-sm-6" style={{textAlign: "right", marginTop: "30px"}}>
              <Link to="/">
                <button type="button" className="btn btn-dark">Back</button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8" style={{margin: 'auto'}}>
              <Pie data={data} options={options} />
            </div>
          </div>
        </div>
      </Page>
    )
  }
} 

ClothesPage.propTypes = {
  clothes: PropTypes.object
}

const mapStateToProps = state => ({
  clothes: state.app.clothes,
})

export default connect(mapStateToProps, {getClothes})(ClothesPage)