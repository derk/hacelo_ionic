services.service('MessageService', ['$http', function ($http) {
    // Private stuff
    var messages =          null,
        messageDBlocation = "js/common/messagesDB.json",
        self =              this,
        callbackResult =    function(json) {
            self.messages = json ? angular.fromJson(json) : {};
        },
        initMessages =      function() {
            $http.get(messageDBlocation).
              success(callbackResult).
              error(callbackResult);
        },
        keyToValue =   function(searchCriteria, obj) {
            var value;
            for(var key in obj) {
                if (angular.isDefined(obj[searchCriteria])) {
                    value = obj[searchCriteria];
                }
                if( angular.isObject(obj[searchCriteria]) || angular.isArray(obj[searchCriteria])){
                    value = keyToValue(obj[searchCriteria]);
                }
            }
            if (angular.isUndefined(value)) {
                value = "not found";
            }
            return value;
        };
    // Public stuff
    this.search = function(msjKey) {
        return keyToValue(msjKey);
    };
    // Load the messages from JSON file
    initMessages();
}]);