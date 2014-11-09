services.service('InstagramService', ['$http','$window','$ionicPopup','MessageService', function ($http, $window, $ionicPopup, MessageService) {
    var self = this,
        info,
        user,
        accessToken,
        config = {
            clientId:'70a2ae9262fc4805a5571e8036695a4d',
            redirectUri:'http://www.wikipedia.org/',
            apiUrl: 'https://api.instagram.com/v1/',
            oauthUrl: 'https://instagram.com/oauth/authorize/?',
            scope: 'basic'
        };

    var fetch = function(url, callback, params, method) {
        var prms = {
                client_id: config.clientId,
                callback: 'JSON_CALLBACK'
            },
            cnfg = {
                url: config.apiUrl+url,
                method: method||'jsonp',
                responseType: 'json',
                params: angular.extend(prms, params)
            };

        $http(cnfg)
            .success(function(data){
                callback(data);
            }).error(function(data){
                callback({});
            });
    };

    var bindAuthEvents = function(authTab) {
        // This function bind the evens to the instagram autentication screen
        // If every thing goes good then load the user information
        // Also handle how the app respond to an authentication error
        alert(authTab);
        authTab.addEventListener('loadstop', function(e) {
            if (e.url.search('access_token') !== -1) { // access granted
                accessToken = e.url.substr(e.url.search('access_token')+13);
            }
            if (e.url.search('error') !== -1) { // The user denied access
                var popupConfig = MessageService.search("user-denied-access");
                $ionicPopup.show(popupConfig);
            }
            authTab.close();
        });
    };

    this.getToken=function(){
        return $window.sessionStorage.getItem('tkn');
    };

    this.auth = function() {
        var options = {
            client_id : config.clientId,
            redirect_uri : config.redirectUri,
            scope : config.scope,
            response_type: 'token'
        };

        var authParams='';

        angular.forEach(options, function(value, key) {
            return authParams += key + '=' + value + '&';
        });

        var authUri = config.oauthUrl + authParams;

        bindAuthEvents($window.open(authUri, '_blank', 'location=yes'));
    };

    this.getMedia = function(callback, params) {
        fetch('users/self/media/recent', callback, angular.extend({
            access_token: accessToken
        }, params));
    };

    this.currentUser = function(callback) {
        fetch('users/self', function(data) {
            user = data.data;
        }, {
            access_token: accessToken
        });
    };
}]);