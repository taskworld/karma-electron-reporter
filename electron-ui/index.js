
var app           = require('app');
var BrowserWindow = require('browser-window');
var Rx            = require('rx');
var JSONStream    = require('json-stream')

var subject = new Rx.Subject();
var buffer  = [];

app.on('window-all-closed', function () {

  app.quit();
});

process.stdin.pipe(new JSONStream().on('data', function (message) {

  subject.onNext(message);

  if (message.topic === 'run:start') {
    buffer.length = 0;
  }
  buffer.push(message);
}));

app.on('ready', function() {

  var mainWindow = new BrowserWindow({
    width: 480,
    height: 140,
    transparent: true,
    frame: false,
    'always-on-top': true,
  });

  var pipe;

  function send (data) {

    var json = JSON.stringify(data);
    var code = 'handleMessage(' + json + ')';
    mainWindow.webContents.executeJavaScript(code);
  }

  mainWindow.loadUrl('file://' + __dirname + '/index.html');

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
