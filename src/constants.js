/**
 * npm run start-dev runs the web and api on a different server
 * npm run start-prod runs the web and api on the same server
 */

const URL = window.location.href.split("/")[0] + "//" + window.location.href.split("/")[2]

export const urlHost = 
  process.env.NODE_ENV === 'development' ? 
  'http://localhost:3100'
  :
  URL