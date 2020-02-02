// skip ignored locations
const ignoredLocs = [
  "burnaby",
  "new westminster",
  "surrey",
  "north vancouver",
  "west vancouver",
  "mission",
  "coquitlam",
  "delta",
  "east vancouver"
];
const ignoredLocations = new RegExp(`${ignoredLocs.join("|")}`, "i");

module.exports = ignoredLocations;