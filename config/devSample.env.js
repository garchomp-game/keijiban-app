'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_KEY: '"example"',
  AUTH_DOMAIN: '"example"',
  DATABASE_URL: '"example"',
  PROJECT_ID: '"example"',
  STORAGE_BUCKET: '"example"',
  MESSAGING_SENDER_ID: 'example'
})
