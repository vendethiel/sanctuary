'use strict';

var jsc = require('jsverify');
var Z = require('sanctuary-type-classes');

var S = require('../internal/sanctuary');

var Identity = require('../internal/Identity');
var add_ = require('../internal/add_');
var laws = require('../internal/laws');


//  value :: { value :: a } -> a
var value = S.prop('value');

//  IdentityArb :: Arbitrary a -> Arbitrary (Identity a)
function IdentityArb(arb) {
  return arb.smap(Identity, value);
}

//  MaybeArb :: Arbitrary a -> Arbitrary (Maybe a)
function MaybeArb(arb) {
  return jsc.oneof(arb.smap(S.Just, value, Z.toString),
                   jsc.constant(S.Nothing));
}

//  EitherArb :: Arbitrary a -> Arbitrary b -> Arbitrary (Either a b)
function EitherArb(lArb, rArb) {
  return jsc.oneof(lArb.smap(S.Left, value, Z.toString),
                   rArb.smap(S.Right, value, Z.toString));
}


suite('Maybe', function() {

  laws.Setoid.reflexivity(
    MaybeArb(jsc.integer)
  );

  laws.Setoid.symmetry(
    MaybeArb(jsc.integer),
    MaybeArb(jsc.integer)
  );

  laws.Setoid.transitivity(
    MaybeArb(jsc.integer(1)),
    MaybeArb(jsc.integer(1)),
    MaybeArb(jsc.integer(1))
  );

  laws.Semigroup.associativity(
    MaybeArb(jsc.string),
    MaybeArb(jsc.string),
    MaybeArb(jsc.string)
  );

  laws.Monoid.leftIdentity(
    MaybeArb(jsc.string)
  );

  laws.Monoid.rightIdentity(
    MaybeArb(jsc.string)
  );

  laws.Functor.identity(
    MaybeArb(jsc.nat)
  );

  laws.Functor.composition(
    MaybeArb(jsc.nat),
    jsc.constant(S.inc),
    jsc.constant(Math.sqrt)
  );

  laws.Apply.composition(
    MaybeArb(jsc.elements([S.dec, S.inc, Math.sqrt])),
    MaybeArb(jsc.elements([S.dec, S.inc, Math.sqrt])),
    MaybeArb(jsc.nat)
  );

  laws.Applicative.identity(
    MaybeArb(jsc.elements([S.dec, S.inc, Math.sqrt]))
  );

  laws.Applicative.homomorphism(
    MaybeArb(jsc.elements([S.dec, S.inc, Math.sqrt])),
    jsc.elements([S.dec, S.inc, Math.sqrt]),
    jsc.nat
  );

  laws.Applicative.interchange(
    MaybeArb(jsc.elements([S.dec, S.inc, Math.sqrt])),
    jsc.elements([S.dec, S.inc, Math.sqrt]),
    jsc.nat
  );

  laws.Chain.associativity(
    MaybeArb(jsc.array(jsc.string)),
    jsc.constant(S.head),
    jsc.constant(S.last)
  );

  laws.Monad.leftIdentity(
    MaybeArb(jsc.nat),
    jsc.constant(S.head),
    jsc.string
  );

  laws.Monad.rightIdentity(
    MaybeArb(jsc.nat),
    jsc.string
  );

  laws.Foldable.associativity(
    jsc.constant(add_),
    MaybeArb(jsc.integer)
  );

  laws.Traversable.naturality(
    jsc.constant(S.Either),
    jsc.constant(S.Maybe),
    jsc.constant(S.eitherToMaybe),
    MaybeArb(EitherArb(jsc.integer, jsc.string))
  );

  laws.Traversable.identity(
    jsc.constant(S.Either),
    MaybeArb(EitherArb(jsc.integer, jsc.string))
  );

  laws.Traversable.composition(
    jsc.constant(S.Maybe),
    jsc.constant(Identity),
    MaybeArb(IdentityArb(MaybeArb(jsc.integer)))
  );

  laws.Extend.associativity(
    jsc.constant(function(maybe) { return (maybe.isJust ? maybe.value : 0) + 1; }),
    jsc.constant(function(maybe) { return (maybe.isJust ? maybe.value : 0) * 2; }),
    MaybeArb(jsc.integer)
  );

});
