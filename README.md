
karma-electron-reporter
=======================

Beautiful GUI widget Karma reporter that sits on your desktop!
Based on Electron, you can customize the widget’s appearance with HTML, CSS and JavaScript.

<img src="http://i.imgur.com/2FL5Exb.gif" alt="Screenshot" width="622" height="374" />


Running the Examples
--------------------

```
npm install
cd example
npm install
ln -s $(cd ..; pwd) node_modules/karma-electron-reporter
karma start
```

API
---

Inside your HTML file, define these global functions:

- `function onRunStart()`
- `function onBrowserStart(browser)`
- `function onBrowserError(browser, error)`
- `function onBrowserLog(browser, log, type)`
- `function onSpecComplete(browser, result)`
- `function onRunComplete(browsers, results)`
