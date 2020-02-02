const PolygonLookup = require("polygon-lookup");
const featureCollection = require("../../../data/local_area_boundary.json");
const lookup = new PolygonLookup(featureCollection);

module.exports = lookup;