utils = require 'utils'
search = require './search'

accessor =
  find: (set, options, callback) ->
    found = {}
    search.setOptions options
    len = utils.noe set
    c = 0
    # async iteration
    utils.processObject(
      set
      (ob, k) ->
        if utils.isObject(ob)
          if search.matches ob
            found[k] = utils.clone ob
            found[k].id = k
        # remember, there are functions attached such as find, remove, etc. - don't include them
        else
          len--
          c--
        # iteration finished - let's see what we've got
        if ++c is len
          if utils.noe(found) is 0
            found = null
          else if utils.noe(found) is 1
            found = utils.firstEl found
          callback found
    )
  modify: (set, options, ob, callback) ->
    @find(
      set
      options
      (found) ->
        # single item found
        if found.id
          for k of ob
            set[id][k] = ob[k]
        else
          for k of found
            for l of ob
              set[k][l] = ob[l]
        callback found
    )
  remove: (set, options, callback) ->
    @find(
      set
      options
      (found) ->
        if found.id
          delete set[found.id]
        else
          for k of found
            delete set[k]
        callback found
    )
  # making these async?
  all: (set) ->
    found = {}
    for k of set
      continue unless utils.isObject set[k]
      found[k] = utils.clone set[k]
      found[k].id = k
    found = null if utils.noe(found) is 0
    found
  clear: (set) ->
    found = {}
    for k of set
      continue unless utils.isObject set[k]
      found[k] = utils.clone set[k]
      found[k].id = k
      delete set[k]
    found = null if utils.noe(found) is 0
    found

module.exports = accessor