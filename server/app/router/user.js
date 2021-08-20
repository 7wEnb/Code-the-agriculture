const express = require('express')
const User = require('../model/User')
const router = express.Router()
//获取用户列表
router.get('/', async (req, res) => {
  const list = await User.find()
  res.send(list)
})
//注册
router.post('/register', async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  if (user) { return res.status(409).send('该用户已存在') }
  const newUser = await new User(req.body).save()
  res.send(newUser)
})
//登录
router.post('/login', async (req, res) => {
  //查询用户是否存在
  const user = await User.findOne({ username: req.body.username })
  if (!user) { return res.status(422).send('该用户不存在') }
  //用户存在，密码是否正确
  if (req.body.password !== user.password) {
    return res.status(422).send('密码错误')
  } else {
    // res.send('token')
    const token = user._id + '.' + user.username
    res.send(token)
  }
})

//验证token
router.get('/verify', async (req, res) => {
  // console.log(req.headers.authorization)
  //获取token
  const token = req.headers.authorization.split(' ')[1]
  const id = token.split('.')[0]
  const username = token.split('.')[1]
  console.log(id, username)
  //查询用户是否存在
  const user = await User.findById(id)
  if(!user){return res.status(422).send('用户错误')}
  //查看用户名是否正确
  if(username !== user.username){
    res.status('422').send('用户错误')
  }else{
    res.send('用户正确')
  }
})

module.exports = router