
var UI = require('./ui');

var ElectronReporter = function(helper, logger, config) {

  var ui = UI();

  this.adapters = [];

  this.onRunStart = function () {
    ui.send({ topic: 'run:start' });
  };

  this.onSpecComplete = function(browser, result) {
    ui.send({ topic: 'spec:complete', browser: browser, result: result });
  };

  this.onRunComplete = function(browsers, results) {
    ui.send({ topic: 'run:complete', browsers: browsers, results: results });
  };
};

ElectronReporter.$inject = ['helper', 'logger','config.electronReporter'];

module.exports = {
  'reporter:electron': ['type', ElectronReporter]
};
