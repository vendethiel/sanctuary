'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('compose', function() {

  eq(typeof S.compose, 'function');
  eq(S.compose.length, 3);
  eq(S.compose.toString(), 'compose :: (b -> c) -> (a -> b) -> a -> c');

  eq(S.compose(Math.sqrt, S.prop('x'), {x: 25, y: 50}), 5);

});
