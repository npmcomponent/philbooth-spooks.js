// Generated by CoffeeScript 1.3.3
(function() {
  'use strict';

  var createFunction, createObject, initialiseProperty, logFunctionCall,
    __hasProp = {}.hasOwnProperty;

  createObject = function(options) {
    var archetype, log, name, property, result, spook;
    archetype = options.archetype;
    spook = options.spook || {};
    log = options.log;
    result = options.result;
    if (!((archetype != null) || typeof archetype === 'function')) {
      throw new Error('Invalid archetype');
    }
    if (log == null) {
      throw new Error('Invalid log');
    }
    for (name in archetype) {
      if (!__hasProp.call(archetype, name)) continue;
      property = archetype[name];
      if (typeof property === 'function') {
        spook[name] = createFunction({
          name: name,
          log: log,
          result: result
        });
      }
    }
    return spook;
  };

  createFunction = function(options) {
    var chain, log, name, result;
    name = options.name;
    chain = options.chain;
    log = options.log;
    result = options.result;
    if (typeof name !== 'string') {
      throw new Error('Invalid function name');
    }
    initialiseProperty(log, 'counts', {});
    initialiseProperty(log.counts, name, 0);
    initialiseProperty(log, 'args', {});
    initialiseProperty(log.args, name, []);
    if (chain === true) {
      return function() {
        logFunctioncall(name, log, arguments);
        return this;
      };
    } else {
      return function() {
        logFunctionCall(name, log, arguments);
        return result;
      };
    }
  };

  initialiseProperty = function(object, propertyName, initialValue) {
    if (typeof object[propertyName] === 'undefined') {
      return object[propertyName] = initialValue;
    }
  };

  logFunctionCall = function(name, log, args) {
    log.counts[name] += 1;
    return log.args[name].push(args);
  };

  module.exports = {
    obj: createObject,
    fn: createFunction
  };

}).call(this);