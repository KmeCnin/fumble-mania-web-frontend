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
    ['$scope', '$location', 'Restangular', 'authProvider', 'flashBag',
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
            Restangular.all('login_check').post(credentials).then(function (data) {
                // Authentication
                localStorage.setItem(authProvider.token_name, data.token);
                flashBag.success('Bienvenue.');
                $location.path('/');
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
            localStorage.removeItem(authProvider.token_name);
            flashBag.alert('A bientôt.');
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

    }]);
