'use strict';

var S = require('..');

var eq = require('./internal/eq');
var throws = require('./internal/throws');


test('gte', function() {

  eq(typeof S.gte, 'function');
  eq(S.gte.length, 2);

  throws(function() { S.gte(null); },
         TypeError,
         'Type-class constraint violation\n' +
         '\n' +
         'gte :: Ord a => a -> a -> Boolean\n' +
         '       ^^^^^    ^\n' +
         '                1\n' +
         '\n' +
         '1)  null :: Null\n' +
         '\n' +
         '‘gte’ requires ‘a’ to satisfy the Ord type-class constraint; the value at position 1 does not.\n');

  throws(function() { S.gte('abc', 123); },
         TypeError,
         'Type-variable constraint violation\n' +
         '\n' +
         'gte :: Ord a => a -> a -> Boolean\n' +
         '                ^    ^\n' +
         '                1    2\n' +
         '\n' +
         '1)  "abc" :: String\n' +
         '\n' +
         '2)  123 :: Number, FiniteNumber, NonZeroFiniteNumber, Integer, ValidNumber\n' +
         '\n' +
         'Since there is no type of which all the above values are members, the type-variable constraint has been violated.\n');

  eq(S.gte(0, 0), true);
  eq(S.gte(0, -0), true);
  eq(S.gte(-0, 0), true);
  eq(S.gte(-0, -0), true);
  eq(S.gte(0, 1), false);
  eq(S.gte(1, 0), true);
  eq(S.gte(0, -1), true);
  eq(S.gte(-1, 0), false);
  eq(S.gte('a', 'a'), true);
  eq(S.gte('a', 'z'), false);
  eq(S.gte('z', 'a'), true);
  eq(S.gte(new Date(0), new Date(0)), true);
  eq(S.gte(new Date(0), new Date(1)), false);
  eq(S.gte(new Date(1), new Date(0)), true);

});
