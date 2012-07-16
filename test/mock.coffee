'use strict'

{assert} = require 'chai'

module = 'mock'

suite 'no setup:', ->
  test 'require does not throw', ->
    assert.doesNotThrow ->
      require module

  test 'require returns an object', ->
    assert.isObject require(module)

suite 'require:', ->
  mock = undefined

  setup ->
    mock = require module

  teardown ->
    mock = undefined

  test 'fn function is defined', ->
    assert.isFunction mock.fn

  test 'calling fn with an empty object throws', ->
    assert.throws ->
      mock.fn {}

  test 'calling fn with valid arguments does not throw', ->
    assert.doesNotThrow ->
      mock.fn
        name: 'foo'
        log: {}

  test 'calling fn with object name argument throws', ->
    assert.throws ->
      mock.fn
        name: {}
        log: {}

  test 'calling fn with number name argument throws', ->
    assert.throws ->
      mock.fn
        name: 42
        log: {}

  test 'calling fn with null log argument throws', ->
    assert.throws ->
      mock.fn
        name: 'foo'
        log: null

  test 'calling fn with valid arguments returns function', ->
    assert.isFunction mock.fn(
      name: 'bar'
      log: {}
    )

  suite 'call fn with name and log:', ->
    log = undefined
    fn = undefined

    setup ->
      log = {}
      fn = mock.fn
        name: 'foo'
        log: log

    teardown ->
      log = fn = undefined

    test 'log has counts object', ->
      assert.isObject log.counts

    test 'log.counts.foo is zero', ->
      assert.strictEqual log.counts.foo, 0

    test 'log has args object', ->
      assert.isObject log.args

    test 'log.args has foo array', ->
      assert.isArray log.args.foo

    test 'log.args.foo has length zero', ->
      assert.lengthOf log.args.foo, 0

    test 'calling mocked function does not throw', ->
      assert.doesNotThrow ->
        fn()

    test 'calling mocked function returns undefined', ->
      assert.isUndefined fn()

    suite 'call mocked function with one argument:', ->
      setup ->
        fn 'foo'

      test 'log.counts.foo is one', ->
        assert.strictEqual log.counts.foo, 1

      test 'log.args.foo has length one', ->
        assert.lengthOf log.args.foo, 1

      test 'log.args.foo[0] has length one', ->
        assert.lengthOf log.args.foo[0], 1

      test 'log.args.foo[0][0] is foo', ->
        assert.strictEqual log.args.foo[0][0], 'foo'

      suite 'call mocked function with a different argument', ->
        setup ->
          fn 'bar'

        test 'log.counts.foo is two', ->
          assert.strictEqual log.counts.foo, 2

        test 'log.args.foo has length two', ->
          assert.lengthOf log.args.foo, 2

        test 'log.args.foo[0] has length one', ->
          assert.lengthOf log.args.foo[0], 1

        test 'log.args.foo[0][0] is foo', ->
          assert.strictEqual log.args.foo[0][0], 'foo'

        test 'log.args.foo[1] has length one', ->
          assert.lengthOf log.args.foo[1], 1

        test 'log.args.foo[1][0] is bar', ->
          assert.strictEqual log.args.foo[1][0], 'bar'

        suite 'call mocked function with multiple arguments', ->
          setup ->
            fn 'foo', 'bar', 'baz'

          test 'log.counts.foo is three', ->
            assert.strictEqual log.counts.foo, 3

          test 'log.args.foo has length three', ->
            assert.lengthOf log.args.foo, 3

          test 'log.args.foo[0] has length one', ->
            assert.lengthOf log.args.foo[0], 1

          test 'log.args.foo[0][0] is foo', ->
            assert.strictEqual log.args.foo[0][0], 'foo'

          test 'log.args.foo[1] has length one', ->
            assert.lengthOf log.args.foo[1], 1

          test 'log.args.foo[1][0] is bar', ->
            assert.strictEqual log.args.foo[1][0], 'bar'

          test 'log.args.foo[2] has length three', ->
            assert.lengthOf log.args.foo[2], 3

          test 'log.args.foo[2][0] is foo', ->
            assert.strictEqual log.args.foo[2][0], 'foo'

          test 'log.args.foo[2][1] is bar', ->
            assert.strictEqual log.args.foo[2][1], 'bar'

          test 'log.args.foo[2][2] is baz', ->
            assert.strictEqual log.args.foo[2][2], 'baz'

  suite 'call fn with different name:', ->
    log = undefined
    fn = undefined

    setup ->
      log = {}
      fn = mock.fn
        name: 'bar'
        log: log

    teardown ->
      log = fn = undefined

    test 'log.counts.foo is undefined', ->
      assert.isUndefined log.counts.foo

    test 'log.counts.bar is zero', ->
      assert.strictEqual log.counts.bar, 0

    test 'log.args.foo is undefined', ->
      assert.isUndefined log.args.foo

    test 'log.args.bar has length zero', ->
      assert.lengthOf log.args.bar, 0

    suite 'call mocked function with one argument:', ->
      setup ->
        fn 'baz'

      test 'log.counts.bar is one', ->
        assert.strictEqual log.counts.bar, 1

      test 'log.args.bar has length one', ->
        assert.lengthOf log.args.bar, 1

      test 'log.args.bar[0] has length one', ->
        assert.lengthOf log.args.bar[0], 1

      test 'log.args.bar[0][0] is baz', ->
        assert.strictEqual log.args.bar[0][0], 'baz'

  suite 'call fn with result:', ->
    log = undefined
    fn = undefined

    setup ->
      log = {}
      fn = mock.fn
        name: 'baz'
        log: log
        result: 'foo'

    teardown ->
      log = fn = undefined

    test 'log.counts.foo is undefined', ->
      assert.isUndefined log.counts.foo

    test 'log.counts.bar is undefined', ->
      assert.isUndefined log.counts.bar

    test 'log.counts.baz is zero', ->
      assert.strictEqual log.counts.baz, 0

    test 'log.args.foo is undefined', ->
      assert.isUndefined log.args.foo

    test 'log.args.bar is undefined', ->
      assert.isUndefined log.args.bar

    test 'log.args.baz has length zero', ->
      assert.lengthOf log.args.baz, 0

    test 'calling mocked function returns foo', ->
      assert.strictEqual fn(), 'foo'

  suite 'call fn with different result:', ->
    fn = undefined

    setup ->
      fn = mock.fn
        name: 'foo'
        log: {}
        result: 'bar'

    teardown ->
      fn = undefined

    test 'calling mocked function returns bar', ->
      assert.strictEqual fn(), 'bar'

  suite 'call fn with chain true:', ->
    fn = undefined

    setup ->
      fn = mock.fn
        name: 'foo'
        log: {}
        chain: true

    teardown ->
      fn = undefined

      test 'calling mocked function returns mocked function', ->
        assert.strictEqual fn(), fn

  suite 'call fn with chain false:', ->
    fn = undefined

    setup ->
      fn = mock.fn
        name: 'foo'
        log: {}
        chain: false

    teardown ->
      fn = undefined

      test 'calling mocked function returns undefined', ->
        assert.isUndefined fn()

  suite 'call fn with chain true and result:', ->
    fn = undefined

    setup ->
      fn = mock.fn
        name: 'foo'
        log: {}
        chain: true
        result: 'bar'

    teardown ->
      fn = undefined

      test 'calling mocked function returns mocked function', ->
        assert.strictEqual fn(), fn

