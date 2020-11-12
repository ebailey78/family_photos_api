import { Router } from 'express'
import jwtAuth from '../../middleware/jwtAuth'
import addUser from '../../middleware/addUser'
import User from "../../models/Users"
import {v4 as uuid} from 'uuid'
import bcrypt from 'bcrypt'

const router = Router();

router.use(jwtAuth)
router.use(addUser)

router.post("/", async (req, res) => {

  let salt = bcrypt.genSaltSync(10)
  let password = bcrypt.hashSync(req.body.password, salt)

  const user = new User({
    userId: uuid(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: password,
    passwordSalt: salt,
    accessLevel: req.body.accessLevel,
    timestamp: Date.now() / 1000,
    status: "active"
  })

  await user.save()
  res.send(user.firstName)

})

router.get("/", async (req, res) => {
  console.log(req.user)
  const users = await User.find()
  res.send(users)
})

export default router