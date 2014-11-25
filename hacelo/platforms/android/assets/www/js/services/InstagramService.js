services.service('InstagramService', ['$http', '$window', '$q', function ($http, $window, $q) {
    var self = this,
        user,
        accessToken,
        lastInstagramLoad,
        config = {
            clientId: '70a2ae9262fc4805a5571e8036695a4d',
            redirectUri: 'http://www.wikipedia.org/',
            apiUrl: 'https://api.instagram.com/v1/',
            oauthUrl: 'https://instagram.com/oauth/authorize/?',
            scope: 'basic'
        };

    this.isAuthenticated = function () {
        return angular.isDefined(accessToken);
    };

    var fetch = function (url, params) {
        var prms = {
                client_id: config.clientId,
                callback: 'JSON_CALLBACK'
            }
            deferred = $q.defer();
        if (self.isAuthenticated()) {
            prms.access_token = accessToken;
        }
        var cnfg = {
                url: config.apiUrl + url,
                method: 'jsonp',
                responseType: 'json',
                params: angular.extend(prms, params)
            };

        $http(cnfg).then(function(response){
            lastInstagramLoad = response.data;
            console.log(lastInstagramLoad);
            deferred.resolve(response);
        },function(response){
            deferred.reject(response);
        });

        return deferred.promise;
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
                accessToken = e.url.substr(e.url.search('access_token')+'access_token='.length);
                authTab.close();
                deferred.resolve({
                    authorized: true
                });
            } else if (e.url.search('error') !== -1) { // The user denied access
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

    this.hasLastInstagramLoad = function(){
        return angular.isDefined(lastInstagramLoad);
    };

    this.canLoadMore = function(){
        var can;
        console.log(lastInstagramLoad);
        if(!self.hasLastInstagramLoad()){
            can = true;
        } else if (angular.isDefined(lastInstagramLoad.pagination)) {
            if (angular.isDefined(lastInstagramLoad.pagination.next_url)){
                can = true;
            } else {
                can = false;
            }
        } else {
            can = false;
        }
        return can;
    };

    this.getRecentMedia = function() {
        var prms = {};

        if (self.hasLastInstagramLoad() && self.canLoadMore()) {
            prms.max_tag_id = lastInstagramLoad.pagination.next_max_tag_id;
        }
        return fetch('users/self/media/recent', prms);
    };

    this.getCurrentUser = function() {
        return fetch('users/self');
    };

    this.getRecientTagMedia = function() {
        var prms = {};

        if (self.hasLastInstagramLoad() && self.canLoadMore()) {
            prms.max_tag_id = lastInstagramLoad.pagination.next_max_tag_id;
        }
        return fetch('tags/angularjs/media/recent',prms);
    };
}]);