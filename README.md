
## express static route generator

Defines a route for any .html pages that don't already have one.

Useful if you want to make server side variables available to otherwise static pages, or simply to enable a cleaner route to all of your static pages (ie- "html/about-us.html" becomes "/about" )

#### Install
```
npm install express-static-route-generator
```

#### Usage

Add this line, in your express app, after your existing routse are defined (if any).

```
esrg(app, 'html')
```

Ex: now html/about-us.html has the public route "/about-us"
Accommodates for subdirectories too, so html/articles/why-sky-blue.html will have the route "/articles/why-sky-blue".
And accommodates for indexes so html/articles/index.html will have the route "/articles"

##### License

MIT
