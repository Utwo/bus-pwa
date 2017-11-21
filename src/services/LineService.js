const loadedData = {line: []}

async function getBusesDetail () {
  if (loadedData.busesDetail) {
    return loadedData.busesDetail
  }
  const response = await fetch(`${process.env.API_URL}/buses_detail.json`)
  loadedData.busesDetail = transformBusesResponse(await response.json())
  return response.body
}

async function getBusesBasic () {
  if (loadedData.busesBasic) {
    return loadedData.busesBasic
  }
  const response = await fetch(`${process.env.API_URL}/buses_basic.json`)
  loadedData.busesBasic = transformBusesResponse(await response.json())
  return loadedData.busesBasic
}

async function getLine (lineName) {
  if (loadedData.line[lineName]) {
    return loadedData.line[lineName]
  }
  const response = await fetch(`${process.env.API_URL}/${lineName}.json`)
  if (response.status !== 200) {
    return
  }
  loadedData.line[lineName] = await response.json()
  return loadedData.line[lineName]
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

function getFavorites () {
  const favorites = []
  const favoriteNameList = localStorage.getItem('myFavorites') ? JSON.parse(localStorage.getItem('myFavorites')) : []
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

export default {getBusesDetail, getBusesBasic, getLine, addToFavorite, getFavorites, isFavorite}

