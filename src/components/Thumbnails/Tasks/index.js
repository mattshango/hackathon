import React from 'react'
import './style.scss'

const Tasks = ({tasksArray}) => {
  return (
    <ol className="tasks">
      {taskList(tasksArray)}
    </ol>
  )
}

const truncateText = (text, limit = 40, delimiter = '...') => {
  if(text.length > limit) return `${text.substring(0, limit)}${delimiter}`

  return text
}

const taskList = tasksArray => {
  const taskList = []

  const length = tasksArray.length > 5 ? 5 : tasksArray.length

  for(let i = 0; i < length; i++){
    taskList.push(
      <li className="tasks__item" key={i}>{truncateText(tasksArray[i].task)}</li>
    )
  }
  
  return taskList
}

export default Tasks