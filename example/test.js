
var fail = false;
var skip = true;

describe('a spec', function () {

  it('runs', function () {

  });

  function times (n, f) {

    for (var i = 0; i < n; i ++) {
      f(i);
    }
  }

  times(5, function () {

    it('runs', function (done) {

      setTimeout(function () { done(); }, 200);
    });
  });

  if (fail) {

    it('fails', function () {

      throw new Error('failed');
    });

    it('fails again', function () {

      throw new Error('failed');
    });
  }

  if (skip) {

    xit('skipped', function () {

      throw new Error('should have been skipped');
    });
  }

  times(5, function () {

    it('runs', function (done) {

      setTimeout(function () { done(); }, 200);
    });
  });

});
