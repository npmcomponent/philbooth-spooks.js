'use strict'

mockFunction = (options) ->
  name = options.name
  chain = options.chain
  log = options.log
  result = options.result

  if typeof name isnt 'string'
    throw new Error 'Invalid function name'

  initialiseProperty log, 'counts', {}
  initialiseProperty log.counts, name, 0
  initialiseProperty log, 'args', {}
  initialiseProperty log.args, name, []

  if chain is true
    ->
      logFunctioncall name, log, arguments
      this
  else
    ->
      logFunctionCall name, log, arguments
      result

initialiseProperty = (object, propertyName, initialValue) ->
  if typeof object[propertyName] is 'undefined'
    object[propertyName] = initialValue

logFunctionCall = (name, log, args) ->
  log.counts[name] += 1
  log.args[name].push args

module.exports =
  fn: mockFunction

