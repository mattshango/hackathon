import { createAction, createReducer } from 'redux-act'
import Parser from '../rss-parser/parser'
import axios from 'axios'
import { push } from 'react-router-redux'

import { csvToObj } from '../helpers'
import { urlHost } from '../constants'

import FootballData from '../pages/Sports/football_data.csv'

const REDUCER = 'app'
const NS = `@@${REDUCER}/`

const setLoginError = createAction(`${NS}SET_LOGIN_ERROR`)

const setAccount = createAction(`${NS}SET_ACCOUNT`)
const setClothes = createAction(`${NS}SET_CLOTHES`)

const setPhotos = createAction(`${NS}SET_PHOTOS`)
const addPicture = createAction(`${NS}ADD_PICTURE`)

const setTasks = createAction(`${NS}SET_TASKS`)

const setTeams = createAction(`${NS}SET_TEAMS`)
const setNews = createAction(`${NS}SET_NEWS`)
const setWeather = createAction(`${NS}SET_WEATHER`)

// Check for JWT (JSON WEB TOKEN) on every page (Persistent)
export const checkAuth = () => (dispatch, getState) => {
  const state = getState()

  if(state.router.location.pathname.startsWith("/login") || 
      state.router.location.pathname.startsWith("/register")
    ){
      if(state.app.isAuthenticated) return dispatch(push("/"))
      else return
    }

  axios.get(`${urlHost}/api/auth/me`,
    {
      headers: {
        "x-access-token": window.localStorage.getItem("app.token"),
      }
    }
  ).then(response => {
    if(response.data.hasOwnProperty("auth")){
      if(!response.data.auth) 
        return dispatch(push(`/login/${encodeURIComponent(state.router.location.pathname)}`))
    }
    dispatch(setAccount(response.data.username, true))
  }).catch(() => {
    dispatch(push(`/login/${encodeURIComponent(state.router.location.pathname)}`))
  })
}

// Logout User
export const logoutUser = () => (dispatch) => {
  axios.get(`${urlHost}/api/auth/logout`)
  .then(response => {
    dispatch(setAccount("", response.data.auth))
    window.localStorage.setItem("app.token", response.data.token)
    window.localStorage.setItem("app.username", "")
    dispatch(push("/login"))
  }).catch(() => {
    dispatch(setAccount("", false))
    window.localStorage.setItem("app.token", null)
    dispatch(push("/login"))
  })
}

// Register User
export const registerUser = data => (dispatch) => {
  axios.post(`${urlHost}/api/auth/register`, data)
  .then(response => {
    dispatch(setAccount(data.username, response.data.auth))
    // Set Token and Username to local storage
    window.localStorage.setItem('app.token', response.data.token)
    window.localStorage.setItem('app.username', data.username)
    return dispatch(push("/"))
  })
  .catch(err => {
    console.log(err)
  })
}

// Login User
export const loginUser = data => (dispatch) => {
  axios.post(`${urlHost}/api/auth/login`, data)
  .then(response => {
    // If errors
    if(response.data.error) return dispatch(setLoginError(response.data.error))

    // Set account details
    dispatch(setAccount(data.username, response.data.auth))

    // Set Token and username to local storage
    window.localStorage.setItem('app.token', response.data.token)
    window.localStorage.setItem('app.username', data.username)

    // Remove Login error if exist
    dispatch(setLoginError(""))

    // Go to previous page
    if(data.callback) return dispatch(push(decodeURIComponent(data.callback)))
    
    dispatch(push("/"))
  })
  .catch(err => {
    dispatch(setLoginError("Issue with server, please try again"))
  })
}

// Get Clothes
export const getClothes = () => (dispatch, getState) => {
  const url = `${urlHost}/api/general/clothes/${getState().app.username}`
  axios.get(url)
  .then(response => {
    const clothes = {}
    response.data.payload.forEach(item => {
      if(!clothes.hasOwnProperty(item.clothe)){
        clothes[item.clothe] = 1
      }else{
        clothes[item.clothe]++
      }
    })
    dispatch(setClothes(clothes))
  })
  .catch(err => {
    console.log(err)
  })
}


// Get News
export const getNews = () => (dispatch) => {
  const parser = new Parser({
    customFields: {
      item: [
        ['media:thumbnail', 'media:thumbnail', {keepArray: true}],
      ]
    }
  })

  const url = `${urlHost}/api/general/news`

  axios.get(url).then(response => {
    parser.parseString(response.data)
    .then(result => {
      dispatch(setNews({
        title: result.items[0].title,
        description: result.items[0].content,
        image: result.items[0]["media:thumbnail"][0].$.url
      }))
    }).catch(err => {
      console.log(err)
    })
  }).catch(err => {
    console.log(err);
  })
  
}

// Get Teams
export const getTeams = () => (dispatch) => {
  axios.get(FootballData)
  .then(response => {
    dispatch(setTeams(csvToObj(response.data)))
  }).catch(err => {
    console.log(err)
  })
}

// Get Weather 
export const getWeather = () => (dispatch) => {
  const secret = "d0a10211ea3d36b0a6423a104782130e"
  axios.get(`${urlHost}/api/general/weather/${secret}`)
  .then(response => {
    dispatch(setWeather({
      city: response.data.name,
      temp: parseInt(response.data.main.temp - 273.15, 10),
      status: response.data.weather[0].main
    }))
  }).catch(err => {
    console.log(err)
  })
}

// Get Tasks
export const getTasks = () => (dispatch, getState) => {
  let username = getState().app.username
  if(username.length === 0 && window.localStorage.getItem("app.username")) username = window.localStorage.getItem("app.username")
  if(username.length === 0) return

  axios.get(`${urlHost}/api/tasks/${username}`)
  .then(response => {
    dispatch(setTasks(response.data))
  }).catch(() => {
    dispatch(setTasks([]))
  })
}


// Add Task
export const addTask = (data) => (dispatch, getState) => {
  data.username = getState().app.username

  axios.post(`${urlHost}/api/tasks`, data).then(response => {
    dispatch(setTasks(response.data))
  }).catch(() => {
    dispatch(setTasks([]))
  })
}

// Remove Task
export const removeTask = id => (dispatch, getState) => {
  const username = getState().app.username

  axios.delete(`${urlHost}/api/tasks/${id}/${username}`)
  .then(response => {
    dispatch(setTasks(response.data))
  }).catch(() => {
    dispatch(setTasks([]))
  })
}

// Update Task
export const updateTask = (id, completed) => (dispatch, getState) => {
  const username = getState().app.username

  axios.put(`${urlHost}/api/tasks/${id}`, {username, completed})
  .then(response => {
    dispatch(setTasks(response.data))
  }).catch(() => {
    dispatch(setTasks([]))
  })
}

// Get Images
export const getImages = usernameInput => dispatch => {
  let username = usernameInput
  if(username.length === 0 && window.localStorage.getItem("app.username")) username = window.localStorage.getItem("app.username")
  if(username.length === 0) return

  axios.get(`${urlHost}/api/images/${username}`)
  .then(response => {
    dispatch(setPhotos(response.data))
  }).catch(() => {
    dispatch(setPhotos([]))
  })
}

// Upload Image
export const uploadImage = (file, filename) => (dispatch, getState) => {
  let formData = new FormData();
  formData.append('file', file, filename)
  axios.post(`${urlHost}/api/images/${getState().app.username}`, formData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }).then(response => {
    dispatch(setPhotos(response.data))
  }).catch(() => {
    dispatch(setPhotos([]))
  })
}


const INITIAL_STATE = {
  username: "",
  isAuthenticated: false,
  loginError: "",

  clothes: {},
  photos: [],
  tasks: [],
  teams: [],
  news: {},
  weather: {}
}

export default createReducer (
  {
    [setAccount]: (state, username, isAuthenticated) => ({...state, username, isAuthenticated}),
    [setLoginError]: (state, loginError) => ({...state, loginError}),
    [setClothes]: (state, clothes) => ({...state, clothes}),
    [setPhotos]: (state, photos) => ({...state, photos}),
    [setTasks]: (state, tasks) => ({...state, tasks}),
    [setNews]: (state, news) => ({...state, news}), 
    [setTeams]: (state, teams) => ({...state, teams}), 
    [setWeather]: (state, weather) => ({...state, weather}), 
    [addPicture]: (state, picture) => ({...state, pictures: [picture, ...state.pictures]}),
  }, 
  INITIAL_STATE
)