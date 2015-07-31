'use strict';

angular.module('fumbleMania')
    .config(function($httpProvider, jwtInterceptorProvider) {
        jwtInterceptorProvider.urlParam = 'bearer';
        jwtInterceptorProvider.tokenGetter = function() {
            return localStorage.getItem('jwtToken');
        };

        $httpProvider.interceptors.push('jwtInterceptor');
    });
