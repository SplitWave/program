const path = require("path");
const programDir = path.join(__dirname, "./programs/splitwave");
const idlDir = path.join(__dirname, "./client/idl");
const sdkDir = path.join(__dirname, "./client/src", "generated");
const binaryInstallDir = path.join(__dirname, "./client/.crates");

module.exports = {
  idlGenerator: "anchor",
  programName: "splitwave",
  programId: "pp1aQnBZ8271r5LcZymbudhTXbExDQiH2CzDj3N6ujY",
  idlDir,
  sdkDir,
  binaryInstallDir,
  programDir,
};
