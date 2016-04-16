angular.module('mlt.services')
.service('LogService', function ($log) {
  return {
   logEntry: function(object, objectAction, objectMessage, data, type) {
     if((object) && (objectAction) && (objectMessage)) {
       var message = '[' + object + '] ' + objectAction + ': ' + objectMessage;
       switch(type) {
         case 1:
           if(data) {
             $log.info(message, data);
           } else {
             $log.info(message);
           }
           break;
         case 2:
           if(data) {
             $log.debug(message, data);
           } else {
             $log.debug(message);
           }
           break;
         case 3:
           if(data) {
             $log.warn(message, data);
           } else {
             $log.warn(message);
           }
           break;
         case 4:
           if(data) {
             $log.error(message, data);
           } else  {
             $log.error(message);
           }
           break;
         default:
           if(data) {
             $log.log(message, data);
           } else {
             $log.log(message);
           }
       }
     } else {
       $log.log('No object or message specified for method, logEntry');
     }
   }
 };
});
