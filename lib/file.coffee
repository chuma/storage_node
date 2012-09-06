fs = require 'fs'
path = require 'path'
utils = require 'utils'

file =
  loadData: (location, data) ->
    files = fs.readdirSync location
    for file in files
      content = fs.readFileSync path.join(location, file)
      data[file] = JSON.parse content
    console.log 'Storage data retrieved!'
  save: (location, data) ->
    len = utils.noe data
    c = 0
    for k of data when utils.isObject data[k]
      len--
      content = JSON.stringify data[k]
      fs.writeFile(
        path.join location, k
        content
        (err) ->
          throw err if err
          c++
          console.log 'Storage data rewritten!' if c is len
      )

module.exports = file