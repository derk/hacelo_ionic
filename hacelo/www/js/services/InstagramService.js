services.service('InstagramService', ['$http', '$window', '$q', function ($http, $window, $q) {
    var self = this,
        vault = {
            user: undefined,
            userMedia: undefined,
            accessToken: undefined
        },
        config = {
            clientId: '70a2ae9262fc4805a5571e8036695a4d',
            redirectUri: 'http://www.wikipedia.org/',
            apiUrl: 'https://api.instagram.com/v1/',
            oauthUrl: 'https://instagram.com/oauth/authorize/?',
            scope: 'basic'
        };

    this.hasAccessToken = function () {
        return angular.isDefined(vault.accessToken);
    };

    this.isAuthenticated = function () {
        return angular.isDefined(vault.user);
    };

    var fetch = function (url, options) {
        var params = {
                client_id: config.clientId,
                callback: 'JSON_CALLBACK'
            };
        if (self.hasAccessToken()) {
            params.access_token = vault.accessToken;
        }

        return $http({
            cache: true,
            method: 'jsonp',
            params: angular.extend({}, params, options),
            responseType: 'json',
            url: config.apiUrl + url
        });
    };

    var getUrlParameters = function (parameter, staticURL, decode) {
        /*
        Function: getUrlParameters
        Description: Get the value of URL parameters either from 
                     current URL or static URL
        Author: Tirumal
        URL: www.code-tricks.com
       */
       var currLocation = (staticURL.length)? staticURL : window.location.search,
           parArr = currLocation.split('?')[1].split('&'),
           returnBool = true,
           parr;
       
       for (var i = 0; i < parArr.length; i++){
            parr = parArr[i].split('=');
            if(parr[0] == parameter){
                return (decode) ? decodeURIComponent(parr[1]) : parr[1];
                returnBool = true;
            }else{
                returnBool = false;            
            }
       }
       
       if(!returnBool) return false;
    };

    var bindAuthEvents = function(authTab) {
        // This function bind the evens to the instagram autentication screen
        // If every thing goes good then store the token
        // Also handle how the app respond to an authentication error
        var deferred = $q.defer();
        authTab.addEventListener('loadstart', function(e) {
            if (e.url.search('access_token') !== -1) { // access granted
                vault.accessToken = e.url.substr(e.url.search('access_token')+'access_token='.length);
                authTab.close();
                fetch('users/self/').then(
                    function(response){
                        vault.user = response.data.data;
                        deferred.resolve(response.data.data);
                    }
                );
            } else if (e.url.search('error') !== -1) { // User denied access
                authTab.close();
                deferred.reject({
                    error: getUrlParameters('error',e.url,true),
                    errorReason: getUrlParameters('error_reason',e.url,true),
                    errorDescription: getUrlParameters('error_description',e.url,true)
                });
            }
        });
        return deferred.promise;
    };

    var addUserMedia = function (pMedia2add) {
        if (angular.isUndefined(vault.userMedia)) {
            vault.userMedia = pMedia2add;
        } else {
            vault.userMedia.pagination = pMedia2add.pagination;
            vault.userMedia.data.push(pMedia2add.data);
        }
    };

    this.auth = function() {
        var options = {
                client_id:      config.clientId,
                redirect_uri:   config.redirectUri,
                scope:          config.scope,
                response_type:  'token'
            },
            authParams = '';

        angular.forEach(options, function(value, key) {
            return authParams += key + '=' + value + '&';
        });
        var authUrl = config.oauthUrl + authParams;

        return bindAuthEvents($window.open(authUrl, '_blank', 'location=yes'));
    };

    this.hasUserMedia = function(){
        return angular.isDefined(vault.userMedia);
    };

    this.cleanUserMedia = function () {
        vault.userMedia = null; // helping garbage collector
        vault.userMedia = undefined;
    }

    this.canLoadMore = function(){
        var can = true;

        if( self.hasUserMedia() ){
            if (angular.isDefined(vault.userMedia.pagination)) {
                if (angular.isUndefined(vault.userMedia.pagination.next_url)){
                    can = false;
                }
            }
        }

        return can;
    };

    this.getRecentMedia = function() {
        var params = {},
            deferred = $q.defer();

        if (self.hasUserMedia()) {
            if(self.canLoadMore()) {
                params.max_id = vault.userMedia.pagination.next_max_id;
            }
        }
        fetch('users/self/media/recent', params).then(
            function(response){
                addUserMedia(response.data);
                deferred.resolve(response);
            },
            function(response){
                deferred.reject(response);
            }
        );
        return deferred.promise;
    };
}]);