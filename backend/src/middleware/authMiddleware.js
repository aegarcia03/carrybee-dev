// Handle all authentication between the server and the client
// This middleware is used to authenticate the user and check if the user is authorized to access the resources
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const userService = require('../services/userService');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new Strategy(opts, async (jwt_payload, done) => {
  try {
    console.log("JWT Payload:", jwt_payload);
    const user = await userService.getUserByEmail(jwt_payload.email);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

const authenticate = passport.authenticate('jwt', { session: false });

module.exports = {
  authenticate,
};