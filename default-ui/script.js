
var Rx = require('rx');
var $  = require('jquery');


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


function eachRun川 (selector) {

  return runStart口.flatMap(() => selector());
}


function countSpecs川 (predicate) {

  return eachRun川(() =>
    specComplete口.filter(predicate)
    .startWith(0)
    .scan((x) => x + 1)
  );
}


function isFailed ({ result }) {

  return !result.success && !result.skipped;
}

var count川    = countSpecs川(() => true);

var skipped川  = countSpecs川(({ result }) => result.skipped);

var failed川   = countSpecs川(isFailed);

var failure川  = specComplete口.filter(isFailed);

var className川 = eachRun川(() =>
  runComplete口
  .map(payload =>
    payload.results.failed || payload.results.error ? 'is-red' : 'is-green'
  )
  .startWith('is-active')
);

var text川 = Rx.Observable.combineLatest(
  count川, skipped川,
  (count, skipped) => `Ran ${count - skipped} / ${count} specs.`
);

// DOM

text川.subscribe(text => {
  document.querySelector('#status').innerHTML = text;
});

className川.subscribe(className => {
  document.body.className = className;
});

runStart口.subscribe(() => {
  $('#failure').empty();
});

failure川.subscribe(({ result }) => {
  var $el = $('#failure');
  if ($el.find('.Failure-description').length) {
    if (!$el.find('.Failure-count').length) {
      $el.append(' ').append($('<span class="Failure-count"></span>').data('count', 1));
    }
    var $count = $el.find('.Failure-count');
    $count.data('count', $count.data('count') + 1);
    $count.text('(' + $count.data('count') + ' more)');
  } else {
    $el
    .append($('<span class="Failure-title">Failure: </span>'))
    .append($('<span class="Failure-description"></span>').text(result.description));
  }
});
