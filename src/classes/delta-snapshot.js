const admin = require('firebase-admin');
const functions = require('firebase-functions');

module.exports = function snapshotMaker(data, delta, path) {
  let app = admin.app();

  const snapshot = new functions.database.DeltaSnapshot(
    app,
    app,
    data,
    delta,
    path
  );

  return snapshot;
}