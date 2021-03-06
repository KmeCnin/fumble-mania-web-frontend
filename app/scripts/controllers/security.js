'use strict';

/**
 * @ngdoc function
 * @name fumbleMania.controller:SecurityCtrl
 * @description
 * # SecurityCtrl
 * Controller of the fumbleMania.
 */
angular.module('fumbleMania')
    .controller('SecurityCtrl',
    function ($scope, $location, Restangular, authProvider, flashBag)
    {
        /**
         * Login action.
         * Send authentication request to Rest Backend.
         *
         * @param credentials
         */
        $scope.login = function(credentials)
        {
            Restangular.all('login_check').post(credentials)
            .then(function (data) {
                // Authentication
                authProvider.authenticate(data.token).then(function() {
                    flashBag.success('<span>Bienvenue <strong>'+authProvider.getUser().first_name+'</strong>.</span>');
                    $location.path('/');
                }, function (error) {
                    flashBag.error(error.data.message);
                });
            }, function(error) {
                // Error
                if (error.code === 401) {
                    flashBag.error('Identifiants incorrects.');
                } else {
                    flashBag.error(error.data.message);
                }
            });
        };

        /**
         * Logout action.
         * Delete local authentication token.
         */
        $scope.logout = function()
        {
            flashBag.alert('<span>A bientôt <strong>'+authProvider.getUser().first_name+'</strong>.</span>');
            authProvider.clear();
            $location.path('/login');
        };

        $scope.isLoged = function()
        {
            return authProvider.isLoged();
        };

        $scope.isNotLoged = function()
        {
            return authProvider.isNotLoged();
        };

    });
