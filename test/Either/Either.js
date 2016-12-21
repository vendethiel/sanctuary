'use strict';

var jsc = require('jsverify');
var Z = require('sanctuary-type-classes');
var S = require('../internal/sanctuary');

var Identity = require('../internal/Identity');
var add_ = require('../internal/add_');
var laws = require('../internal/laws');
var parseHex = require('../internal/parseHex');
var squareRoot = require('../internal/squareRoot');


//  value :: { value :: a } -> a
var value = S.prop('value');

//  IdentityArb :: Arbitrary a -> Arbitrary (Identity a)
function IdentityArb(arb) {
  return arb.smap(Identity, value);
}

//  identityToMaybe :: Identity a -> Maybe a
function identityToMaybe(i) {
  return S.Just(Z.extract(i));
}

//  EitherArb :: Arbitrary a -> Arbitrary b -> Arbitrary (Either a b)
function EitherArb(lArb, rArb) {
  return jsc.oneof(lArb.smap(S.Left, value, Z.toString),
                   rArb.smap(S.Right, value, Z.toString));
}


suite('Either', function() {

  laws.Setoid.reflexivity(
    EitherArb(jsc.string, jsc.integer)
  );

  laws.Setoid.symmetry(
    EitherArb(jsc.string, jsc.integer),
    EitherArb(jsc.string, jsc.integer)
  );

  laws.Setoid.transitivity(
    EitherArb(jsc.string, jsc.integer(1)),
    EitherArb(jsc.string, jsc.integer(1)),
    EitherArb(jsc.string, jsc.integer(1))
  );

  laws.Semigroup.associativity(
    EitherArb(jsc.string, jsc.array(jsc.integer)),
    EitherArb(jsc.string, jsc.array(jsc.integer)),
    EitherArb(jsc.string, jsc.array(jsc.integer))
  );

  laws.Functor.identity(
    EitherArb(jsc.string, jsc.nat)
  );

  laws.Functor.composition(
    EitherArb(jsc.string, jsc.nat),
    jsc.constant(S.inc),
    jsc.constant(Math.sqrt)
  );

  laws.Apply.composition(
    EitherArb(jsc.string, jsc.elements([S.dec, S.inc, Math.sqrt])),
    EitherArb(jsc.string, jsc.elements([S.dec, S.inc, Math.sqrt])),
    EitherArb(jsc.string, jsc.nat)
  );

  laws.Applicative.identity(
    EitherArb(jsc.string, jsc.elements([S.dec, S.inc, Math.sqrt]))
  );

  laws.Applicative.homomorphism(
    EitherArb(jsc.string, jsc.elements([S.dec, S.inc, Math.sqrt])),
    jsc.elements([S.dec, S.inc, Math.sqrt]),
    jsc.nat
  );

  laws.Applicative.interchange(
    EitherArb(jsc.string, jsc.elements([S.dec, S.inc, Math.sqrt])),
    jsc.elements([S.dec, S.inc, Math.sqrt]),
    jsc.nat
  );

  laws.Chain.associativity(
    EitherArb(jsc.string, jsc.string),
    jsc.constant(parseHex),
    jsc.constant(squareRoot)
  );

  laws.Monad.leftIdentity(
    EitherArb(jsc.string, jsc.nat),
    jsc.constant(squareRoot),
    jsc.nat
  );

  laws.Monad.rightIdentity(
    EitherArb(jsc.string, jsc.nat),
    jsc.nat
  );

  laws.Foldable.associativity(
    jsc.constant(add_),
    EitherArb(jsc.string, jsc.integer)
  );

  laws.Traversable.naturality(
    jsc.constant(Identity),
    jsc.constant(S.Maybe),
    jsc.constant(identityToMaybe),
    EitherArb(jsc.string, IdentityArb(jsc.integer))
  );

  laws.Traversable.identity(
    jsc.constant(Identity),
    EitherArb(jsc.string, IdentityArb(jsc.integer))
  );

  laws.Traversable.composition(
    jsc.constant(S.Either),
    jsc.constant(Identity),
    EitherArb(jsc.string, IdentityArb(EitherArb(jsc.string, jsc.integer)))
  );

  laws.Extend.associativity(
    jsc.constant(function(either) { return (either.isRight ? either.value : 0) + 1; }),
    jsc.constant(function(either) { return (either.isRight ? either.value : 0) * 2; }),
    EitherArb(jsc.string, jsc.integer)
  );

});
