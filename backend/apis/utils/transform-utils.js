const dateFormat = require("dateformat");

exports.responseDateWithoutTime = (date) => {
  if (date) {
    return dateFormat(date, "yyyy-mm-dd");
  } else {
    return null;
  }
};

exports.responseFullName = (firstName, lastName) =>
  `${firstName || ""} ${lastName || ""}`.trim();

exports.responseBoolean = (val) => {
  if (typeof val === "string") {
    return val !== "0" && val !== "false";
  } else {
    return Boolean(val);
  }
};

exports.requestEnum = (val) => (val ? val.toLowerCase() : null);
exports.requestPhone = (val) => (val ? val.replace(/[\(\)\-\s]/g, "") : null);
