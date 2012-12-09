/**
 * This module exports functions for creating unit test spies.
 */

/*globals module, window */

(function () {
    'use strict';

    var functions = {
        ctor: createConstructor,
        obj: createObject,
        fn: createFunction
    };

    if (typeof module === 'undefined' || module === null) {
        window.spooks = functions;
    } else {
        module.exports = functions;
    }

    /**
     * Public function `ctor`.
     *
     * Returns a unit test spy constructor, which returns instances that are
     * themselves unit test spies.
     *
     * @option name {object}      The name of the constructor being mocked, used
     *                            as a key into the `log` object.
     * @option log {object}       Object used to store call counts, arguments
     *                            and contexts, on properties `counts[name]`,
     *                            `args[name]` and `these[name]` respecitvely.
     * @option archetype {object} Optional archetype used to construct the spy
     *                            instances that will be returned by the spy
     *                            constructor. It must have either the property
     *                            `instance`, an object that will be used as the
     *                            template for spy instances, or the property
     *                            `ctor`, a function that returns the template
     *                            (usually this will be the constructor that is
     *                            being mocked). If `ctor` is specified, the
     *                            property `args` may also be set to specify the
     *                            arguments to pass to that function.
     * @option [chains] {object}  Optional object containing flags indicating
     *                            whether methods of the spy instances should
     *                            be chainable.  The flags are keyed by method
     *                            name.
     * @option [results] {object} Optional object containing values that will
     *                            be returned from methods of the spy instances.
     *                            The values are keyed by method name.
     */
    function createConstructor (options) {
        return createFunction({
            name: options.name,
            log: options.log,
            result: createObject({
                archetype: getArchetype(options.archetype),
                log: options.log,
                chains: options.chains,
                results: options.results
            })
        });
    }

    function getArchetype (options) {
        if (isObject(options.instance)) {
            return options.instance;
        }

        if (isFunction(options.ctor)) {
            if (isArray(options.args)) {
                return options.ctor.apply({}, options.args);
            }

            return options.ctor.call({});
        }

        throw new Error('Invalid archetype');
    }

    function isObject (thing) {
        return typeof thing === 'object' && thing !== null;
    }

    function isFunction (thing) {
        return typeof thing === 'function';
    }

    function isArray (thing) {
        return Object.prototype.toString.call(thing) === '[object Array]';
    }

    /**
     * Public function `obj`.
     *
     * Returns a unit test spy object.
     *
     * @option archetype {object} Template object. The returned spy will have
     *                            methods matching the archetype's methods.
     * @option log {object}       Object used to store spy method call counts,
     *                            arguments and contexts, on the properties
     *                            `counts`, `args` and `these` respectively.
     * @option [spook] {object}   Optional base object to add spy methods to.
     *                            If not specified, a new clean object will
     *                            be created instead.
     * @option [chains] {object}  Optional object containing flags indicating
     *                            whether spy methods shoulds be chainable.
     *                            The flags are keyed by method name.
     * @option [results] {object} Optional object containing values that will
     *                            be returned from spy methods. The values
     *                            are keyed by method name.
     */
    function createObject (options) {
        var archetype = options.archetype,
            spook = options.spook || {},
            chains = options.chains || {},
            results = options.results || {},
            property;

        if (isNotObject(archetype) && isNotFunction(archetype)) {
            throw new Error('Invalid archetype');
        }

        if (isNotObject(options.log)) {
            throw new Error('Invalid log');
        }

        for (property in archetype) {
            if (archetype.hasOwnProperty(property) && isFunction(archetype[property])) {
                spook[property] = createFunction({
                    name: property,
                    log: options.log,
                    chain: chains[property],
                    result: results[property]
                });
            }
        }

        return spook;
    }

    function isNotObject (thing) {
        return typeof thing !== 'object' || thing === null;
    }

    function isNotFunction (thing) {
        return isFunction(thing) === false;
    }

    /**
     * Public function `fn`.
     *
     * Returns a unit test spy function.
     *
     * @option name {object}     The name of the function being mocked, used
     *                           as a key into the `log` object.
     * @option log {object}      Object used to store call counts, arguments
     *                           and contexts, on properties `counts[name]`,
     *                           `args[name]` and `these[name]` respecitvely.
     * @option [chain] {boolean} Optional flag specifying whether the spy
     *                           function supports chaining (i.e. it returns
     *                           its own `this`). Defaults to `false`.
     * @option [result] {var}    Optional result that will be returned from
     *                           the spy function. Defaults to `undefined`.
     */
    function createFunction (options) {
        var name = options.name,
            chain = options.chain,
            log = options.log,
            result = options.result;

        if (typeof name !== 'string') {
            throw new Error('Invalid function name');
        }

        initialiseLogProperties(log, name, {
            counts: 0,
            args: [],
            these: []
        });

        return function () {
            logFunctionCall(name, log, arguments, this);

            if (chain === true) {
                return this;
            }

            return result;
        };
    }

    function initialiseLogProperties (log, name, properties) {
        var property;

        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                initialiseLogProperty(log, property, name, properties[property]);
            }
        }
    }

    function initialiseLogProperty (log, property, name, value) {
        initialiseProperty(log, property, {});
        initialiseProperty(log[property], name, value);
    }

    function initialiseProperty (object, property, value) {
        if (typeof object[property] === 'undefined') {
            object[property] = value;
        }
    }

    function logFunctionCall (name, log, args, that) {
        /*jshint validthis:true */
        log.counts[name] += 1;
        log.args[name].push(args);
        log.these[name].push(that);
    }
}());

