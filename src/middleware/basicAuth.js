import basicAuth from 'express-basic-auth'
import bcrypt from 'bcrypt'
import User from "../models/Users"

export default basicAuth({
  authorizeAsync: true,
  authorizer: (username, password, cb) => {
    console.log(this)
    User.findOne({email: username}).then((user) => {
      let u = user.toObject()
      let pw = bcrypt.hashSync(password, u.passwordSalt)
      cb(null, basicAuth.safeCompare(pw, u.password))
    }).catch((err) => {
      cb(err, false)
    })
  }
})