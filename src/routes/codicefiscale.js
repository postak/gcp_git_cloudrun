
var util = require('util');

var cf = require('./cf');

/*
 * POST scoring.
 */

exports.calcolaCodiceFiscale = function(req, res){
  console.log('Request body: ' + util.inspect(req.body));
  var nome = req.body.nome,
      cognome = req.body.cognome,
      data_di_nascita = req.body.data_di_nascita,
      sesso = req.body.sesso,
      comune_nascita = req.body.comune_nascita;

 var mycf = '';

 try {
    mycf = cf(nome, cognome, sesso, new Date(data_di_nascita), comune_nascita)
 }
 catch(err ) {
   mycf = err.message;
   console.log('Errore nel calcolo del codice fiscale : ', err)
 }

 console.log(mycf)
 console.log ("data_di_nascita=", data_di_nascita)

  var resultData = { "nome": nome,
		  "cognome": cognome,
		  "comune_nascita": comune_nascita,
      "sesso": sesso,
		  "data_di_nascita": data_di_nascita,
		  "codice_fiscale": mycf
		};


  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(resultData));
};
