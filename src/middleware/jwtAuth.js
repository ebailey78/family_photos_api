import jwt from 'express-jwt'

export default jwt({
  secret: process.env.JWT_SECRET,
  audience: process.env.JWT_AUD,
  issuer: process.env.JWT_ISS,
  algorithms: ['sha1', 'RS256', 'HS256']
})