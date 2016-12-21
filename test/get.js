'use strict';

var vm = require('vm');

var S = require('..');

var eq = require('./internal/eq');


test('get', function() {

  eq(typeof S.get, 'function');
  eq(S.get.length, 3);
  eq(S.get.toString(), 'get :: Accessible a => TypeRep b -> String -> a -> Maybe b');

  eq(S.get(Number, 'x', {x: 0, y: 42}), S.Just(0));
  eq(S.get(Number, 'y', {x: 0, y: 42}), S.Just(42));
  eq(S.get(Number, 'z', {x: 0, y: 42}), S.Nothing);
  eq(S.get(String, 'x', {x: 0, y: 42}), S.Nothing);

  eq(S.get(RegExp, 'x', {x: vm.runInNewContext('/.*/')}), S.Just(/.*/));
  eq(S.get(vm.runInNewContext('RegExp'), 'x', {x: /.*/}), S.Just(/.*/));

});
