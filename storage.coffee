fs = require 'fs'
path = require 'path'
utils = require 'utils'
file = require './lib/file'
accessor = require './lib/accessor'

storage =
  _location: ''
  # database operations that get attached to every category
  _operations:
    new: (ob) ->
      id = 1
      id++ while id of @
      @[id] = ob
    find: (options, callback) ->
      accessor.find @, options, callback
    modify: (options, ob, callback) ->
      accessor.modify @, options, ob, callback
    remove: (options, callback) ->
      accessor.remove @, options, callback
    all: () ->
      accessor.all @
    clear: () ->
      accessor.clear @
  # data holder
  data:
    new: (category) ->
      @[category] = storage._operations # there might be a better way to access storage
  # db setup
  init: (location = 'data') ->
    fExistsFunc = fs.existsSync || path.existsSync
    if fExistsFunc location
      @_location = location
      file.loadData location, @data
      # attach db operations
      for k of @data when utils.isObject @data[k]
        for l of @_operations
          @data[k][l] = @_operations[l]
    else
      throw new Error 'Database location not found!'
    @
  # write data back to file
  save: () ->
    file.save @_location, @data

module.exports = storage