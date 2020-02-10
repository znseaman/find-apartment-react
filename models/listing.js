const Sequelize = require('sequelize')
const User = require('./user')

const sequelize = require('../utils/database')
const {
  INTEGER,
  STRING,
  DOUBLE,
  TEXT,
  DATE,
  GEOMETRY,
  FLOAT,
  BOOLEAN,
} = Sequelize
const Listing = sequelize.define('listing', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: TEXT,
    allowNull: false,
  },
  pid: STRING,
  title: STRING,
  url: STRING,
  imageUrls: {
    type: TEXT,
    allowNull: false,
  },
  latitude: {
    type: DOUBLE,
    validate: {
      min: -90,
      max: 90
    }
  },
  longitude: {
    type: DOUBLE,
    validate: {
      min: -180,
      max: 180
    }
  },
  // ElephantSQL doesn't support PostGIS
  // point: GEOMETRY("POINT", 4326),
  zoom: INTEGER,
  postedAt: DATE,
  polygon_name: STRING,
  price: INTEGER,
  beds: INTEGER,
  baths: FLOAT,
  size: STRING,
  amenities: STRING,
  favorite: BOOLEAN,
}, {
  validate: {
    bothCoordsOrNone: function () {
      if ((this.latitude === null) !== (this.longitude === null)) {
        throw new Error('Require either both latitude and longitude or neither')
      }
    }
  }
})

// Relations
Listing.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Listing)

module.exports = Listing
