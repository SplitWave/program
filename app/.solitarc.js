const path = require('path');
const programDir = path.join(__dirname, '..', 'programs/splitwave');
const idlDir = path.join(__dirname, 'idl');
const sdkDir = path.join(__dirname, 'src', 'generated');
const binaryInstallDir = path.join(__dirname, '.crates');

module.exports = {
  idlGenerator: 'anchor',
  programName: 'splitwave',
  programId: 'pP24ZPhQLvSSri8hB5DdoUxRGRLCiYxdf5MH1s93dfd',
  idlDir,
  sdkDir,
  binaryInstallDir,
  programDir,
};
