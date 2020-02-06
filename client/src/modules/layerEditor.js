import 'leaflet.pm'
import 'leaflet.pm/dist/leaflet.pm.css'

import {addGeoJSONProps} from './map'

export function addEditorControls(map) {
  map.pm.addControls({
    position: 'topleft',
    drawMarker: false,
    drawPolyline: false,
    drawCircle: false,
  })

  return map
}

var template = `
<label for="input-name">Name:</label>
<input id="input-name" class="popup-input" type="text" />
<button id="button-submit" type="button">Save</button>
`

export function onCreate(map) {
  map.on('pm:create', e => {
    const {shape, layer} = e
    addGeoJSONProps(layer)

    layer.pm.enable()
    debugger

    // TODO: create editor popup
    layer.bindPopup(template)
    layer.openPopup()

    // fill
    const inputName = document.querySelector('#input-name')
    inputName.value = layer.feature.properties.name
    inputName.addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        e.preventDefault()
        return false
      }
    })
    inputName.addEventListener('keyup', e => {
      layer.feature.properties.name = e.target.value
    })

    var buttonSubmit = document.querySelector('#button-submit')
    buttonSubmit.addEventListener('click', e => {
      layer
        .bindTooltip(layer.feature.properties.name, {
          direction: 'center',
          permanent: true,
        })
        .openTooltip()
      layer.pm.disable()
      layer.closePopup()
      layer.unbindPopup()
      layer._map.pm.toggleControls()
    })

    // hide controls until save
    layer._map.pm.toggleControls()

    // console.log(`Created shape:`, shape);
    // console.log(`Created layer:`, layer);
    // send feature off to be saved to DB
  })

  return map
}

export function stringifyLayer(layer) {
  return JSON.stringify(layer.toGeoJSON())
}
