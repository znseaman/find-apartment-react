import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix leaflet's default icon path problems with webpack
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

export function initMap(options) {
  return L.map('map', options)
}

export function addTileLayer(map) {
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)

  return map
}

export function addGeoJSONProps(layer) {
  layer.feature = {}
  layer.feature.type = 'Feature'
  layer.feature.properties = {}
  layer.feature.properties.name = 'Kitsilano'
}

export function createMarker({ latitude: lat, longitude: lng }) {
  return L.marker([lat, lng])
}
