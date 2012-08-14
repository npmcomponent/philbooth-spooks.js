'use strict';

{exec} = require 'child_process'

desc 'Minify the source code for deployment.'
task 'minify', [ 'jstest' ], ->
  runTask minify, 'Minifying javascript...'
, async: true

desc 'Run the unit tests against the compiled output.'
task 'jstest', [ 'compile' ], ->
  process.env.NODE_PATH = './build'
  runTask test, 'Testing javascript...'
, async: true

desc 'Compile the source coffeescript into javascript.'
task 'compile', [ 'cstest' ], ->
  runTask compile, 'Compiling coffeescript...'
, async: true

desc 'Run the unit tests against the source code.'
task 'cstest', [ 'lint' ], ->
  process.env.NODE_PATH = './src'
  runTask test, 'Testing coffeescript...'
, async: true

desc 'Lint the source code.'
task 'lint', [ 'prepare' ], ->
  runTask lint, 'Linting coffeescript...'
, async: true

desc 'Install dependencies.'
task 'prepare', ->
  runTask prepare, 'Preparing the build environment...'
, async: true

runTask = (operation, message) ->
  console.log message
  operation()

minify = ->
  runCommand commands.minify

compile = ->
  runCommand commands.compile

test = ->
  runCommand commands.test

lint = ->
  runCommand commands.lint

prepare = ->
  runCommand commands.prepare

runCommand = (command) ->
  exec command, { cwd: __dirname }, (error, stdout, stderr) ->
    console.log stdout
    if typeof error is 'object' && error isnt null
      console.log error.message
      process.exit 1
    after()

after = () ->
  process.env.NODE_PATH = originalNodePath
  complete()

commands =
  minify: './node_modules/.bin/uglifyjs --no-copyright --lift-vars --output ./build/spooks.min.js ./build/spooks.js'
  compile: './node_modules/.bin/coffee -c -o ./build ./src/spooks.coffee'
  test: './node_modules/.bin/mocha --compilers coffee:coffee-script --ui tdd --reporter spec --colors --slow 50 ./test/spooks.coffee'
  lint: './node_modules/.bin/coffeelint -f config/coffeelint.json ./src/spooks.coffee'
  prepare: 'npm install'

originalNodePath = process.env.NODE_PATH

