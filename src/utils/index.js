export const parseValidationErrors = (errors) => {
  let parsedErrors = [];

  Object.values(errors).forEach((error) => {
    error.forEach((val) => parsedErrors.push(val));
  });

  return parsedErrors;
};

export const can = () => {
  // return permissions?.find((p) => p == permission) ? true : false;
};
