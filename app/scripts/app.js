'use strict';

/**
 * @ngdoc overview
 * @name fumbleMania
 * @description
 * # fumbleMania
 *
 * Main module of the application.
 */
angular
    .module('fumbleMania', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'restangular',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.materialize'
    ])
    .config(function ($routeProvider, RestangularProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashboard'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .otherwise({
                redirectTo: '/'
            });

        RestangularProvider.setBaseUrl('http://localhost/fumble-mania-rest-backend/web/app_dev.php/api/');
        RestangularProvider.setRestangularFields({
            id: '_id.$oid'
        });

        RestangularProvider.setRequestInterceptor(function(elem, operation, what) {

            if (operation === 'put') {
                elem._id = undefined;
                return elem;
            }
            return elem;
        })
    });
