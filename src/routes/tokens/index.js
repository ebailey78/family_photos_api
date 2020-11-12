import {v4 as uuid } from 'uuid'
import jwt from 'jsonwebtoken'
import basicAuth from '../../middleware/basicAuth'
import addUser from '../../middleware/addUser'
import { Router } from 'express'

const router = Router();

router.use(basicAuth)
router.use(addUser)

const makeToken = (user) => {
  return jwt.sign({
    iss: process.env.JWT_ISS,
    sub: user.userId,
    aud: process.env.JWT_AUD,
    exp: parseInt(Date.now()/1000) + (process.env.JWT_LIFESPAN * 60 * 60),
    iat: parseInt(Date.now()/1000),
    jti: uuid(),
    fn: user.first_name,
    ln: user.last_name,
    em: user.email,
    acc: user.access_level
  }, process.env.JWT_SECRET)
}

router.get("/", async (req, res) => {
  
  console.log(req.user)
  const user = req.user
  let token = makeToken(user)
  res.status(201).send(token)

})

router.get("/:token", (req, res) => {

  const token = req.params.token

  try {
    let tok = jwt.verify(token, process.env.JWT_SECRET)
    res.send(tok)    
  } catch(err) {
    if(err.message == "invalid signature") {
      res.status(401).send(err.message)
    } else {
      res.send(err)
    }
  }

})

export default router