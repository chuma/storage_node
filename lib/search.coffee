###

The following are valid comparison operators:

 p: {'eq', to} equal to
 p: {'nq', to} not equal to
 p: {'gt', to} greater than
 p: {'lt', to} lower than

It is possible to specify a set of options to match:

p: [{gt: to_1}, {lt: to_2}]

###

utils = require 'utils'

search =
  _options: {}
  _compare: (operator, p1, p2) ->
    switch operator
      when 'eq' then p1 is p2
      when 'np' then p1 isnt p2
      when 'gt' then p1 < p2
      when 'lt' then p1 > p2
  setOptions: (options) ->
    @_options = options
  matches: (ob) ->
    options = @_options
    len = utils.noe options
    c = 0
    for k of options
      # set of options to match
      if Array.isArray options[k]
        subLen = options[k].length
        subC = 0
        for subOption in options[k]
          for l of subOption
            subC++ if @_compare l, subOption[l], ob[k]
        c++ if subC is subLen
      # single option to match
      else
        for l of options[k]
          c++ if @_compare l, options[k][l], ob[k]
    c is len

module.exports = search