//### Express Static Route Generator ###

var _ = require('underscore'), 
    fs = require('fs'), 
    file = require('file')

//If there are .html pages with no routes, this module will define them a route now.
module.exports = function(app, staticFolder, ignores) {

  //First get a collection of all existing routes...
  var existingRoutes
  if(app._router) {
    existingRoutes = _.pluck(app._router.stack, 'path')    
  } else {
    existingRoutes = [] //(no existing routes)
  }

  //Now, get a collection of all directories:
  file.walkSync(staticFolder, function(dirPath, dirs, files) {
    //Ignore certain directories:
    if(dirPath.search('bower_components') > -1) return
    if(dirPath.search('includes') > -1) return

    //Filter out everything except .html files:
    var pagesInThisDir = _.filter( files, function(file) {
      return file.search('.html') > -1
    })
    pagesInThisDir.forEach(function(page) {
      //If the page name is index, just pass an empty string:
      if(page == 'index.html') page = ''
      else page = page.slice(0, -5) //Otherwise, strip the '.html' part out.

      //Strip the '/html' part and make the route:
      var path = dirPath.slice(4) + '/' + page

      //Remove trailing slashes, except for on the main index:
      if(path != '/' && path.slice(-1) == '/' ) path = path.slice(0, -1)

      //Only create the route if the path does not already exist:
      if(_.contains(existingRoutes, path)) return
      app.get(path, function(req, res) {
        res.render(path.slice(1))
      })
    })
  })
}
