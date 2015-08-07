'use strict';

var spawn = require('child_process').spawn;

function UI (config) {

  var args = [
    require.resolve('./electron-ui'),
    JSON.stringify(config),
  ];
  var electron = spawn('electron', args, { stdio: ['pipe', 1, 2] });

  return {
    send: function(message) {
      electron.stdin.write(JSON.stringify(message) + '\n');
    },
  };
}

module.exports = UI;
