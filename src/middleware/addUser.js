import User from '../models/Users'

export default (req, res, next) => {
  let email
  if(Object.keys(req).indexOf('auth') > -1) {
    email = req.auth.user
    console.log(req.auth)
  } else if(req.user) {
    email = req.user.em
  } else {
    return res.status(401).send()
  }

  User.findOne({email: email}).then((user) => {
    console.log(email)
    let u = user.toObject()
    req.user = u
    return next()
  }).catch((err) => {
    return res.status(500).send(err.message)
  })

}