# spooks.coffee

A small library for creating unit test spies in CoffeeScript and JavaScript.

[![Build status][ci-image]][ci-status]

## Installation

`npm install spooks`

## Usage

### Importing the module

#### CoffeeScript

```
spooks = require 'spooks'
```

#### JavaScript

```
var spooks = require('spooks');
```

### Calling the exported functions

Two functions are exported:

#### obj (options)

Returns a unit test spy object, based on the properties on the `options`
argument.

`options.archetype` must be a non-null, non-function object that will be
used as a template from which to construct the generated spy. The returned
spy will be given methods matching each of the _own_ methods (i.e. exclusing
those inherited from the object's prototype chain).

`options.log` must be a non-null object that will be used to store counts of
method calls as well as details of any arguments passed to those method
calls.

`options.spook` is an optional object that can be used as the base object to
augment with spy methods. If it is not specified, a new object will be
returned instead.

`options.result` is an optional result that will be returned by any spy
spy methods that are invoked during your unit test setup.

e.g.:

```
var log = {},
    spy = spooks.obj({
        archetype: myObj,
        log: log
    });

// Perform some setup.
...

// Assert spy method was called once.
assert.strictEqual(log.counts.methodName, 1);

// Assert spy method was passed one argument.
assert.lengthOf(log.args.methodName[0], 1);

// Assert spy method was passed argument 'foo'.
assert.strictEqual(log.args.methodName[0][0], 'foo');
```

#### fn (options)

Returns a unit test spy function, based on the properties on the `options`
argument.

`options.name` must be a string identifying the function, to be used when
fetching the call count for that function or the arguments to it. You
probably want this to match the actual name of the function, although it
doesn't have to.

`options.log` must be a non-null object that will be used to store counts of
function calls as well as details of any arguments passed to those function
calls.

`options.chain` is an optional boolean that can be used to indicate that the
returned spy function must support chaining (i.e. return it's own `this` when
invoked).

`options.result` is an optional result that will be returned by any spy
spy methods that are invoked during your unit test setup.

e.g.:

```
var log = {},
    foo = spooks.fn({
        name: 'foo',
        log: log
    });

// Perform some setup.
...

// Assert foo was called once.
assert.strictEqual(log.counts.foo, 1);

// Assert foo was passed one argument.
assert.lengthOf(log.args.foo[0], 1);

// Assert foo was passed argument 'bar'.
assert.strictEqual(log.args.foo[0][0], 'bar');
```

## Development

### Dependencies

The build environment relies on [Node.js][node], [NPM], [Jake],
[CoffeeScript], [CoffeeLint], [Mocha] and [Chai].  Assuming that
you already have Node.js and NPM set up, you just need to run
`npm install` to install all of the dependencies as listed in
`package.json`.

### Unit tests

The unit tests are in `test/spooks.coffee`. You can run them
with the command `npm test` or `jake jstest`.

[ci-image]: https://secure.travis-ci.org/philbooth/spooks.coffee.png?branch=master
[ci-status]: http://travis-ci.org/#!/philbooth/spooks.coffee
[onejs]: https://github.com/azer/onejs
[browserify]: https://github.com/substack/node-browserify
[node]: http://nodejs.org/
[npm]: https://npmjs.org/
[jake]: https://github.com/mde/jake
[coffeescript]: http://coffeescript.org/
[coffeelint]: https://github.com/clutchski/coffeelint
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/

