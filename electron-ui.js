
var app           = require('app');
var BrowserWindow = require('browser-window');
var Rx            = require('rx');
var JSONStream    = require('json-stream')

var subject = new Rx.Subject();
var buffer  = [];
var config  = JSON.parse(process.argv[2]);

app.on('window-all-closed', function () {

  app.quit();
});

process.stdin.pipe(new JSONStream().on('data', function (message) {

  subject.onNext(message);

  if (message.topic === 'onRunStart') {
    buffer.length = 0;
  }
  buffer.push(message);
}));

app.on('ready', function() {

  var mainWindow = new BrowserWindow(config.options);

  var pipe;

  function execute (data) {

    var f = window[data.topic];
    if (typeof f === 'function') {
      f.apply(this, data.arguments);
    }
  }

  function send (data) {

    var json = JSON.stringify(data);
    var code = 'void (' + execute + ')(' + json + ');';
    mainWindow.webContents.executeJavaScript(code);
  }

  mainWindow.loadUrl(config.url);

  mainWindow.webContents.once('did-finish-load', function () {

    pipe = subject.subscribe(send);
  });

  mainWindow.webContents.on('did-finish-load', function () {

    buffer.forEach(send);
  });

  mainWindow.on('closed', function() {

    if (pipe) {
      pipe.dispose();
      pipe = null;
    }
    mainWindow = null;
  });
});
