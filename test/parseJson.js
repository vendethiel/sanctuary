'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('parseJson', function() {

  eq(typeof S.parseJson, 'function');
  eq(S.parseJson.length, 2);
  eq(S.parseJson.toString(), 'parseJson :: TypeRep a -> String -> Maybe a');

  eq(S.parseJson(Object, '[Invalid JSON]'), S.Nothing);
  eq(S.parseJson(Array, '{"foo":"bar"}'), S.Nothing);
  eq(S.parseJson(Array, '["foo","bar"]'), S.Just(['foo', 'bar']));

});
