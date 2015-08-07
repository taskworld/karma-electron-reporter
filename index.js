
var UI = require('./ui');
var defaultsDeep = require('lodash.defaultsdeep');

var ElectronReporter = function(helper, logger, config) {

  config = defaultsDeep({ }, config, {
    url:      'file://' + require.resolve('./default-ui/index.html'),
    options:  {
      width:            480,
      height:           140,
      transparent:      true,
      frame:            false,
      'always-on-top':  true,
    }
  })

  var ui = UI(config);

  this.adapters = [];

  function bind(topic) {

    return function () {

      ui.send({
        topic:      topic,
        arguments:  [].slice.call(arguments, 0, -1),
      });
    }
  }

  this.onRunStart       = bind('onRunStart');     // ()
  this.onBrowserStart   = bind('onBrowserStart'); // (browser)
  this.onBrowserError   = bind('onBrowserError'); // (browser, error)
  this.onBrowserLog     = bind('onBrowserLog');   // (browser, log, type)
  this.onSpecComplete   = bind('onSpecComplete'); // (browser, result)
  this.onRunComplete    = bind('onRunComplete');  // (browsers, results)
};

ElectronReporter.$inject = ['helper', 'logger','config.electronReporter'];

module.exports = {
  'reporter:electron': ['type', ElectronReporter]
};
