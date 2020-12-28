
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , codicefiscale = require('./routes/codicefiscale')
  , comuni = require('./routes/comuni')
  , http = require('http')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , bodyParser = require('body-parser')
  , errorhandler = require('errorhandler')
  , methodOverride = require('method-override')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

app.get('/', function(request,response) {
  // in caso voglio fare login
  // response.sendFile (__dirname + '/public/signin.html');

  // altrimenti reindirizzo su /codicefiscale
  //console.log("LUCA - redirect");
  response.redirect('/codicefiscale');
});
app.get('/codicefiscale/', routes.index);
app.post('/codicefiscale/calcolaCodiceFiscale', codicefiscale.calcolaCodiceFiscale);
app.get('/codicefiscale/getComuni', comuni.getComuni);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
