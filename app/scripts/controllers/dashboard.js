'use strict';

/**
 * @ngdoc function
 * @name fumbleMania.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the fumbleMania
 */
angular.module('fumbleMania')
    .controller('DashboardCtrl', function ($scope, Restangular, jwtHelper)
    {
        // JWT token
        //var token = jwtHelper.decodeToken(localStorage.getItem('token'));

        //$scope.user = Restangular.one("user").get().$object;
        $scope.campaigns = Restangular.all("campaigns").getList().$object;
    });
