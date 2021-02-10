import Strategy, { ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";

import { keys } from "./keys_dev.mjs";

const JwtStrategy = Strategy.Strategy;

const User = mongoose.model("users");

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretKey;

const pass = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payLoad, done) => {
      User.findById(jwt_payLoad.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((error) => console.error());
    })
  );
};

export default pass;
