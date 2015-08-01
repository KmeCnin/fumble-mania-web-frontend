'use strict';

angular.module('fumbleMania')
    .factory('authProvider', 
    function ($q, jwtHelper, Restangular, flashBag)
    {
        var authProvider = {};

        authProvider.token_name = 'jwtToken';
        authProvider.user_storage_name = 'user';
        
        /**
         * Authenticate an user by setting his token 
         * then retrieving his data from Rest API.
         * 
         * @param string token JSON Web Token
         * @return Promise
         */
        authProvider.authenticate = function(token) 
        {
            var deferred = $q.defer();
            localStorage.setItem(this.token_name, token);
            return Restangular.one('users', 4).get().then(function (user) {
                localStorage.setItem(authProvider.user_storage_name, JSON.stringify(user));
            });
        };

        /**
         * Say if user is authenticated.
         * 
         * @return bool
         */
        authProvider.isLoged = function()
        {
            return null !== localStorage.getItem(this.token_name);
        };

        /**
         * Say if user is not authenticated.
         * 
         * @return bool
         */
        authProvider.isNotLoged = function()
        {
            return null === localStorage.getItem(this.token_name);
        };
        
        /**
         * Parse JSON Web Token and return data.
         * 
         * @return object
         */
        authProvider.getToken = function()
        {
            if (null !== localStorage.getItem(this.token_name)) {
                return jwtHelper.decodeToken(localStorage.getItem(this.token_name));
            }
            return false;
        };
        
        /**
         * Get username from token.
         * 
         * @return string
         */
        authProvider.getUsername = function()
        {
            return this.getToken().username;
        };
        
        /**
         * Get user authenticated.
         * 
         * @return string
         */
        authProvider.getUser = function()
        {
            return JSON.parse(localStorage.getItem('user'));
        };
        
        /**
         * Loging out the user by deleting the localStorage.
         */
        authProvider.clear = function()
        {
            localStorage.removeItem(authProvider.token_name);
            localStorage.removeItem(authProvider.user_storage_name);
        };

        return authProvider;
    });
