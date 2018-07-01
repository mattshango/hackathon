// Convert CSV to JSON
export const csvToObj = csv => {
  const lines = csv.split("\n")
  const headers = lines[0].split(",")
  const result = []

  for(let i=1;i<lines.length-1;i++){
	  let obj = {}
    const currentline=lines[i].split(",")
    
	  for(let j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j]
	  }
	  result.push(obj)
  }
  
  return result
}

// If in array
export const inArray = (target, array) => {
  for(let i = 0; i < array.length; i++) {
    if(array[i] === target)  return true
  }
  return false
}

// Get List of Teams
export const getListOfTeams = data => {
  const teams = []

  data.forEach(game => {
    if(!inArray(game.HomeTeam, teams)) teams.push(game.HomeTeam)
    if(!inArray(game.AwayTeam, teams)) teams.push(game.AwayTeam)
  })

  return teams
}

// Get List of Teams Won Against
export const getListOfTeamsWonAgainst = (team, data) => {
  // If nothing
  if(team.trim().length === 0) return []

  // Get data of on selected team
  const teamsWonAgainst = []

  // Loop through data
  data.forEach(game => {
    if(game.HomeTeam.toLowerCase().trim() === team.toLowerCase().trim()){
      if(game.FTR === "H"){
        teamsWonAgainst.push(`(Home) ${game.AwayTeam}: ${game.FTHG} - ${game.FTAG} | ${game.Date}`)
      }
    }
    else if(game.AwayTeam.toLowerCase().trim() === team.toLowerCase().trim()){
      if(game.FTR === "A"){
        teamsWonAgainst.push(`(Away) ${game.HomeTeam}: ${game.FTHG} - ${game.FTAG} | ${game.Date}`)
      }
    }
  })

  return teamsWonAgainst
}

// Generate 3 Different Colours
export const bgColours = clothes =>{
  const backgroundColours = []
  for(let i = 0; i < clothes.length; i++){
    const randomNum1 = Math.floor((Math.random() * 255) + 1)
    const randomNum2 = Math.floor((Math.random() * 255) + 1)
    const randomNum3 = Math.floor((Math.random() * 255) + 1)
    backgroundColours.push(`rgba(${randomNum1},${randomNum2},${randomNum3},0.2)`)
  }
  return backgroundColours
}

// Get First Team Data
export const chooseFirstTeamData = data => {
  if(data.length < 1) return {}

  const teams = getListOfTeams(data)
  const firstTeam = teams[0]
  const teamVictories = getListOfTeamsWonAgainst(firstTeam, data)
  const randomVictory = teamVictories[Math.floor((Math.random() * teamVictories.length-1) + 1)]

  return {
    firstTeam,
    randomVictory
  }
}