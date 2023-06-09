const path = require('path');
const programDir = path.join(__dirname, '..', 'programs/splitwave');
const idlDir = path.join(__dirname, 'idl');
const sdkDir = path.join(__dirname, 'src', 'generated');
const binaryInstallDir = '/home/dantes/.cargo';

module.exports = {
  idlGenerator: 'anchor',
  programName: 'splitwave',
  programId: 'pp1aQnBZ8271r5LcZymbudhTXbExDQiH2CzDj3N6ujY',
  idlDir,
  sdkDir,
  binaryInstallDir,
  programDir,
};
