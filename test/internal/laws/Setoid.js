'use strict';

var jsc = require('jsverify');
var Z = require('sanctuary-type-classes');


function reflexivity(a) {
  var lhs = a;
  var rhs = a;
  return Z.equals(lhs, rhs);
}

function symmetry(a, b) {
  var lhs = Z.equals(a, b);
  var rhs = Z.equals(b, a);
  return Z.equals(lhs, rhs);
}

function transitivity(a, b, c) {
  return !Z.equals(a, b) || !Z.equals(b, c) || Z.equals(a, c);
}

exports.reflexivity = function(a) {
  test('Setoid reflexivity', function() {
    jsc.assert(jsc.forall(a, reflexivity));
  });
};

exports.symmetry = function(a, b) {
  test('Setoid symmetry', function() {
    jsc.assert(jsc.forall(a, b, symmetry));
  });
};

exports.transitivity = function(a, b, c) {
  test('Setoid transitivity', function() {
    jsc.assert(jsc.forall(a, b, c, transitivity));
  });
};
