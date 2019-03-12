var path = require('path')
var express = require('express')
var nunjucks = require('nunjucks')
var routes = require('./app/routes.js')
var app = express()
var bodyParser = require('body-parser')
var port = (process.env.PORT || 3333)

module.exports = app

// Application settings

// Set the location of the views file
var appViews = [
  path.join(__dirname, '/app/views'),
  path.join(__dirname, '/app/views/layouts/nunjucks')
]

// Tell nunjucks we are using express to serve the templates within
// the views defined in appViews
nunjucks.configure(appViews, {
  express: app,
  autoescape: true,
  watch: true,
  noCache: true
})

app.engine('html', nunjucks.render);
app.set('view engine', 'html')
// Middleware to serve static assets
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/favicon.ico', express.static(path.join(__dirname, '/public/images/favicon.ico')))

// routes (found in app/routes.js)
if (typeof (routes) !== 'function') {
  console.log(routes.bind)
  console.log('Warning: the use of bind in routes is deprecated - please check the prototype kit documentation for writing routes.')
  routes.bind(app)
} else {
  app.use('/', routes)
}

// Strip .html and .htm if provided
app.get(/\.html?$/i, function (req, res) {
  var path = req.path
  var parts = path.split('.')
  parts.pop()
  path = parts.join('.')
  res.redirect(path)
});

// Auto render any view that exists
// App folder routes get priority
app.get(/^\/([^.]+)$/, function (req, res) {
  var path = (req.params[0])
  res.render(path, function (err, html) {
      if (err) {
          res.render(path + '/index', function (err2, html) {
              if (err2) {
                  res.status(404).send(err + '<br>' + err2)
              } else {
                  res.end(html)
              }
          })
      } else {
          res.end(html)
      }
  })
});

// start the app

app.listen(port, function () {
  console.log('Listening on port ' + port + '   url: http://localhost:' + port);
})
