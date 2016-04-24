angular.module('mlt.services')
.service('HTTPService', function ($http, $q, LogService) {
  var objectName = 'mlt.services.http-service';
  return {
   get: function(url, timeout) {
     var message = 'retrieving data from [' + url + ']';
     var deferred = $q.defer();
     $http.get(url, { timeout: timeout })
       .success(function(data, status, headers, config) {
         LogService.logEntry(objectName, 'success', message, { 'data': data, 'status': status, 'headers': headers, 'config': config }, 2);
         deferred.resolve(data);
       }).error(function(data, status, headers, config) {
         LogService.logEntry(objectName, 'error', message + ' [Error: ' + data + ', Status: ' + status + ']', { 'data': data, 'status': status, 'headers': headers, 'config': config }, 4);
         deferred.reject({ message: data, code: status });
       });
     return deferred.promise;
   }
 };
});
