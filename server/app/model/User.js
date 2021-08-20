const mongoose = require('mongoose')
const { Schema, model } = mongoose
// const Schema = mongoose.Schema
// const model = mongoose.model

const UserSchema = new Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
})

const User = model('User', UserSchema)
module.exports = User