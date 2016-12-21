'use strict';

var jsc = require('jsverify');
var Z = require('sanctuary-type-classes');


function leftIdentity(a) {
  var lhs = Z.concat(Z.empty(a.constructor), a);
  var rhs = a;
  return Z.equals(lhs, rhs);
}

function rightIdentity(a) {
  var lhs = Z.concat(a, Z.empty(a.constructor));
  var rhs = a;
  return Z.equals(lhs, rhs);
}

exports.leftIdentity = function(a) {
  test('Monoid left identity', function() {
    jsc.assert(jsc.forall(a, leftIdentity));
  });
};

exports.rightIdentity = function(a) {
  test('Monoid right identity', function() {
    jsc.assert(jsc.forall(a, rightIdentity));
  });
};
