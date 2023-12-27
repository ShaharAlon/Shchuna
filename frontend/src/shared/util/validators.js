export const VALIDATOR_EMAIL = (val) => {
  return /^\S+@\S+\.\S+$/.test(val);
};

export const VALIDATOR_PASSWORD = (val) => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(val);
};

export const VALIDATOR_PHONE = (val) => {
  return /^[0-9\-\+]{9,15}$/.test(val);
};

export const VALIDATOR_NAME = (val) => {
  return /^[a-z A-Z]+$/.test(val);
};

export const VALIDATOR_REQUIRE = (val) => {
  return val !== "";
};
