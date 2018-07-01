import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { checkAuth } from '../ducks/app'
import Layout from '../components/Layout'

class Page extends Component {
  componentWillMount(){
    this.props.checkAuth()
  }
  render() {
    return (
      <Layout>
        {this.props.children}
      </Layout>
    )
  }
}

Page.propTypes = {
  children: PropTypes.any
}

export default connect(null, {
  checkAuth
})(Page)