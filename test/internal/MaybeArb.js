'use strict';

var jsc = require('jsverify');

var S = require('../..');

var Z = require('sanctuary-type-classes');

//  MaybeArb :: Arbitrary a -> Arbitrary (Maybe a)
module.exports = function MaybeArb(arb) {
  return jsc.oneof(arb.smap(S.Just, S.prop('value'), Z.toString),
                   jsc.constant(S.Nothing));
};
