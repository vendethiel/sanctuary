'use strict';

var vm = require('vm');

var S = require('..');

var eq = require('./internal/eq');


test('gets', function() {

  eq(typeof S.gets, 'function');
  eq(S.gets.length, 3);
  eq(S.gets.toString(), 'gets :: Accessible a => TypeRep b -> Array String -> a -> Maybe b');

  eq(S.gets(Number, ['x'], {x: {z: 0}, y: 42}), S.Nothing);
  eq(S.gets(Number, ['y'], {x: {z: 0}, y: 42}), S.Just(42));
  eq(S.gets(Number, ['z'], {x: {z: 0}, y: 42}), S.Nothing);
  eq(S.gets(Number, ['x', 'z'], {x: {z: 0}, y: 42}), S.Just(0));
  eq(S.gets(Number, ['a', 'b', 'c'], {x: {z: 0}, y: 42}), S.Nothing);
  eq(S.gets(Number, [], {x: {z: 0}, y: 42}), S.Nothing);
  eq(S.gets(Object, [], {x: {z: 0}, y: 42}), S.Just({x: {z: 0}, y: 42}));

  eq(S.gets(RegExp, ['x'], {x: vm.runInNewContext('/.*/')}), S.Just(/.*/));
  eq(S.gets(vm.runInNewContext('RegExp'), ['x'], {x: /.*/}), S.Just(/.*/));

});
