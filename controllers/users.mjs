import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../model/User.mjs";
import { keys } from "../config/keys.mjs";
import { validateRegisterInput } from "../validation/register.mjs";
import { validateLoginInput } from "../validation/login.mjs";

export const getUserTest = (req, res, next) => {
  return res.json({ message: "Users works!" });
};

export const postUserRegister = (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email Already Exists!!";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avator: gravatar.url(req.body.email, {
          s: "200", //size
          r: "pg", //rating
          d: "mm", //default
        }),
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              return res.json(user);
            })
            .catch((error) => console.error(error));
        });
      });
    }
  });
};

export const postUserLogin = (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      // check user
      if (!user) {
        errors.email = "User not found!!";
        return res.status(404).json(errors);
      }
      // check password
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // user matched
            const payLoad = {
              //create jwt payload
              id: user.id,
              name: user.name,
              avator: user.avator,
            };
            // sign token
            jwt.sign(
              payLoad,
              keys.secretKey,
              { expiresIn: 33600 },
              (error, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`,
                });
              }
            );
          } else {
            errors.password = "Password incorrect";
            return res.status(404).json(errors);
          }
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
};

export const getCurrentUser = (req, res, next) => {
  return res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
};
