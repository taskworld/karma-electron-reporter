'use strict';

var spawn = require('child_process').spawn;

function UI () {

  var electron = spawn('electron', [require.resolve('./electron-ui')], { stdio: ['pipe', 1, 2] });

  return {
    send: function(message) {
      electron.stdin.write(JSON.stringify(message) + '\n');
    },
  };
}

module.exports = UI;
