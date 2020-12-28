const comuni = require('./comuni.json')


exports.getComuni = function(req, res){

  console.log('getComuni parmater: ' + req.query.nome)
  console.log(comuni.length)

  matchedComuni = []

  for (var i = 0; i < comuni.length; i++) {
    if (!comuni[i].comune.toUpperCase().indexOf(req.query.nome.toUpperCase())) {
      matchedComuni.push(comuni[i])
    }
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(matchedComuni));

}
