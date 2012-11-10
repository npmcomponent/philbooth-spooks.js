'use strict';

var assert = require('chai').assert,
    module = '../src/spooks';

suite('no setup:', function () {
    test('require does not throw', function () {
        assert.doesNotThrow(function () {
            require(module);
        });
    });

    test('require returns an object', function () {
        assert.isObject(require(module));
    });
});

suite('require:', function () {
    var spooks, archetype;

    setup(function () {
        spooks = require(module);
        archetype = {};
    });

    teardown(function () {
        spooks = archetype = undefined;
    });

    test('fn function is defined', function () {
        assert.isFunction(spooks.fn);
    });

    test('calling fn with an empty object throws', function () {
        assert.throws(function () {
            spooks.fn({});
        });
    });

    test('calling fn with valid arguments does not throw', function () {
        assert.doesNotThrow(function () {
            spooks.fn({
                name: 'foo',
                log: {}
            });
        });
    });

    test('calling fn with object name argument throws', function () {
        assert.throws(function () {
            spooks.fn({
                name: {},
                log: {}
            });
        });
    });

    test('calling fn with number name argument throws', function () {
        assert.throws(function () {
            spooks.fn({
                name: 42,
                log: {}
            });
        });
    });

    test('calling fn with null log argument throws', function () {
        assert.throws(function () {
            spooks.fn({
                name: 'foo',
                log: null
            });
        });
    });

    test('calling fn with valid arguments returns function', function () {
        assert.isFunction(spooks.fn({
            name: 'bar',
            log: {}
        }));
    });

    test('obj function is defined', function () {
        assert.isFunction(spooks.obj);
    });

    test('calling obj with an empty object throws', function () {
        assert.throws(function () {
            spooks.obj(archetype, {});
        });
    });

    test('calling obj with valid arguments does not throw', function () {
        assert.doesNotThrow(function () {
            spooks.obj({
                archetype: {},
                log: {}
            });
        });
    });

    test('calling obj with null archetype argument throws', function () {
        assert.throws(function () {
            spooks.obj({
                archetype: null,
                log: {}
            });
        });
    });

    test('calling obj with null log argument throws', function () {
        assert.throws(function () {
            spooks.obj({
                archetype: {},
                log: null
            });
        });
    });

    test('calling obj with valid arguments returns object', function () {
        assert.isObject(spooks.obj({
            archetype: {},
            log: {}
        }));
    });

    test('calling obj with function spook argument returns function', function () {
        assert.isFunction(spooks.obj({
            spook: function () {},
            archetype: {},
            log: {}
        }));
    });

    suite('call fn with name and log:', function () {
        var log, fn;

        setup(function () {
            log = {};
            fn = spooks.fn({
                name: 'foo',
                log: log
            });
        });

        teardown(function () {
            log = fn = undefined;
        });

        test('log has counts object', function () {
            assert.isObject(log.counts);
        });

        test('log.counts.foo is zero', function () {
            assert.strictEqual(log.counts.foo, 0);
        });

        test('log has args object', function () {
            assert.isObject(log.args);
        });

        test('log.args has foo array', function () {
            assert.isArray(log.args.foo);
        });

        test('log.args.foo has length zero', function () {
            assert.lengthOf(log.args.foo, 0);
        });

        test('calling spooked function does not throw', function () {
            assert.doesNotThrow(function () {
                fn();
            });
        });

        test('calling spooked function returns undefined', function () {
            assert.isUndefined(fn());
        });

        suite('call spooked function with one argument:', function () {
            setup(function () {
                fn('foo');
            });

            test('log.counts.foo is one', function () {
                assert.strictEqual(log.counts.foo, 1);
            });

            test('log.args.foo has length one', function () {
                assert.lengthOf(log.args.foo, 1);
            });

            test('log.args.foo[0] has length one', function () {
                assert.lengthOf(log.args.foo[0], 1);
            });

            test('log.args.foo[0][0] is foo', function () {
                assert.strictEqual(log.args.foo[0][0], 'foo');
            });

            suite('call spooked function with a different argument', function () {
                setup(function () {
                    fn('bar');
                });

                test('log.counts.foo is two', function () {
                    assert.strictEqual(log.counts.foo, 2);
                });

                test('log.args.foo has length two', function () {
                    assert.lengthOf(log.args.foo, 2);
                });

                test('log.args.foo[0] has length one', function () {
                    assert.lengthOf(log.args.foo[0], 1);
                });

                test('log.args.foo[0][0] is foo', function () {
                    assert.strictEqual(log.args.foo[0][0], 'foo');
                });

                test('log.args.foo[1] has length one', function () {
                    assert.lengthOf(log.args.foo[1], 1);
                });

                test('log.args.foo[1][0] is bar', function () {
                    assert.strictEqual(log.args.foo[1][0], 'bar');
                });

                suite('call spooked function with multiple arguments', function () {
                    setup(function () {
                        fn('foo', 'bar', 'baz');
                    });

                    test('log.counts.foo is three', function () {
                        assert.strictEqual(log.counts.foo, 3);
                    });

                    test('log.args.foo has length three', function () {
                        assert.lengthOf(log.args.foo, 3);
                    });

                    test('log.args.foo[0] has length one', function () {
                        assert.lengthOf(log.args.foo[0], 1);
                    });

                    test('log.args.foo[0][0] is foo', function () {
                        assert.strictEqual(log.args.foo[0][0], 'foo');
                    });

                    test('log.args.foo[1] has length one', function () {
                        assert.lengthOf(log.args.foo[1], 1);
                    });

                    test('log.args.foo[1][0] is bar', function () {
                        assert.strictEqual(log.args.foo[1][0], 'bar');
                    });

                    test('log.args.foo[2] has length three', function () {
                        assert.lengthOf(log.args.foo[2], 3);
                    });

                    test('log.args.foo[2][0] is foo', function () {
                        assert.strictEqual(log.args.foo[2][0], 'foo');
                    });

                    test('log.args.foo[2][1] is bar', function () {
                        assert.strictEqual(log.args.foo[2][1], 'bar');
                    });

                    test('log.args.foo[2][2] is baz', function () {
                        assert.strictEqual(log.args.foo[2][2], 'baz');
                    });
                });
            });
        });
    });

    suite('call fn with different name:', function () {
        var log, fn;

        setup(function () {
            log = {};
            fn = spooks.fn({
                name: 'bar',
                log: log
            });
        });

        teardown(function () {
            log = fn = undefined;
        });

        test('log.counts.foo is undefined', function () {
            assert.isUndefined(log.counts.foo);
        });

        test('log.counts.bar is zero', function () {
            assert.strictEqual(log.counts.bar, 0);
        });

        test('log.args.foo is undefined', function () {
            assert.isUndefined(log.args.foo);
        });

        test('log.args.bar has length zero', function () {
            assert.lengthOf(log.args.bar, 0);
        });

        suite('call spooked function with one argument:', function () {
            setup(function () {
                fn('baz');
            });

            test('log.counts.bar is one', function () {
                assert.strictEqual(log.counts.bar, 1);
            });

            test('log.args.bar has length one', function () {
                assert.lengthOf(log.args.bar, 1);
            });

            test('log.args.bar[0] has length one', function () {
                assert.lengthOf(log.args.bar[0], 1);
            });

            test('log.args.bar[0][0] is baz', function () {
                assert.strictEqual(log.args.bar[0][0], 'baz');
            });
        });
    });

    suite('call fn with result:', function () {
        var log, fn;

        setup(function () {
            log = {};
            fn = spooks.fn({
                name: 'baz',
                log: log,
                result: 'foo'
            });
        });

        teardown(function () {
            log = fn = undefined;
        });

        test('log.counts.foo is undefined', function () {
            assert.isUndefined(log.counts.foo);
        });

        test('log.counts.bar is undefined', function () {
            assert.isUndefined(log.counts.bar);
        });

        test('log.counts.baz is zero', function () {
            assert.strictEqual(log.counts.baz, 0);
        });

        test('log.args.foo is undefined', function () {
            assert.isUndefined(log.args.foo);
        });

        test('log.args.bar is undefined', function () {
            assert.isUndefined(log.args.bar);
        });

        test('log.args.baz has length zero', function () {
            assert.lengthOf(log.args.baz, 0);
        });

        test('calling spooked function returns foo', function () {
            assert.strictEqual(fn(), 'foo');
        });
    });

    suite('call fn with different result:', function () {
        var fn;

        setup(function () {
            fn = spooks.fn({
                name: 'foo',
                log: {},
                result: 'bar'
            });
        });

        teardown(function () {
            fn = undefined;
        });

        test('calling spooked function returns bar', function () {
            assert.strictEqual(fn(), 'bar');
        });
    });

    suite('call fn with chain true:', function () {
        var object;

        setup(function () {
            object = {
                fn: spooks.fn({
                    name: 'foo',
                    log: {},
                    chain: true
                })
            };
        });

        teardown(function () {
            object = undefined;
        });

        test('calling spooked function returns spooked function', function () {
            assert.strictEqual(object.fn(), object);
        });
    });

    suite('call fn with chain false:', function () {
        var fn;

        setup(function () {
            fn = spooks.fn({
                name: 'foo',
                log: {},
                chain: false
            });
        });

        teardown(function () {
            fn = undefined;
        });

        test('calling spooked function returns undefined', function () {
            assert.isUndefined(fn());
        });
    });

    suite('call fn with chain true and result:', function () {
        var object;

        setup(function () {
            object = {
                fn: spooks.fn({
                    name: 'foo',
                    log: {},
                    chain: true,
                    result: 'bar'
                })
            };
        });

        teardown(function () {
            object = undefined;
        });

        test('calling spooked function returns spooked function', function () {
            assert.strictEqual(object.fn(), object);
        });
    });

    suite('call obj with archetype and log:', function () {
        var log, object;

        setup(function () {
            log = {};
            object = spooks.obj({
                archetype: {
                    foo: function () {},
                    bar: function () {}
                },
                log: log
            });
        });

        teardown(function () {
            log = object = undefined;
        });

        test('log has counts object', function () {
            assert.isObject(log.counts);
        });

        test('log.counts.foo is zero', function () {
            assert.strictEqual(log.counts.foo, 0);
        });

        test('log has args object', function () {
            assert.isObject(log.args);
        });

        test('log.args has foo array', function () {
            assert.isArray(log.args.foo);
        });

        test('log.args.foo has length zero', function () {
            assert.lengthOf(log.args.foo, 0);
        });

        test('log.counts.bar is zero', function () {
            assert.strictEqual(log.counts.bar, 0);
        });

        test('log.args has bar array', function () {
            assert.isArray(log.args.bar);
        });

        test('log.args.bar has length zero', function () {
            assert.lengthOf(log.args.bar, 0);
        });

        test('object has method foo', function () {
            assert.isFunction(object.foo);
        });

        test('calling spooked method foo does not throw', function () {
            assert.doesNotThrow(function () {
                object.foo();
            });
        });

        test('calling spooked method foo returns undefined', function () {
            assert.isUndefined(object.foo());
        });

        test('object has method bar', function () {
            assert.isFunction(object.bar);
        });

        test('calling spooked method bar does not throw', function () {
            assert.doesNotThrow(function () {
                object.bar();
            });
        });

        test('calling spooked method bar returns undefined', function () {
            assert.isUndefined(object.bar());
        });

        suite('call spooked method foo:', function () {
            setup(function () {
                object.foo();
            });

            test('log.counts.foo is one', function () {
                assert.strictEqual(log.counts.foo, 1);
            });

            test('log.args.foo has length one', function () {
                assert.lengthOf(log.args.foo, 1);
            });

            test('log.args.foo[0] has length zero', function () {
                assert.lengthOf(log.args.foo[0], 0);
            });

            test('log.counts.bar is zero', function () {
                assert.strictEqual(log.counts.bar, 0);
            });

            test('log.args.bar has length zero', function () {
                assert.lengthOf(log.args.bar, 0);
            });

            suite('call spooked method foo with arguments:', function () {
                setup(function () {
                    object.foo('bar', 'baz');
                });

                test('log.counts.foo is two', function () {
                    assert.strictEqual(log.counts.foo, 2);
                });

                test('log.args.foo has length two', function () {
                    assert.lengthOf(log.args.foo, 2);
                });

                test('log.args.foo[1] has length two', function () {
                    assert.lengthOf(log.args.foo[1], 2);
                });

                test('log.args.foo[1][0] is bar', function () {
                    assert.strictEqual(log.args.foo[1][0], 'bar');
                });

                test('log.args.foo[1][1] is baz', function () {
                    assert.strictEqual(log.args.foo[1][1], 'baz');
                });
            });
        });

        suite('call spooked method bar:', function () {
            setup(function () {
                object.bar();
            });

            test('log.counts.foo is zero', function () {
                assert.strictEqual(log.counts.foo, 0);
            });

            test('log.args.foo has length zero', function () {
                assert.lengthOf(log.args.foo, 0);
            });

            test('log.counts.bar is one', function () {
                assert.strictEqual(log.counts.bar, 1);
            });

            test('log.args.bar has length one', function () {
                assert.lengthOf(log.args.bar, 1);
            });

            test('log.args.bar[0] has length zero', function () {
                assert.lengthOf(log.args.bar[0], 0);
            });
        });
    });

    suite('call obj with spook:', function () {
        var spook;

        setup(function () {
            spook = {};
            spooks.obj({
                archetype: {
                    foo: function () {}
                },
                log: {},
                spook: spook
            });
        });

        teardown(function () {
            spook = undefined;
        });

        test('spook has method foo', function () {
            assert.isFunction(spook.foo);
        });
    });
});

