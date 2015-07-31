'use strict';

angular.module('fumbleMania')
    .factory('authProvider', function ()
    {
        var authProvider = {};

        authProvider.token_name = 'jwtToken';

        /**
         * Say if user is authenticated.
         */
        authProvider.isLoged = function()
        {
            return localStorage.getItem(authProvider.token_name) !== null;
        };

        /**
         * Say if user is not authenticated.
         */
        authProvider.isNotLoged = function()
        {
            return localStorage.getItem(authProvider.token_name) === null;
        };

        return authProvider;
    });
