const mongoose = require('mongoose')
const mongUrl = 'momongodb://localhost:27017/login'

module.exports = app => {
  mongoose.connect(mongUrl, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('mongodb connect')
  })
}