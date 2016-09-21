//### Express Static Route Generator ###

var _ = require('underscore'), 
    fs = require('fs'), 
    file = require('file'), 
    path = require('path')

module.exports = function(app, staticFolder, ignores) {

  //If no static folder was provided, assume a folder called "html": 
  if(!staticFolder) staticFolder = 'html'
  //TODO: check if folder exists, otherwise throw an error.

  //First get a collection of all existing routes...
  var existingRoutes
  if(app._router) {
    existingRoutes = _.pluck(app._router.stack, 'path')    
  } else {
    existingRoutes = [] //(no existing routes)
  }

  //Now, get a collection of all directories:
  file.walkSync(staticFolder, function(dirPath, dirs, files) {

    //Ignore certain directories by default...
    defaultIgnores = ['node_modules', 'bower_components', 'includes']
    //in addition to any supplied ignores: 
    if(ignores) {
      ignores = ignores.concat(defaultIgnores) 
    } else {
      ignores = defaultIgnores //(unless no ignores were supplied)
    }

    //Now exit this loop iteration if we are looking at an ignored dir:
    var isIgnored = false
    ignores.forEach(function(ignore) {
      if(dirPath.search(ignore) > -1) isIgnored = true
    })
    if(isIgnored) return

    //Filter out stuff.. 
    var pagesInThisDir = _.filter(files, function(file) {
                            //Everything except .html files:
                            return file.search('.html') > -1
                          })

    //File by file logic:
    pagesInThisDir.forEach(function(page) {
      //If the page name is index, just pass an empty string:
      if(page == 'index.html') page = ''
      else page = page.slice(0, -5) //Otherwise, strip the '.html' part out.

      //Strip the '/html' part and make the route:
      var path = dirPath.slice(4) + '/' + page
      //TODO check to see if this has bearing on the staticDirectory provided.
      //^ (ex: 'about-us.html becomes just 'about-us' )

      //Remove trailing slashes, except for on an index page: 
      if(path != '/' && path.slice(-1) == '/' ) path = path.slice(0, -1)

      //Only create the route if the path does not already exist:
      if(_.contains(existingRoutes, path)) return

      //Define the route: 
      app.get(path, function(req, res) { //ex: '/about-us'
        res.render(path.slice(1)) //ex: 'about-us'
      })
    })
  })
}
