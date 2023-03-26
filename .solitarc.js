const path = require("path");
const programDir = path.join(__dirname, "..", "splitwave");
const idlDir = path.join(__dirname, "idl");
const sdkDir = path.join(__dirname, "src", "generated");
const binaryInstallDir = path.join(__dirname, ".crates");

module.exports = {
  idlGenerator: "anchor",
  programName: "splitwave",
  programId: "Ss1SrC5qqtaXZMdER55Qgj2ZS8T4NmkwjRC5BYnHopr",
  idlDir,
  sdkDir,
  binaryInstallDir,
  programDir,
};
