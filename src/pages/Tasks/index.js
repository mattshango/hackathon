import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Page from '../'
import './style.scss'

import { getTasks, addTask, removeTask, updateTask } from '../../ducks/app'

class TasksPage extends Component {
  constructor(props){
    super(props)

    this.taskEntry = this.taskEntry.bind(this)
    this.completeEntry = this.completeEntry.bind(this)
    this.incompleteEntry = this.incompleteEntry.bind(this)
    this.removeEntry = this.removeEntry.bind(this)
    this.addEntry = this.addEntry.bind(this)
    this.renderTasks = this.renderTasks.bind(this)
    this._handleKeyPress = this._handleKeyPress.bind(this)
  }
  state = {
    show: 'all',
    inputText: '',
  }

  componentDidMount(){
    // Get Tasks
    this.props.getTasks()
  }

  // Add task entry
  addEntry(){
    const task = this.state.inputText.trim()

    // Return if empty
    if(task.length < 1) return

    // Add task
    this.props.addTask({task})

    // Reset text
    this.setState({inputText: ""})
  }

  // Remove task entry
  removeEntry(id){
    // Remove task
    this.props.removeTask(id)
  }

  // Complete task entry
  completeEntry(id){
    // Complete task
    this.props.updateTask(id, true)
  }

  // Incomplete task entry
  incompleteEntry(id){
    // Incomplete task
    this.props.updateTask(id, false)
  }

  // Create task entry
  taskEntry(item, index){
    return (
      <div 
        className="entry" 
        onClick={() => item.completed ? this.incompleteEntry(item._id) : this.completeEntry(item._id)}
        key={index}
      >
        <div className="row">
          <div className="col-sm-10">
            <div className={`entry__text${item.completed ? "--checked" : ""}`}>{item.task}</div>
          </div>
          <div className="col-sm-2">
            <button 
              type="button" 
              className="btn btn-danger"
              onClick={() => this.removeEntry(item._id)}
            >
            &#215;
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Display task entries
  renderTasks(tasks){
    const list = []
    const show = this.state.show
    
    tasks.forEach((item, index) => {
      if(show === "all"){
        list.push(this.taskEntry(item, index))
      }
      else if(show === "completed"){
        if(item.completed){
          list.push(this.taskEntry(item, index))
        }
      }else{
        if(!item.completed){
          list.push(this.taskEntry(item, index))
        }
      }
    })

    return list
  }

  // On Key Press
  _handleKeyPress(event){
    // On Enter
    if (event.key === 'Enter') {
      this.addEntry()
    }
  }

  render() {
    return (
      <Page>
        <Helmet title="Tasks" />
        <div className="container">
          <div className="row">
            <div className="col-sm-6" style={{textAlign: "left"}}>
              <h1 className="dashboard-h1--left">Tasks</h1>
            </div>
            <div className="col-sm-6" style={{textAlign: "right", marginTop: "30px"}}>
              <Link to="/">
                <button type="button" className="btn btn-dark">Back</button>
              </Link>
            </div>
            <div className="col-12 sports">
              <div className="tasks__input-container">
                <div className="input-group">
                <input
                  type="text"
                  className="form-control tasks__input"
                  placeholder="Enter a task"
                  value={this.state.inputText}
                  onChange={({target}) => this.setState({inputText: target.value})}
                  onKeyPress={this._handleKeyPress}
                />
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={this.addEntry}
                >
                Add
                </button>
                </div>
              </div>
              <div className="form-group tasks__bottom-container">
                <label>Show:</label>
                <select 
                  className="form-control" 
                  value={this.state.show}
                  onChange={({target}) => this.setState({show: target.value})}
                >
                  <option value="all">All</option>
                  <option value="incomplete">Incomplete</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="tasks__list">
                {this.renderTasks(this.props.tasks)}
              </div>
            </div>
          </div>
        </div>
      </Page>
    )
  }
} 

TasksPage.propTypes = {
  tasks: PropTypes.array,
}

const mapStateToProps = state => ({
  tasks: state.app.tasks,
})

export default connect(mapStateToProps, 
  { 
    getTasks,
    addTask,
    removeTask,
    updateTask
  }
)(TasksPage)