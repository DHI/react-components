
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-components-lab.cjs.production.min.js')
} else {
  module.exports = require('./react-components-lab.cjs.development.js')
}
