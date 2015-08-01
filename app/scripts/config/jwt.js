'use strict';

angular.module('fumbleMania')
    .config(function($httpProvider, jwtInterceptorProvider) {
        // Uncomment in order to send token via url parameters instead of header
        // jwtInterceptorProvider.urlParam = 'bearer';
        jwtInterceptorProvider.tokenGetter = function() {
            return localStorage.getItem('jwtToken');
        };

        $httpProvider.interceptors.push('jwtInterceptor');
    });
