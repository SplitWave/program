const path = require("path");
const programDir = path.join(__dirname, "..", "splitwave");
const idlDir = path.join(__dirname, "idl");
const sdkDir = path.join(__dirname, "src", "generated");
const binaryInstallDir = path.join(__dirname, ".crates");

module.exports = {
  idlGenerator: "anchor",
  programName: "splitwave",
  programId: "SpWwab5CWBLYHfXfnfRqobDq7122etY6V35ed6ZTw9J",
  idlDir,
  sdkDir,
  binaryInstallDir,
  programDir,
};
