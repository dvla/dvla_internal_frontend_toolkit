var path = require('path')
var express = require('express')
var nunjucks = require('nunjucks')
var app = express()
var bodyParser = require('body-parser')
var port = (process.env.PORT || 3000)

module.exports = app

// Application settings

// Set the location of the views file
var appViews = [
  path.join(__dirname, '/app/views')
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

// app.use('/', express.static(path.join(__dirname, '/app/views')))
app.get('/', (req, res) => {
  res.render('index.html');
})
app.get('/examples/:type/:page', (req, res) => {
  res.render(`examples/${req.params.type}/${req.params.page}`);
})
app.get('/examples/:page', (req, res) => {
  res.render(`examples/${req.params.page}`);
})
app.get('/tacho/:page', (req, res) => {
  res.render(`tacho/${req.params.page}`);
})
app.get('/:page', (req, res) => {
  res.render(req.params.page);
})
// app.get('/examples/typography/:page', (req, res) => {
//   res.render(`examples/prototype/${req.params.page}`);
// })

// Support for parsing data in POSTs
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//   extended: true
// }))

// // send assetPath to all views
// app.use(function (req, res, next) {
//   res.locals.asset_path = '/public/'
//   next()
// })

// start the app

app.listen(port, function () {
  console.log('Listening on port ' + port + '   url: http://localhost:' + port)
})