let loadedData = []
let isLoadedAllData = false

async function getBuses () {
  if (isLoadedAllData) {
    return loadedData
  }
  const response = await fetch(`${process.env.API_URL}/buses_detail.json`)
  loadedData = transformBusesResponse(await response.json())
  isLoadedAllData = true
  return loadedData
}

async function getLine (lineName) {
  if (!isLoadedAllData) {
    await getBuses()
  }
  for (const line of loadedData) {
    if (line.name === lineName) {
      return line
    }
  }
}

function addToFavorite (lineNumber) {
  const myFavorites = localStorage.getItem('myFavorites') ? JSON.parse(localStorage.getItem('myFavorites')) : []
  if (myFavorites.indexOf(lineNumber) > -1) {
    myFavorites.splice(myFavorites.indexOf(lineNumber), 1)
  } else {
    myFavorites.push(lineNumber)
  }
  localStorage.setItem('myFavorites', JSON.stringify(myFavorites))
}

async function getFavorites () {
  const favorites = []
  const favoriteNameList = localStorage.getItem('myFavorites') ? JSON.parse(localStorage.getItem('myFavorites')) : []
  if (!isLoadedAllData) {
    await getBuses()
  }
  favoriteNameList.map(favoriteName => {
    favorites.push(getLine(favoriteName))
  })
  return Promise.all(favorites)
}

function isFavorite (lineNumber) {
  if (!localStorage.getItem('myFavorites')) {
    return false
  }
  const favoriteNameList = JSON.parse(localStorage.getItem('myFavorites'))
  return favoriteNameList.indexOf(lineNumber) >= 0
}

function transformBusesResponse (buses) {
  const newResponse = []
  for (let busesLines of Object.entries(buses)) {
    busesLines[1].map(bus => {
      bus.lineType = busesLines[0]
      newResponse.push(bus)
    })
  }
  return newResponse
}

export default {getBuses, getLine, addToFavorite, getFavorites, isFavorite}

