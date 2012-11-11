# spooks.js

A small library for creating unit test spies in JavaScript.

[![Build status][ci-image]][ci-status]

## Installation

### Node.js

`npm install spooks`

### Browser

`git clone git@github.com:philbooth/spooks.js.git`

## Usage

### Loading the library

#### Node.js

```
var spooks = require('spooks');
```

#### Browser

```
<script type="text/javascript" src="spooks.js/src/spooks.min.js"></script>
```

### Calling the exported functions

Two functions are exported:

#### spooks.obj (options)

Returns a unit test spy object,
based on the properties of the `options` argument.

`options.archetype` must be a non-null object
that will be used as a template
from which to define the generated spy.
The returned spy will be given methods
matching each of the archetype's _*own*_ methods
(i.e. excluding those inherited from the its prototype chain).

`options.log` must be a non-null object
that will be used to store counts of method calls,
any arguments passed to those methods
and the `this` context for each call,
on the `counts`, `args` and `these` properties respectively.

`options.spook` is an optional object
that can be used as the base object
to augment with spy methods.
If it is not specified,
a fresh object will be returned instead.

`options.results` is an optional object
containing values that will be returned
by any spy methods that are invoked.
The values are keyed by method name.

e.g. if you wanted to mock jQuery:

```
// Create the spy object.
var log = {};
$ = spooks.obj({
    archetype: jQuery,
    log: log
});

// Perform some test setup.
...

// Assert that the spy was called as expected.
assert.strictEqual(log.counts.ajax, 1);
assert.lengthOf(log.args.ajax[0], 2);
assert.strictEqual(log.args.ajax[0][0], '/users/1.json');

// Reinstate the original object.
$ = jQuery;
```

#### spooks.fn (options)

Returns a unit test spy function,
based on the properties of the `options` argument.

`options.name` must be a string identifying the function,
to be used when fetching the call count or arguments for that function.
You probably want this to match the actual name of the function,
although it doesn't have to.

`options.log` must be a non-null object
that will be used to store the count of calls made to the spy,
any arguments passed to it
and the `this` context for each call,
on the `counts[name]`, `args[name]` and `these[name]` properties respectively.

`options.chain` is an optional boolean
that can be used to indicate that the returned spy function should support chaining
(i.e. return it's own `this` when invoked).

`options.result` is an optional result
that will be returned by the returned spy function
(ignored if `chain` is `true`).

e.g. if you wanted to mock the setTimeout function:

```
// Create the spy function.
var log = {}, originalSetTimeout = setTimeout;
setTimeout = spooks.fn({
    name: 'setTimeout',
    log: log
});

// Perform some test setup.
...

// Assert that the spy was called as expected.
assert.strictEqual(log.counts.setTimeout, 1);
assert.lengthOf(log.args.setTimeout[0], 2);
assert.isFunction(log.args.setTimeout[0][0]);
assert.strictEqual(log.args.setTimeout[0][1], 1000);

// Reinstate the original function.
setTimeout = originalSetTimeout;
```

## Development

### Dependencies

The build environment relies on
[Node.js][node],
[NPM],
[Jake],
[JSHint],
[Mocha],
[Chai] and
[UglifyJS].
Assuming that you already have Node.js and NPM set up,
you just need to run `npm install`
to install all of the dependencies
as listed in `package.json`.

### Unit tests

The unit tests are in `test/spooks.js`.
You can run them with the command `npm test`
or `jake jstest`.

[ci-image]: https://secure.travis-ci.org/philbooth/spooks.js.png?branch=master
[ci-status]: http://travis-ci.org/#!/philbooth/spooks.js
[onejs]: https://github.com/azer/onejs
[browserify]: https://github.com/substack/node-browserify
[node]: http://nodejs.org/
[npm]: https://npmjs.org/
[jake]: https://github.com/mde/jake
[jshint]: https://github.com/jshint/node-jshint
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[uglifyjs]: https://github.com/mishoo/UglifyJS

