'use strict';

/**
 * @ngdoc function
 * @name fumbleMania.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the fumbleMania
 */
angular.module('fumbleMania')
    .controller('DashboardCtrl', 
    function ($scope, Restangular, authProvider)
    {
        $scope.user = authProvider.getUser();
        $scope.campaigns = Restangular.all("campaigns").getList().$object;
    });
