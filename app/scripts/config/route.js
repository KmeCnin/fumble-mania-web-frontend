'use strict';

angular.module('fumbleMania')
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashboard'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'SecurityCtrl',
                controllerAs: 'security'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
