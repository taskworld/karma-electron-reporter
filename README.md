
karma-electron-reporter
=======================

Beautiful GUI widget Karma reporter that sits on your desktop!
Based on Electron, you can customize the widget’s appearance with HTML, CSS and JavaScript.

<img src="http://i.imgur.com/2FL5Exb.gif" alt="Screenshot" width="622" height="374" />

__Note:__ We develop on Mac OS X, so this package is untested and unsupported in other operating systems.
Pull requests are welcome, however.


How To Use
----------

There are two ways to use this.
One way is to install for your own use only.
Another way is to install as a project dependency for the whole team.

### Prerequisites

You need to install `electron` globally first.

```
npm install -g electron-prebuilt
```

### Install for your own use.

First, install the Karma plugin inside your project.

```
npm install karma-electron-reporter
```

Then run Karma and specify the reporter you want. (In this case, Electron).

```
karma start --reporters electron,progress
```


### Install for use in your team.

Install the Karma plugin in your project’s devDependencies:

```
npm install --save-dev karma-electron-reporter
```

Then edit your `karma.conf.js` to include the reporter:

```js
    reporters: ['electron', 'progress'],
```

Finally, start Karma as usual.


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
