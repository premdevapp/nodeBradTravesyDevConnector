import Validator from "validator";

import isEmpty from "./is_empty.mjs";

export function validateProfileEducInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "Profile education school title is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Profile education school degree is required";
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Profile education school fieldofstudy is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "Profile education school from date is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
}
