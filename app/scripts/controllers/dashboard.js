'use strict';

/**
 * @ngdoc function
 * @name fumbleMania.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the fumbleMania
 */
angular.module('fumbleMania')
    .controller('DashboardCtrl', function ($scope, Restangular) {
        $scope.campaigns = Restangular.all("campaigns").getList().$object;
    });
