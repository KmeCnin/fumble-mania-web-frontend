'use strict';

angular.module('fumbleMania')
    .factory('authProvider', function ($q, jwtHelper, Restangular)
    {
        var authProvider = {};

        // The name of the token in the localStorage.
        authProvider.token_name = 'jwtToken';
        // The name of the user in the localStorage.
        authProvider.user_storage_name = 'user';
        // The delay between two refresh of the token.
        authProvider.keep_alive_delay = 3600; // One hour

        /**
         * Authenticate an user by setting his token 
         * then retrieving his data from Rest API.
         * 
         * @param token JSON Web Token
         * @return Promise
         */
        authProvider.authenticate = function(token) 
        {
            localStorage.setItem(this.token_name, token);
            return Restangular.one('self').get().then(function (user) {
                localStorage.setItem(authProvider.user_storage_name, JSON.stringify(user));
            });
        };

        /**
         * Getting a new JWToken from a valid one.
         */
        authProvider.refresh = function()
        {
            return Restangular.one('refresh').get().then(function (token) {
                localStorage.setItem(authProvider.token_name, token);
            });
        };

        /**
         * Check if token need to be refreshed and refresh it if needed.
         */
        authProvider.keepAlive = function()
        {
            if (this.isNotLoged()) {
                return false;
            }

            var generatedDate = parseInt(this.getToken().iat);
            var now = Math.floor(Date.now() / 1000);
            if (authProvider.keep_alive_delay <= now - generatedDate) {
                this.refresh();
                return true;
            }

            return false;
        };

        /**
         * Test if user is authenticated.
         * 
         * @return bool
         */
        authProvider.isLoged = function()
        {
            return null !== localStorage.getItem(this.token_name) && !jwtHelper.isTokenExpired(localStorage.getItem(this.token_name));
        };

        /**
         * Test if user is not authenticated.
         * 
         * @return bool
         */
        authProvider.isNotLoged = function()
        {
            return !this.isLoged();
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
         * Parse JSON Web Token and return data.
         *
         * @return object
         */
        authProvider.getExpiresDate = function()
        {
            if (null !== localStorage.getItem(this.token_name)) {
                return jwtHelper.getTokenExpirationDate(localStorage.getItem(this.token_name));
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
         * @return object
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
            // TODO: Send logout request to server in order to delete user in session.
            localStorage.removeItem(authProvider.token_name);
            localStorage.removeItem(authProvider.user_storage_name);
        };

        return authProvider;
    });
