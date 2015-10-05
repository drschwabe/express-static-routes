
## express static routes

Creates a route for any .html pages that don't already have one.

Useful if you want to make server side variables available to otherwise static pages, or simply to enable a cleaner route to all of your static pages (ie- "about-us.html" becomes available at "/about" )

#### Install
```
npm install express-static-routes

var esr = require('express-static-routes')
```

#### Usage

Add this line, in your express app, after your existing routse are defined (if any).

```
esr(app, 'html')
```

Ex: now html/about-us.html has the public route "/about-us"

Accommodates for subdirectories too, so html/articles/why-sky-blue.html will have the route "/articles/why-sky-blue".

And also accommodates for indexes so html/articles/index.html will have the route "/articles"

##### License

MIT
