
var Rx = require('rx');


var runStart口     = new Rx.Subject();
var specComplete口 = new Rx.Subject();
var runComplete口  = new Rx.Subject();


window.onRunStart = function () {

  runStart口.onNext();
};


window.onSpecComplete = function (browser, result) {

  specComplete口.onNext({ browser, result });
};


window.onRunComplete = function (browsers, results) {

  runComplete口.onNext({ browsers, results });
};


function countSpecs川(predicate) {

  return Rx.Observable.when(
    runStart口.thenDo(() => () => 0),
    specComplete口.filter(predicate).thenDo(() => x => x + 1)
  )
  .startWith(0)
  .scan((x, f) => f(x));
}


var count川    = countSpecs川(() => true);

var skipped川  = countSpecs川(({ result }) => result.skipped);


var className川 = Rx.Observable.when(
  runStart口.thenDo(() => 'is-active'),
  runComplete口.thenDo(payload => (
    payload.results.failed || payload.results.error ? 'is-red' : 'is-green'
  ))
)
.shareReplay(1);


var text川 = Rx.Observable.combineLatest(
  count川, skipped川,
  (count, skipped) => `Ran ${count - skipped} / ${count} specs.`
);


text川.subscribe(text => document.querySelector('#status').innerHTML = text);
className川.subscribe(className => document.body.className = className);
