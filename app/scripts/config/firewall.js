'use strict';

angular.module('fumbleMania')
    .run(
    ['$rootScope', '$location', 'authProvider', 'flashBag',
        function ($rootScope, $location, authProvider, flashBag)
        {
            // Redirection if user not authenticated
            $rootScope.$on('$routeChangeStart', function (event)
            {
                if (
                    authProvider.isNotLoged() &&
                    $location.path() !== '/login' // Except login route
                ) {
                    event.preventDefault();
                    flashBag.warning('Vous devez vous authentifier.');
                    $location.path('/login');
                } else {
                    // Check if it's needed to refresh token
                    authProvider.keepAlive();
                }
            });
        }]);