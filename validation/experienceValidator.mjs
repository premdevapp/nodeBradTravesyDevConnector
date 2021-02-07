import Validator from "validator";

import isEmpty from "./is_empty.mjs";

export function validateProfileExpInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Profile experience title is required";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Profile experience company is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "Profile experience from date is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
}
