/*export const mapConfig = {
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  gestureHandling: "cooperative",
  backgroundColor: "#f1f1f1",
  zoomControlOptions: {
    style: "SMALL"
  },
  zoom: 17,
  styles: [
    
  ]
};*/

import colorPalette from '@/constants/colorPalette'

const { COLOR_POINT, COLOR_LANDSCAPE, COLOR_BORDERS, COLOR_WATER, COLOR_LINE, COLOR_POINT_FILL, COLOR_SELECTED_POINT } = colorPalette

const COLORS = {
  BORDERS: COLOR_BORDERS,
  LANDSCAPE: COLOR_LANDSCAPE,
  LINE: COLOR_LINE,
  POINT: COLOR_POINT,
  POINT_FILL: COLOR_POINT_FILL,
  SELECTED_POINT: COLOR_SELECTED_POINT,
  WATER: COLOR_WATER
}

const POINT_MARKER_ICON_CONFIG = {
  //path: 'M 0, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0',
  //strokeOpacity: 0.7,
  //strokeWeight: 4,
  strokeColor: COLORS.POINT,
  fillColor: COLORS.POINT_FILL,
  //fillOpacity: 0.7,
  //scale: 1
}

const SELECTED_POINT_MARKER_ICON_CONFIG = {
  path: 'M 0, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0',
  strokeOpacity: 0.8,
  strokeWeight: 8,
  strokeColor: COLORS.SELECTED_POINT,
  fillColor: COLORS.POINT_FILL,
  fillOpacity: 0.8,
  scale: 1.5
}

const LINE_SYMBOL_CONFIG = {
  path: 'M 0,-2 0,2',
  strokeOpacity: 1,
  strokeWeight: 2,
  scale: 1,
}

const LINE_PATH_CONFIG = {
  clickable: false,
  geodesic: false,
  strokeOpacity: 0,
  strokeColor: COLORS.LINE,
  icons: [{
    icon: LINE_SYMBOL_CONFIG,
    repeat: '10px',
  }],
}

const mapConfig = {
zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  rotateControl: false,
  fullscreenControl: false,
  zoom: 14,
  clickableIcons: false,
  streetViewControl: false,
  panControlOptions: false,
  gestureHandling: 'cooperative',
  backgroundColor: 'f1f1f1',
  zoomControlOptions: {
    style: 'SMALL',
  },
  minZoom: 2,
  maxZoom: 20,
  styles: []
}

export {
  mapConfig,
  LINE_PATH_CONFIG,
  POINT_MARKER_ICON_CONFIG,
  SELECTED_POINT_MARKER_ICON_CONFIG
}
