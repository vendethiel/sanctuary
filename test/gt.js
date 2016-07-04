'use strict';

var S = require('..');

var eq = require('./internal/eq');
var throws = require('./internal/throws');


test('gt', function() {

  eq(typeof S.gt, 'function');
  eq(S.gt.length, 2);

  throws(function() { S.gt(null); },
         TypeError,
         'Type-class constraint violation\n' +
         '\n' +
         'gt :: Ord a => a -> a -> Boolean\n' +
         '      ^^^^^    ^\n' +
         '               1\n' +
         '\n' +
         '1)  null :: Null\n' +
         '\n' +
         '‘gt’ requires ‘a’ to satisfy the Ord type-class constraint; the value at position 1 does not.\n');

  throws(function() { S.gt('abc', 123); },
         TypeError,
         'Type-variable constraint violation\n' +
         '\n' +
         'gt :: Ord a => a -> a -> Boolean\n' +
         '               ^    ^\n' +
         '               1    2\n' +
         '\n' +
         '1)  "abc" :: String\n' +
         '\n' +
         '2)  123 :: Number, FiniteNumber, NonZeroFiniteNumber, Integer, ValidNumber\n' +
         '\n' +
         'Since there is no type of which all the above values are members, the type-variable constraint has been violated.\n');

  eq(S.gt(0, 0), false);
  eq(S.gt(0, -0), false);
  eq(S.gt(-0, 0), false);
  eq(S.gt(-0, -0), false);
  eq(S.gt(0, 1), false);
  eq(S.gt(1, 0), true);
  eq(S.gt(0, -1), true);
  eq(S.gt(-1, 0), false);
  eq(S.gt('a', 'a'), false);
  eq(S.gt('a', 'z'), false);
  eq(S.gt('z', 'a'), true);
  eq(S.gt(new Date(0), new Date(0)), false);
  eq(S.gt(new Date(0), new Date(1)), false);
  eq(S.gt(new Date(1), new Date(0)), true);

});
