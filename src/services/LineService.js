import axios from 'axios'

const HTTP = axios.create({
  baseURL: process.env.API_URL
})

const loadedData = { line: [] }

function getBusesDetail () {
  if (loadedData.busesDetail) {
    return loadedData.busesDetail
  }
  return HTTP.get('busses_detail.json').then(response => {
    loadedData.busesDetail = transformBusesResponse(response.data)
    return response.data
  })
}

function getBusesBasic () {
  if (loadedData.busesBasic) {
    return loadedData.busesBasic
  }
  return HTTP.get('busses_basic.json').then(response => {
    loadedData.busesBasic = transformBusesResponse(response.data)
    return loadedData.busesBasic
  })
}

function getLine (lineName) {
  if (loadedData.line[lineName]) {
    return loadedData.line[lineName]
  }
  return HTTP.get(lineName + '.json').then(response => {
    loadedData.line[lineName] = response.data
    return response.data
  })
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

function transformBusesResponse (buses) {
  const newResponse = []
  for (let busesLines of Object.entries(buses)) {
    busesLines[1].map(bus => {
      bus.linieType = busesLines[0]
      newResponse.push(bus)
    })
  }
  return newResponse
}

export default {getBusesDetail, getBusesBasic, getLine, addToFavorite, getFavorites}

