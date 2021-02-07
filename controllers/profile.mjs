import mongoose from "mongoose";

import User from "../model/User.mjs";
import Profile from "../model/Profile.mjs";
import { validateProfileInput } from "../validation/profileValidator.mjs";
import { validateProfileExpInput } from "../validation/experienceValidator.mjs";
import { validateProfileEducInput } from "../validation/educationValidation.mjs";

export const getProfileTest = (req, res, next) => {
  return res.json({ message: "Profile works!" });
};

export const getMe = (req, res, next) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate("user")
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((error) => console.error(error));
};

export const postMe = (req, res, next) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  profileFields.handle = req.body.handle ?? null;
  profileFields.company = req.body.company ?? null;
  profileFields.website = req.body.website ?? null;
  profileFields.location = req.body.location ?? null;
  profileFields.status = req.body.status ?? null;
  profileFields.bio = req.body.bio ?? null;
  profileFields.githubusername = req.body.githubusername ?? null;
  // arrayed values
  profileFields.skills = req.body.skills.split(",") ?? null;
  // social as object
  profileFields.social = {};
  profileFields.social.youtube = req.body.youtube ?? null;
  profileFields.social.twitter = req.body.twitter ?? null;
  profileFields.social.facebook = req.body.facebook ?? null;
  profileFields.social.linkedin = req.body.linkedin ?? null;
  profileFields.social.instagram = req.body.instagram ?? null;

  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true, setDefaultsOnInsert: true },
          { useFindAndModify: false }
        ).then((updProfile) => res.json(updProfile));
      } else {
        //create
        // check handle for assesability and seo related operation
        Profile.findOne({
          handle: profileFields.handle,
        }).then((newProfile) => {
          if (newProfile) {
            errors.handle = "That handle already exits";
            return res.status(400).json(errors);
          }
          // save profile to create
          new Profile(profileFields)
            .save()
            .then((savedProfile) => res.json(savedProfile));
        });
      }
    })
    .catch((error) => console.error(error));
};

export const getProfileAll = (req, res, next) => {
  const errors = {};
  Profile.find()
    .populate("user")
    .then((profiles) => {
      if (!profiles) {
        errors.newProfiles = "No profiles here";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch((error) => {
      console.error(error);
      return res.status(404).json({ profile: "there are no profiles" });
    });
};

export const getProfileHandle = (req, res, next) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user")
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((error) => console.error(error));
};

export const getProfileUserId = (req, res, next) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user")
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(404)
        .json({ profile: "there's no profile for this user" });
    });
};

export const addExp = (req, res, next) => {
  const { errors, isValid } = validateProfileExpInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };
      // add to exp array
      profile.experience.unshift(newExp);
      profile.save().then((resProfile) => res.json(resProfile));
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(404)
        .json({ profile: "there's no profile for this user" });
    });
};

export const addEdu = (req, res, next) => {
  const { errors, isValid } = validateProfileEducInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };
      // add to exp array
      profile.education.unshift(newEdu);
      profile.save().then((resProfile) => res.json(resProfile));
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(404)
        .json({ profile: "there's no profile for this user" });
    });
};

export const removeExp = (req, res, next) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    // get remove index
    const removeInex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    // splice out of array
    profile.experience.splice(removeInex, 1);

    profile
      .save()
      .then((newprofile) => res.json(newprofile))
      .catch((error) => {
        console.error(error);
        return res
          .status(404)
          .json({ profile: "there's no profile for this user" });
      });
  });
};

export const removeEdu = (req, res, next) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    // get remove index
    const removeInex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    // splice out of array
    profile.education.splice(removeInex, 1);
    profile
      .save()
      .then((newprofile) => res.json(newprofile))
      .catch((error) => {
        console.error(error);
        return res
          .status(404)
          .json({ profile: "there's no profile for this user" });
      });
  });
};

export const removeProfile = (req, res, next) => {
  Profile.findOneAndDelete({ user: req.user.id })
    .then(() => {
      User.findOneAndDelete({ _id: req.user.id }).then(() => {
        return res.json({ success: "deleted" });
      });
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(404)
        .json({ profile: "there's no profile for this user" });
    });
};
