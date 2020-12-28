'use strict';

angular.module('myApp').factory('CodiceFiscaleProvider', ['$http', '$q', function($http, $q){

  const CF_REST_SERVICE_URI = './calcolaCodiceFiscale';
  const CM_REST_SERVICE_URI = './getComuni?nome=';

  var factory = {
    callCodiceFiscale: restCodiceFiscale,
    getElencoComuni: restElencoComuni
  };

  return factory;

  function restCodiceFiscale(user) {
    var deferred = $q.defer();

    $http.post(CF_REST_SERVICE_URI, JSON.stringify(user))
        .then(
        function (response) {
            deferred.resolve(response.data);
        },
        function(errResponse){
            console.error('Errore mentre calcolo il codice fiscale', errResponse);
            deferred.reject(errResponse);
        }
    )
    return deferred.promise;
  }


  function restElencoComuni(partialName) {
    var deferred = $q.defer();
        console.log('luca1=', partialName)
        $http.get(CM_REST_SERVICE_URI + partialName)
        .then(
          function (response) {
            deferred.resolve(response.data);
          },
          function(errResponse){
            console.error('Errore mentre carico lista parziale comuni ', errResponse);
            deferred.reject(errResponse);
        }
    );
    return deferred.promise;
  }

}]);
