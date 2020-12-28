'use strict';

var app = angular.module("myApp")

app.controller('CodiceFiscaleController', [ '$scope', 'CodiceFiscaleProvider', function( $scope, cf) {
  var self = this;
  self.user={id:null,nome:"",cognome:"",data_di_nascita:"",comune_nascita:"", sesso:"", codice_fiscale:""};
  self.score='';

  self.submit = submit;
  self.reset = reset;
  $scope.comuni = []

	$scope.keychanged = function (e) {

      var lastkey = self.user.comune_nascita
      if (e.key == 'Backspace') {
        lastkey = lastkey.slice (0,-1)
      }
      else if (e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'ArrowUp' || e.key == 'ArrowDown') {
        lastkey = self.user.comune_nascita
      }
      else {
        lastkey = self.user.comune_nascita + e.key
      }
      console.log('keychanged %s -  %s', e.key, lastkey)

      console.log('CERCO : ' + lastkey)

      // il testo parziale e' la somma di self.user.comune_nascita + ultimo tasto

      cf.getElencoComuni(lastkey).then(
        function(c) {
          $scope.comuni = []
          console.log('comuni trovati:', c.length)
          for (var i = 0; i < ( c.length < 10 ? c.length : 10 ); i++) {
            console.log('keychanged2=', c[i].comune)
            $scope.comuni.push(c[i].comune + ' (' + c[i].provincia + ')')
          }
        },
        function(errResponse){
          console.error('Errore nel calcolo del codice fiscale');
        }
      )
  }


  function submit() {

    // fix su comune_nascita che include la provincia

    var user = { id:null, nome:self.user.nome, cognome:self.user.cognome, data_di_nascita:self.user.data_di_nascita, comune_nascita:self.user.comune_nascita.slice (0,-5), sesso:self.user.sesso, codice_fiscale:""};

    console.log('SUBMIT ', user);

    cf.callCodiceFiscale( user)
        .then(
          function(d) {
            self.user.codice_fiscale = d.codice_fiscale;
          },
          function(errResponse){
            console.error('Errore nel calcolo del codice fiscale');
          }
        );
     //reset();
  }


  function reset(){
    console.log('RESET')
    self.user={id:null,nome:'',cognome:'',data_di_nascita:'',comune_nascita:'', sesso:'', codice_fiscale:''};
    $scope.myForm.$setPristine(); //reset Form
  }


}]);
