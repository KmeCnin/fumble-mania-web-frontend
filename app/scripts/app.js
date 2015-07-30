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
        'ui.materialize',
        'angular-jwt'
    ])
    .config(function Config($routeProvider, RestangularProvider, $httpProvider, jwtInterceptorProvider) {
        // Routing
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

        // Restangular configuration
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
        });

        // JWT configuration
        //jwtInterceptorProvider.tokenGetter = function(jwtHelper, $http) {
        //    var token = localStorage.getItem('id_token');
        //    if (jwtHelper.isTokenExpired(token)) {
        //        // This is a promise of a JWT id_token
        //        return $http({
        //            url: 'http://localhost/fumble-mania-rest-backend/web/app_dev.php/api/login_check',
        //            // This makes it so that this request doesn't send the JWT
        //            skipAuthorization: true,
        //            method: 'POST',
        //            data: {
        //                grant_type: 'refresh_token',
        //                refresh_token: refreshToken
        //            }
        //        }).then(function(response) {
        //            var id_token = response.data.id_token;
        //            localStorage.setItem('id_token', id_token);
        //            return id_token;
        //        });
        //    } else {
        //        return idToken;
        //    }
        //};
        //$httpProvider.interceptors.push('jwtInterceptor');
    });
